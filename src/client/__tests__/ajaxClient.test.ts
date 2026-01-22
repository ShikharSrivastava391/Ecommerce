import { AjaxClient } from '../ajaxClient'  // Replace path

describe('AjaxClient', () => {
  test('validates cookie in getConfig', () => {
    const client = AjaxClient('http://test.com')
    const config = client.getConfig('GET', null, 123 as any)  // Invalid type
    expect(config.headers.Cookie).toBe('')  // Clamped
    expect(console.warn).toHaveBeenCalledWith('Invalid cookie type in AjaxClient config')
  })

  test('logs config', () => {
    global.console = { debug: jest.fn() } as any
    const client = AjaxClient('http://test.com')
    client.getConfig('POST', { test: 1 }, 'cookie')
    expect(console.debug).toHaveBeenCalledWith('AjaxClient config:', expect.objectContaining({ method: 'POST', hasBody: true, hasCookie: true }))
  })
})