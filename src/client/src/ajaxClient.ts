import { RestClient } from "./restClient"

export const AjaxClient = (baseUrl: string, token?: string) => {
  const client = RestClient(baseUrl, token)

  const getCredentialsConfig = (toParseBaseURL: string) => {
    const includePrefix =
      toParseBaseURL.includes("http://") || toParseBaseURL.includes("https://")
    return includePrefix ? "include" : "same-origin"
  }

  const getConfig = (method, data, cookie) => {
    // NEW: Validate cookie if provided (prevent null sends)
    if (cookie && typeof cookie !== 'string') {
      console.warn('Invalid cookie type in AjaxClient config')
      cookie = ''
    }
    const config = {
      credentials: getCredentialsConfig(baseUrl),
      method,
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      body: data && JSON.stringify(data),
    }

    // NEW: Log config for debug (no sensitive data)
    console.debug('AjaxClient config:', { method, hasBody: !!data, hasCookie: !!cookie })

    return config
  }

  return { ...client, getConfig, getCredentialsConfig }
}

export default AjaxClient