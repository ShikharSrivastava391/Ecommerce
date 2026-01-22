import { getIP } from '../ajaxRouter'  // Replace (or shared util)

describe('Router Utils', () => {
  test('sanitizes IP', () => {
    const ip = getIP({ ip: '::ffff:192.168.1.1, 8.8.8.8' } as any)
    expect(ip).toBe('192.168.1.1')  // Sanitized
  })
})