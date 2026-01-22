import OrderItemsService from '../OrderItemsService'  // Replace

describe('OrderItemsService', () => {
  test('clamps quantity in insert', () => {
    const data = { quantity: 0 }
    const doc = OrderItemsService.getValidDocumentForInsert(data)
    expect(doc.quantity).toBe(1)  // Clamped
  })

  test('logs add', async () => {
    global.console = { log: jest.fn() } as any
    await OrderItemsService.addItem('order1', { product_id: 'prod1', quantity: 2 })
    expect(console.log).toHaveBeenCalledWith('Adding item to order order1:', expect.objectContaining({ product: 'prod1', quantity: 2 }))
  })
})