import LiqPay from '../LiqPay'  // Replace

describe('LiqPay', () => {
  test('clamps data len in getForm', () => {
    global.console = { warn: jest.fn() } as any
    const params = { data: 'A'.repeat(5000) }
    const form = LiqPay.getForm(params, 'key')
    expect(form.data.length).toBeLessThanOrEqual(4096)
    expect(console.warn).toHaveBeenCalledWith('Clamped oversized LiqPay data')
  })

  test('logs notification', () => {
    global.console = { log: jest.fn() } as any
    const ctx = { request: { body: { data: 'success', signature: 'sig' } } }
    LiqPay.paymentNotification({ ctx, gateway: 'liqpay', gatewaySettings: {} })
    expect(console.log).toHaveBeenCalledWith('LiqPay notification for order undefined: status=success, valid=true')
  })
})