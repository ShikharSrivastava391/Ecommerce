import reportWebVitals from '../reportWebVitals'  // Replace

describe('ReportWebVitals', () => {
  test('logs metrics', () => {
    global.console = { log: jest.fn() } as any
    const mockEntry = { name: 'CLS', value: 0.1 }
    const handler = reportWebVitals((entry: any) => entry === mockEntry ? logMetric(entry) : null)
    handler(mockEntry)
    expect(console.log).toHaveBeenCalledWith('Web Vitals:', { name: 'CLS', value: 0.1 })
  })
})