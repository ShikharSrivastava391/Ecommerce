import { WebStoreClient, authorize } from '../webstoreClient'  // Replace

describe('WebStoreClient', () => {
  test('validates email in authorize', () => {
    expect(() => authorize('bad', 'url')).toThrow('Invalid email format')
  })

  test('logs init', () => {
    global.console = { debug: jest.fn() } as any
    WebStoreClient({ token: 'tok' })
    expect(console.debug).toHaveBeenCalledWith('WebStoreClient initialized with token length:', 3)
  })
})