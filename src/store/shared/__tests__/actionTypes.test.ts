import * as t from '../actionTypes'  // Replace

describe('ActionTypes', () => {
  test('exports all types', () => {
    expect(t.PRODUCT_REQUEST).toBe('PRODUCT_REQUEST')
    // Snapshot for JSDoc validation
    expect(Object.keys(t)).toMatchSnapshot()
  })
})