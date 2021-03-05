/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "ABI40_0_0RNCNetInfo.h"
#import "ABI40_0_0RNCConnectionStateWatcher.h"

#include <ifaddrs.h>
#include <arpa/inet.h>

#if !TARGET_OS_TV
@import CoreTelephony;
#endif
@import SystemConfiguration.CaptiveNetwork;

#import <ABI40_0_0React/ABI40_0_0RCTAssert.h>
#import <ABI40_0_0React/ABI40_0_0RCTBridge.h>
#import <ABI40_0_0React/ABI40_0_0RCTEventDispatcher.h>

@interface ABI40_0_0RNCNetInfo () <ABI40_0_0RNCConnectionStateWatcherDelegate>

@property (nonatomic, strong) ABI40_0_0RNCConnectionStateWatcher *connectionStateWatcher;
@property (nonatomic) BOOL isObserving;

@end

@implementation ABI40_0_0RNCNetInfo

#pragma mark - Module setup

ABI40_0_0RCT_EXPORT_MODULE()

// We need ABI40_0_0RNCReachabilityCallback's and module methods to be called on the same thread so that we can have
// guarantees about when we mess with the reachability callbacks.
- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

#pragma mark - Lifecycle

- (NSArray *)supportedEvents
{
  return @[@"netInfo.networkStatusDidChange"];
}

- (void)startObserving
{
  self.isObserving = YES;
}

- (void)stopObserving
{
  self.isObserving = NO;
}

- (instancetype)init
{
  self = [super init];
  if (self) {
    _connectionStateWatcher = [[ABI40_0_0RNCConnectionStateWatcher alloc] initWithDelegate:self];
  }
  return self;
}

- (void)dealloc
{
  self.connectionStateWatcher = nil;
}

#pragma mark - ABI40_0_0RNCConnectionStateWatcherDelegate

- (void)connectionStateWatcher:(ABI40_0_0RNCConnectionStateWatcher *)connectionStateWatcher didUpdateState:(ABI40_0_0RNCConnectionState *)state
{
  if (self.isObserving) {
    NSDictionary *dictionary = [self currentDictionaryFromUpdateState:state withInterface:NULL];
    [self sendEventWithName:@"netInfo.networkStatusDidChange" body:dictionary];
  }
}

#pragma mark - Public API

ABI40_0_0RCT_EXPORT_METHOD(getCurrentState:(nullable NSString *)requestedInterface resolve:(ABI40_0_0RCTPromiseResolveBlock)resolve
                  reject:(__unused ABI40_0_0RCTPromiseRejectBlock)reject)
{
  ABI40_0_0RNCConnectionState *state = [self.connectionStateWatcher currentState];
  resolve([self currentDictionaryFromUpdateState:state withInterface:requestedInterface]);
}

#pragma mark - Utilities

// Converts the state into a dictionary to send over the bridge
- (NSDictionary *)currentDictionaryFromUpdateState:(ABI40_0_0RNCConnectionState *)state withInterface:(nullable NSString *)requestedInterface
{
  NSString *selectedInterface = requestedInterface ?: state.type;
  NSMutableDictionary *details = [self detailsFromInterface:selectedInterface withState:state];
  bool connected = [state.type isEqualToString:selectedInterface] && state.connected;
  if (connected) {
    details[@"isConnectionExpensive"] = @(state.expensive);
  }

  return @{
    @"type": selectedInterface,
    @"isConnected": @(connected),
    @"details": details ?: NSNull.null
  };
}

- (NSMutableDictionary *)detailsFromInterface:(nonnull NSString *)requestedInterface withState:(ABI40_0_0RNCConnectionState *)state
{
  NSMutableDictionary *details = [NSMutableDictionary new];
  if ([requestedInterface isEqualToString: ABI40_0_0RNCConnectionTypeCellular]) {
    details[@"cellularGeneration"] = state.cellularGeneration ?: NSNull.null;
    details[@"carrier"] = [self carrier] ?: NSNull.null;
  } else if ([requestedInterface isEqualToString: ABI40_0_0RNCConnectionTypeWifi] || [requestedInterface isEqualToString: ABI40_0_0RNCConnectionTypeEthernet]) {
    details[@"ipAddress"] = [self ipAddress] ?: NSNull.null;
    details[@"subnet"] = [self subnet] ?: NSNull.null;
    #if !TARGET_OS_TV && !TARGET_OS_OSX
    details[@"ssid"] = [self ssid] ?: NSNull.null;
    details[@"bssid"] = [self bssid] ?: NSNull.null;
    #endif
  }
  return details;
}

