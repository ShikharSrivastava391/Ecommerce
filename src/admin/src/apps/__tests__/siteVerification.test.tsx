import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { App } from '../siteVerification'  // Replace

test('validates google tag', () => {
  const { getByLabelText, getByText } = render(<App />)
  fireEvent.change(getByLabelText('Google'), { target: { value: '<bad>' } })
  fireEvent.click(getByText('Save'))
  expect(window.alert).toHaveBeenCalledWith('Google tag invalid')
})

test('logs update', () => {
  global.console = { log: jest.fn() } as any
  const { getByLabelText, getByText } = render(<App />)
  fireEvent.change(getByLabelText('Google'), { target: { value: '<meta name="google-site-verification" content="1234" />' } })
  fireEvent.click(getByText('Save'))
  waitFor(() => expect(console.log).toHaveBeenCalled())
})