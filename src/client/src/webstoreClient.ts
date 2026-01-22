import fetch from "cross-fetch"
import RestClient, { returnStatusAndJson } from "./restClient"

export const authorize = (email: string, adminUrl: string) => {
  // NEW: Basic email validation (simple regex)
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.warn('Invalid email in authorize:', email)
    throw new Error('Invalid email format')
  }
  const config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, admin_url: adminUrl }),
  }

  return fetch("https://api.cezerin.com/v1/account/authorize", config).then(
    returnStatusAndJson
  )
}

export const WebStoreClient = ({ token }: { token: string }) => {
  // NEW: Log init for debug
  console.debug('WebStoreClient initialized with token length:', token ? token.length : 0)
  const client = RestClient("https://api.cezerin.com/v1", token)

  return { ...client, authorize }
}

export default WebStoreClient