import { ApiClient, authorize } from '../apiClient'  // Replace

describe('ApiClient', () => {
  test('warns on null token', () => {
    global.console = { warn: jest.fn() } as any
    ApiClient('http://test.com', null)
    expect(console.warn).toHaveBeenCalledWith('ApiClient initialized with null/undefined token')
  })

  test('authorize calls fetch', async () => {
    global.fetch = jest.fn().mockResolvedValue({ json: () => Promise.resolve({}) })
    await authorize('http://test.com', 'test@email.com')
    expect(fetch).toHaveBeenCalledWith('http://test.com/authorize', expect.any(Object))
  })
})