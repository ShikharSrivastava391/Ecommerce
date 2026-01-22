export interface Options {
  apiBaseUrl?: string
  apiToken?: string
  ajaxBaseUrl?: string
  webstoreToken?: string
  // NEW: Optional for custom webstore base (future-proof)
  webstoreBaseUrl?: string
}

/**
 * NEW: JSDoc for Options – Client config with defaults for API/ AJAX/ WebStore endpoints.
 * Validates baseUrl to prevent runtime errors.
 */