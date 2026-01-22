import OrdertDiscountsService from '../OrdertDiscountsService'  // Replace

describe('OrdertDiscountsService', () => {
  test('clamps amount in insert', () => {
    const data = { amount: 0 }
    const doc = OrdertDiscountsService.getValidDocumentForInsert(data)
    expect(doc.amount).toBe(0.01)  // Clamped
  })

  test('logs add', () => {
    global.console = { log: jest.fn() } as any
    OrdertDiscountsService.addDiscount('order1', { name: 'test', amount: 10 })
    expect(console.log).toHaveBeenCalledWith('Adding discount to order order1:', expect.objectContaining({ name: 'test', amount: 10 }))
  })
})