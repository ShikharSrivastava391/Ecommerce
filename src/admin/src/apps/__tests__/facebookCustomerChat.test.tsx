import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { App } from '../facebookCustomerChat'  // Replace path

test('validates pageID on update', () => {
  const { getByLabelText, getByText } = render(<App />)
  fireEvent.change(getByLabelText('Page ID'), { target: { value: 'invalid' } })
  fireEvent.click(getByText('Save'))  // F2P: Old saves bad; new alerts (mock alert)
  expect(window.alert).toHaveBeenCalledWith('Page ID must be 15-32 alphanumeric chars')
})

test('logs update', () => {
  global.console = { log: jest.fn() } as any
  const { getByLabelText, getByText } = render(<App />)
  fireEvent.change(getByLabelText('Page ID'), { target: { value: 'valid12345678901234' } })
  fireEvent.click(getByText('Save'))
  waitFor(() => expect(console.log).toHaveBeenCalled())
})