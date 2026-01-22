import fetch from "cross-fetch"
import { RestClient, returnStatusAndJson } from "./restClient"

export const authorize = (baseUrl, email) => {
  const config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  }
  return fetch(`${baseUrl}/authorize`, config).then(returnStatusAndJson)
}

export const ApiClient = (baseUrl: string, token?: string) => {
  // NEW: Null-check token early (prevent downstream errors)
  if (token === null || token === undefined) {
    console.warn('ApiClient initialized with null/undefined token')
    token = ''
  }
  const client = RestClient(baseUrl, token)

  return { ...client, authorize }
}

export default ApiClient