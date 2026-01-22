import { RestClient, returnStatusAndJson } from '../restClient'  // Replace

describe('RestClient', () => {
  test('returnStatusAndJson handles non-JSON', async () => {
    const mockResp = { status: 400, json: () => Promise.reject('err') }
    const result = await returnStatusAndJson(mockResp as any)
    expect(result).toEqual({ status: 400, json: null })
  })

  test('getConfig adds auth header', () => {
    const client = RestClient('http://test.com', 'tok')
    const config = client.getConfig('GET')
    expect(config.headers.Authorization).toBe('Bearer tok')
  })
})