import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { SettingsForm } from '../SettingsForm'  // Replace path

describe('SettingsForm', () => {
  test('validates apiBaseUrl on submit', () => {
    window.alert = jest.fn()
    render(<SettingsForm />)
    fireEvent.change(screen.getByLabelText(/api base url/i), { target: { value: 'invalid' } })
    fireEvent.click(screen.getByText('Connect'))
    expect(window.alert).toHaveBeenCalledWith('API Base URL must start with http:// or https://')
  })

  test('logs submit', () => {
    global.console = { log: jest.fn() } as any
    localStorage.setItem = jest.fn()
    render(<SettingsForm />)
    fireEvent.change(screen.getByLabelText(/api base url/i), { target: { value: 'http://test.com' } })
    fireEvent.click(screen.getByText('Connect'))
    expect(console.log).toHaveBeenCalledWith('Settings saved:', expect.objectContaining({ language: 'en', developerMode: true }))
  })
})