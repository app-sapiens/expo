export default {"name":{"description":"The name of your app as it appears both within Expo client and on your home screen as a standalone app.","type":"string","meta":{"bareWorkflow":"To change the name of your app, edit the 'Display Name' field in Xcode and the `app_name` string in `android/app/src/main/res/values/strings.xml`"}},"description":{"description":"A short description of what your app is and why it is great.","type":"string"},"slug":{"description":"The friendly URL name for publishing. For example, `myAppName` will refer to the `expo.io/@project-owner/myAppName` project.","type":"string","pattern":"^[a-zA-Z0-9_\\-]+$"},"owner":{"description":"The Expo account name of the team owner, only applicable if you are enrolled in Expo Developer Services. If not provided, defaults to the username of the current user.","type":"string","minLength":1},"privacy":{"description":"Defaults to `unlisted`. `unlisted` hides the project from search results. `hidden` restricts access to the project page to only the owner and other users that have been granted access. Valid values: `public`, `unlisted`, `hidden`.","enum":["public","unlisted","hidden"],"type":"string","fallback":"unlisted"},"sdkVersion":{"description":"The Expo sdkVersion to run the project on. This should line up with the version specified in your package.json.","type":"string","pattern":"^(\\d+\\.\\d+\\.\\d+)|(UNVERSIONED)$"},"runtimeVersion":{"description":"**Note: Don't use this property unless you are sure what you're doing** \n\nThe runtime version associated with this manifest for bare workflow projects. If provided, this must match the version set in Expo.plist or AndroidManifest.xml.","type":"string","pattern":"^[0-9\\.]+$"},"version":{"description":"Your app version. In addition to this field, you'll also use `ios.buildNumber` and `android.versionCode` — read more about how to version your app [here](https://docs.expo.io/distribution/app-stores/#versioning-your-app). On iOS this corresponds to `CFBundleShortVersionString`, and on Android, this corresponds to `versionName`. The required format can be found [here](https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundleshortversionstring).","type":"string","meta":{"bareWorkflow":"To change your app version, edit the 'Version' field in Xcode and the `versionName` string in `android/app/build.gradle`"}},"platforms":{"description":"Platforms that your project explicitly supports. If not specified, it defaults to `[\"ios\", \"android\"]`.","example":["ios","android","web"],"type":"array","uniqueItems":true,"items":{"type":"string","enum":["android","ios","web"]}},"githubUrl":{"description":"If you would like to share the source code of your app on Github, enter the URL for the repository here and it will be linked to from your Expo project page.","pattern":"^https://github\\.com/","example":"https://github.com/expo/expo","type":["string"]},"orientation":{"description":"Locks your app to a specific orientation with portrait or landscape. Defaults to no lock. Valid values: `default`, `portrait`, `landscape`","enum":["default","portrait","landscape"],"type":"string"},"userInterfaceStyle":{"description":"Configuration to force the app to always use the light or dark user-interface appearance, such as \"dark mode\", or make it automatically adapt to the system preferences. If not provided, defaults to `light`.","type":"string","fallback":"light","enum":["light","dark","automatic"]},"backgroundColor":{"description":"The background color for your app, behind any of your React views. This is also known as the root view background color.","type":"string","pattern":"^#|(&#x23;)\\d{6}$","meta":{"regexHuman":"6 character long hex color string, for example, `'#000000'`. Default is white: `'#ffffff'`"}},"primaryColor":{"description":"On Android, this will determine the color of your app in the multitasker. Currently this is not used on iOS, but it may be used for other purposes in the future.","type":"string","pattern":"^#|(&#x23;)\\d{6}$","meta":{"regexHuman":"6 character long hex color string, for example, `'#000000'`"}},"icon":{"description":"Local path or remote URL to an image to use for your app's icon. We recommend that you use a 1024x1024 png file. This icon will appear on the home screen and within the Expo app.","type":"string","meta":{"asset":true,"contentTypePattern":"^image/png$","contentTypeHuman":".png image","square":true,"bareWorkflow":"To change your app's icon, edit or replace the files in `ios/<PROJECT-NAME>/Assets.xcassets/AppIcon.appiconset` (we recommend using Xcode), and `android/app/src/main/res/mipmap-<RESOLUTION>`. Be sure to follow the guidelines for each platform ([iOS](https://developer.apple.com/design/human-interface-guidelines/ios/icons-and-images/app-icon/), [Android 7.1 and below](https://material.io/design/iconography/#icon-treatments), and [Android 8+](https://developer.android.com/guide/practices/ui_guidelines/icon_design_adaptive)) and to provide your new icon in each existing size."}},"notification":{"description":"Configuration for remote (push) notifications.","type":"object","properties":{"icon":{"description":"(Android only) Local path or remote URL to an image to use as the icon for push notifications. 96x96 png grayscale with transparency. We recommend following [Google's design guidelines](https://material.io/design/iconography/product-icons.html#design-principles). If not provided, defaults to your app icon.","type":"string","meta":{"asset":true,"contentTypePattern":"^image/png$","contentTypeHuman":".png image","square":true}},"color":{"description":"(Android only) Tint color for the push notification image when it appears in the notification tray. Defaults to `#ffffff`","type":"string","pattern":"^#|(&#x23;)\\d{6}$","meta":{"regexHuman":"6 character long hex color string, for example, `'#000000'`"}},"iosDisplayInForeground":{"description":"Whether or not to display notifications when the app is in the foreground on iOS. `_displayInForeground` option in the individual push notification message overrides this option. [Learn more.](https://docs.expo.io/push-notifications/receiving-notifications/#foreground-notification-behavior) Defaults to `false`.","type":"boolean"},"androidMode":{"description":"Show each push notification individually (`default`) or collapse into one (`collapse`).","enum":["default","collapse"],"type":"string"},"androidCollapsedTitle":{"description":"If `androidMode` is set to `collapse`, this title is used for the collapsed notification message. For example, `'#{unread_notifications} new interactions'`.","type":"string"}},"additionalProperties":false},"appKey":{"description":"By default, Expo looks for the application registered with the AppRegistry as `main`. If you would like to change this, you can specify the name in this property.","type":"string"},"androidStatusBarColor":{"description":"@deprecated Use `androidStatusBar` instead.","type":"string","pattern":"^#|(&#x23;)\\d{6}$","meta":{"deprecated":true,"regexHuman":"6 character long hex color string, for example, `'#000000'`"}},"androidStatusBar":{"description":"Configuration for the status bar on Android. For more details please navigate to [Configuring StatusBar](https://docs.expo.io/guides/configuring-statusbar/).","type":"object","properties":{"barStyle":{"description":"Configures the status bar icons to have a light or dark color. Valid values: `light-content`, `dark-content`. Defaults to `dark-content`","type":"string","enum":["light-content","dark-content"]},"backgroundColor":{"description":"Specifies the background color of the status bar. Defaults to `#00000000` (transparent) for `dark-content` bar style and `#00000088` (semi-transparent black) for `light-content` bar style","type":"string","pattern":"^#|(&#x23;)\\d{6}$","meta":{"regexHuman":"6 character long hex color string `'#RRGGBBAA'`, for example, `'#000000'` for black. Or 8 character long hex color string `'#RRGGBBAA'`, for example, `'#00000088'` for semi-transparent black."}},"hidden":{"description":"Instructs the system whether the status bar should be visible or not. Defaults to `false`","type":"boolean"},"translucent":{"description":"Specifies whether the status bar should be translucent (whether it should be treated as a block element that will take up space on the device's screen and limit space available for the rest of your app to be rendered, or be treated as an element with `'position = absolute'` that is rendered above your app's content). Defaults to `true` (default iOS behavior, the iOS status bar cannot be set translucent by the system)","type":"boolean"}},"additionalProperties":false},"androidNavigationBar":{"description":"Configuration for the bottom navigation bar on Android.","type":"object","properties":{"visible":{"description":"Determines how and when the navigation bar is shown. [Learn more](https://developer.android.com/training/system-ui/immersive). Valid values: `leanback`, `immersive`, `sticky-immersive` \n\n `leanback` results in the navigation bar being hidden until the first touch gesture is registered. \n\n `immersive` results in the navigation bar being hidden until the user swipes up from the edge where the navigation bar is hidden. \n\n `sticky-immersive` is identical to `'immersive'` except that the navigation bar will be semi-transparent and will be hidden again after a short period of time","type":"string","enum":["leanback","immersive","sticky-immersive"]},"barStyle":{"description":"Configure the navigation bar icons to have a light or dark color. Supported on Android Oreo and newer. Valid values: `'light-content'`, `'dark-content'`","type":"string","enum":["light-content","dark-content"]},"backgroundColor":{"description":"Specifies the background color of the navigation bar.","type":"string","pattern":"^#|(&#x23;)\\d{6}$","meta":{"regexHuman":"6 character long hex color string, for example, `'#000000'`"}}},"additionalProperties":false},"developmentClient":{"description":"Settings that apply specifically to running this app in a development client","type":"object","properties":{"silentLaunch":{"description":"If true, the app will launch in a development client with no additional dialogs or progress indicators, just like in a standalone app.","type":"boolean","fallback":false}},"additionalProperties":false},"scheme":{"description":"**Standalone Apps Only**. URL scheme to link into your app. For example, if we set this to `'demo'`, then demo:// URLs would open your app when tapped.","type":"string","pattern":"^[a-z][a-z0-9+.-]*$","meta":{"regexHuman":"String beginning with a **lowercase** letter followed by any combination of **lowercase** letters, digits, \"+\", \".\" or \"-\"","standaloneOnly":true,"bareWorkflow":"To change your app's scheme, replace all occurrences of the old scheme in `Info.plist` and `AndroidManifest.xml`"}},"entryPoint":{"description":"The relative path to your main JavaScript file.","type":"string"},"extra":{"description":"Any extra fields you want to pass to your experience. Values are accessible via `Expo.Constants.manifest.extra` ([Learn more](https://docs.expo.io/versions/latest/sdk/constants/#constantsmanifest))","type":"object","properties":{},"additionalProperties":true},"rnCliPath":{"type":"string"},"packagerOpts":{"type":"object","properties":{},"additionalProperties":true},"ignoreNodeModulesValidation":{"type":"boolean"},"nodeModulesPath":{"type":"string"},"updates":{"description":"Configuration for how and when the app should request OTA JavaScript updates","type":"object","properties":{"enabled":{"description":"If set to false, your standalone app will never download any code, and will only use code bundled locally on the device. In that case, all updates to your app must be submitted through Apple review. Defaults to true. (Note: This will not work out of the box with ExpoKit projects)","type":"boolean"},"checkAutomatically":{"description":"By default, Expo will check for updates every time the app is loaded. Set this to `ON_ERROR_RECOVERY` to disable automatic checking unless recovering from an error. Must be one of `ON_LOAD` or `ON_ERROR_RECOVERY`","enum":["ON_ERROR_RECOVERY","ON_LOAD"],"type":"string"},"fallbackToCacheTimeout":{"description":"How long (in ms) to allow for fetching OTA updates before falling back to a cached version of the app. Defaults to 30000 (30 sec). Must be between 0 and 300000 (5 minutes).","type":"number","minimum":0,"maximum":300000}},"additionalProperties":false},"locales":{"description":"Provide overrides by locale for System Dialog prompts like Permissions Boxes","type":"object","properties":{},"meta":{"bareWorkflow":"To add or change language and localization information in your iOS app, you need to use Xcode."},"additionalProperties":{"type":["string","object"]}},"facebookAppId":{"description":"Used for all Facebook libraries. Set up your Facebook App ID at https://developers.facebook.com.","type":"string","pattern":"^[0-9]+$","meta":{"bareWorkflow":"For details, check the [Facebook iOS SDK documentation](https://developers.facebook.com/docs/facebook-login/ios/#4--configure-your-project) and [Android SDK documentation](https://developers.facebook.com/docs/facebook-login/android#manifest)"}},"facebookAutoInitEnabled":{"description":"Whether the Facebook SDK should be initialized automatically. The default in Expo (Client and in standalone apps) is `false`.","type":"boolean"},"facebookAutoLogAppEventsEnabled":{"description":"Whether the Facebook SDK log app events automatically. If you don't set this property, Facebook's default will be used. (Applicable only to standalone apps.) Note: The Facebook SDK must be initialized for app events to work. You may autoinitialize Facebook SDK by setting `facebookAutoInitEnabled` to `true`","type":"boolean","meta":{"bareWorkflow":"For details, check the [Facebook iOS SDK documentation](https://developers.facebook.com/docs/facebook-login/ios/#4--configure-your-project) and [Android SDK documentation](https://developers.facebook.com/docs/facebook-login/android#manifest)"}},"facebookAdvertiserIDCollectionEnabled":{"description":"Whether the Facebook SDK should collect advertiser ID properties, like the Apple IDFA and Android Advertising ID, automatically. If you don't set this property, Facebook's default policy will be used. (Applicable only to standalone apps.)","type":"boolean","meta":{"bareWorkflow":"For details, check the [Facebook iOS SDK documentation](https://developers.facebook.com/docs/facebook-login/ios/#4--configure-your-project) and [Android SDK documentation](https://developers.facebook.com/docs/facebook-login/android#manifest)"}},"facebookDisplayName":{"description":"Used for native Facebook login.","type":"string","meta":{"bareWorkflow":"For details, check the [Facebook iOS SDK documentation](https://developers.facebook.com/docs/facebook-login/ios/#4--configure-your-project) and [Android SDK documentation](https://developers.facebook.com/docs/facebook-login/android#manifest)"}},"facebookScheme":{"description":"Used for Facebook native login. Starts with 'fb' and followed by a string of digits, like 'fb1234567890'. You can find your scheme [here](https://developers.facebook.com/docs/facebook-login/ios)in the 'Configuring Your info.plist' section (only applicable to standalone apps and custom Expo clients).","type":"string","pattern":"^fb[0-9]+[A-Za-z]*$","meta":{"bareWorkflow":"For details, check the [Facebook iOS SDK documentation](https://developers.facebook.com/docs/facebook-login/ios/#4--configure-your-project) and [Android SDK documentation](https://developers.facebook.com/docs/facebook-login/android#manifest)"}},"isDetached":{"description":"Is app detached","type":"boolean","meta":{"autogenerated":true}},"detach":{"description":"Extra fields needed by detached apps","type":"object","properties":{},"meta":{"autogenerated":true},"additionalProperties":true},"assetBundlePatterns":{"description":"An array of file glob strings which point to assets that will be bundled within your standalone app binary. Read more in the [Offline Support guide](https://docs.expo.io/guides/offline-support/)","type":"array","items":{"type":"string"}},"splash":{"$ref":"#/definitions/Splash"},"ios":{"$ref":"#/definitions/IOS"},"android":{"$ref":"#/definitions/Android"},"web":{"$ref":"#/definitions/Web"},"hooks":{"description":"Configuration for scripts to run to hook into the publish process","type":"object","additionalProperties":false,"properties":{"postPublish":{"type":"array","items":{"$ref":"#/definitions/PublishHook"}},"postExport":{"type":"array","items":{"$ref":"#/definitions/PublishHook"}}}},"experiments":{"description":"Enable experimental features that may be unstable, unsupported, or removed without deprecation notices.","type":"object","additionalProperties":false,"properties":{"turboModules":{"description":"Enables Turbo Modules, which are a type of native modules that use a different way of communicating between JS and platform code. When installing a Turbo Module you will need to enable this experimental option (the library still needs to be a part of Expo SDK already, like react-native-reanimated v2). Turbo Modules do not support remote debugging and enabling this option will disable remote debugging.","type":"boolean","fallback":false}}}}