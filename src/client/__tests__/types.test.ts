import { Options } from '../types'  // Replace

describe('Options Type', () => {
  test('accepts optional webstoreBaseUrl', () => {
    const opts: Options = { webstoreBaseUrl: 'http://test.com' }
    expect(opts).toMatchObject({ webstoreBaseUrl: 'http://test.com' })
  })
})