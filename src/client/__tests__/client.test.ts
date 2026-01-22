import { Client } from '../client'  // Replace path
import { Options } from '../types'

describe('Client', () => {
  test('validates apiBaseUrl', () => {
    global.console = { warn: jest.fn() } as any
    Client({ apiBaseUrl: '' } as Options)
    expect(console.warn).toHaveBeenCalledWith('Invalid apiBaseUrl in Client options')
  })

  test('logs export', () => {
    global.console = { debug: jest.fn() } as any
    require('../client')  // Triggers export log
    expect(console.debug).toHaveBeenCalledWith('API Client exports initialized:', expect.any(Object))
  })
})