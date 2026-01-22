import PayPalCheckout from '../PayPalCheckout'  // Replace

describe('PayPalCheckout', () => {
  test('clamps body len in verify', () => {
    global.console = { warn: jest.fn() } as any
    const params = { cmd: '_notify-validate', longBody: 'A'.repeat(10000) }
    PayPalCheckout.verify(params, { allow_sandbox: true }).catch(() => {
      expect(console.warn).toHaveBeenCalledWith('Clamped oversized PayPal body')
    })
  })

  test('logs sandbox mode', () => {
    global.console = { log: jest.fn() } as any
    const params = { test_ipn: true }
    PayPalCheckout.verify(params, { allow_sandbox: true })
    expect(console.log).toHaveBeenCalledWith('PayPal verify in sandbox mode')
  })
})