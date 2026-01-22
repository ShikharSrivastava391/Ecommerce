import paymentModule from '../index'  // Replace path

describe('Payment Module', () => {
  test('clamps amount in getOptions', async () => {
    global.console = { warn: jest.fn() } as any
    // Mock services
    const mockOrder = { grand_total: 0 }
    const mockSettings = {}
    // Simulate getOptions (simplified)
    const options = await paymentModule.getOptions('testId')  // Assume returns { amount: 0.01 }
    expect(options.amount).toBe(0.01)
    expect(console.warn).toHaveBeenCalledWith('Clamped zero/negative amount for order testId to 0.01')
  })

  test('logs invalid gateway', () => {
    global.console = { error: jest.fn() } as any
    paymentModule.getPaymentFormSettings('test').catch(e => {
      expect(console.error).toHaveBeenCalledWith('Invalid gateway:', 'test', 'for order test')
    })
  })
})