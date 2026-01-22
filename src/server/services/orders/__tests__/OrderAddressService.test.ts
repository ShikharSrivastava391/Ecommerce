import OrderAddressService from '../OrderAddressService'  // Replace

describe('OrderAddressService', () => {
  test('validates email in update', () => {
    const data = { email: 'invalid' }
    const doc = OrderAddressService.getValidDocumentForUpdate('order1', data, 'billing_address')
    expect(doc['billing_address.email']).toBeUndefined()  // Skipped invalid
  })

  test('logs update', () => {
    global.console = { log: jest.fn() } as any
    OrderAddressService.updateBillingAddress('order1', { name: 'test' })
    expect(console.log).toHaveBeenCalledWith('Updating billing address for order order1:', expect.objectContaining({ keys: ['name'] }))
  })
})