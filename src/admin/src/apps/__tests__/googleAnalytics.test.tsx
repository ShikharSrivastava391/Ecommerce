import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { App } from '../googleAnalytics'  // Replace

test('validates trackingID', () => {
  const { getByLabelText, getByText } = render(<App />)
  fireEvent.change(getByLabelText('Tracking ID'), { target: { value: 'bad' } })
  fireEvent.click(getByText('Save'))
  expect(window.alert).toHaveBeenCalledWith('Tracking ID must be UA-XXXXX-X or G-XXXXX')
})

test('logs save', () => {
  global.console = { log: jest.fn() } as any
  const { getByLabelText, getByText } = render(<App />)
  fireEvent.change(getByLabelText('Tracking ID'), { target: { value: 'UA-123-1' } })
  fireEvent.click(getByText('Save'))
  waitFor(() => expect(console.log).toHaveBeenCalled())
})