- (NSString *)carrier
{
#if (TARGET_OS_TV || TARGET_OS_OSX)
  return nil;
#else
  CTTelephonyNetworkInfo *netinfo = [[CTTelephonyNetworkInfo alloc] init];
  CTCarrier *carrier = [netinfo subscriberCellularProvider];
  return carrier.carrierName;
#endif
}

- (NSString *)ipAddress
{
  NSString *address = @"0.0.0.0";
  struct ifaddrs *interfaces = NULL;
  struct ifaddrs *temp_addr = NULL;
  int success = 0;
  // retrieve the current interfaces - returns 0 on success
  success = getifaddrs(&interfaces);
  if (success == 0) {
    // Loop through linked list of interfaces
    temp_addr = interfaces;
    while (temp_addr != NULL) {
      if (temp_addr->ifa_addr->sa_family == AF_INET) {
        NSString* ifname = [NSString stringWithUTF8String:temp_addr->ifa_name];
        if (
          // Check if interface is en0 which is the wifi connection on the iPhone
          // and the ethernet connection on the Apple TV
          [ifname isEqualToString:@"en0"] ||
          // Check if interface is en1 which is the wifi connection on the Apple TV
          [ifname isEqualToString:@"en1"]
        ) {
          // Get NSString from C String
          address = [NSString stringWithUTF8String:inet_ntoa(((struct sockaddr_in *)temp_addr->ifa_addr)->sin_addr)];
        }
      }

      temp_addr = temp_addr->ifa_next;
    }
  }
  // Free memory
  freeifaddrs(interfaces);
  return address;
}

- (NSString *)subnet
{
  NSString *subnet = @"0.0.0.0";
  struct ifaddrs *interfaces = NULL;
  struct ifaddrs *temp_addr = NULL;
  int success = 0;
  // retrieve the current interfaces - returns 0 on success
  success = getifaddrs(&interfaces);
  if (success == 0) {
    // Loop through linked list of interfaces
    temp_addr = interfaces;
    while (temp_addr != NULL) {
      if (temp_addr->ifa_addr->sa_family == AF_INET) {
        NSString* ifname = [NSString stringWithUTF8String:temp_addr->ifa_name];
        if (
          // Check if interface is en0 which is the wifi connection on the iPhone
          // and the ethernet connection on the Apple TV
          [ifname isEqualToString:@"en0"] ||
          // Check if interface is en1 which is the wifi connection on the Apple TV
          [ifname isEqualToString:@"en1"]
        ) {
          // Get NSString from C String
          subnet = [NSString stringWithUTF8String:inet_ntoa(((struct sockaddr_in *)temp_addr->ifa_netmask)->sin_addr)];
        }
      }

      temp_addr = temp_addr->ifa_next;
    }
  }
  // Free memory
  freeifaddrs(interfaces);
  return subnet;
}

#if !TARGET_OS_TV && !TARGET_OS_OSX
- (NSString *)ssid
{
  NSArray *interfaceNames = CFBridgingRelease(CNCopySupportedInterfaces());
  NSDictionary *SSIDInfo;
  NSString *SSID = NULL;
  for (NSString *interfaceName in interfaceNames) {
    SSIDInfo = CFBridgingRelease(CNCopyCurrentNetworkInfo((__bridge CFStringRef)interfaceName));
    if (SSIDInfo.count > 0) {
        SSID = SSIDInfo[@"SSID"];
        if ([SSID isEqualToString:@"Wi-Fi"] || [SSID isEqualToString:@"WLAN"]){
          SSID = NULL;
        }
        break;
    }
  }
  return SSID;
}

- (NSString *)bssid
{
  NSArray *interfaceNames = CFBridgingRelease(CNCopySupportedInterfaces());
  NSDictionary *networkDetails;
  NSString *BSSID = NULL;
  for (NSString *interfaceName in interfaceNames) {
      networkDetails = CFBridgingRelease(CNCopyCurrentNetworkInfo((__bridge CFStringRef)interfaceName));
      if (networkDetails.count > 0)
      {
          BSSID = networkDetails[(NSString *) kCNNetworkInfoKeyBSSID];
          break;
      }
  }
  return BSSID;
}
#endif

@end
