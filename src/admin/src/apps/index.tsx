import * as FacebookCustomerChatApp from "./facebookCustomerChat"
import * as FacebookSDKApp from "./facebookSDK"
import * as GoogleAnalyticsApp from "./googleAnalytics"
import * as JivositeApp from "./jivosite"
import * as SiteVerificationApp from "./siteVerification"

export default [
  // NEW: Alpha order for easier maint
  FacebookCustomerChatApp,
  FacebookSDKApp,
  GoogleAnalyticsApp,
  JivositeApp,
  SiteVerificationApp,
]

// NEW: Comment for future apps
// TODO: Add new apps here alphabetically