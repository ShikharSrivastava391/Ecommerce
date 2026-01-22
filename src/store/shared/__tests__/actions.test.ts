import * as actions from '../actions'  // Replace path
import configureStore from 'redux-mock-store'

const mockStore = configureStore([])

describe('Actions', () => {
  test('clamps filter in getParsedProductFilter', () => {
    const filter = actions.getParsedProductFilter({ priceFrom: -10, priceTo: -5, limit: 0 })
    expect(filter.price_from).toBe(0)
    expect(filter.price_to).toBe(0)
    expect(filter.limit).toBe(1)  // Clamped
  })

  test('logs fetchProducts', async () => {
    global.console = { log: jest.fn() } as any
    const store = mockStore({})
    await actions.fetchProducts()(store.dispatch, () => ({ app: { productFilter: {} } }))
    expect(console.log).toHaveBeenCalledWith('Fetched products:', expect.objectContaining({ count: expect.any(Number) }))
  })
})