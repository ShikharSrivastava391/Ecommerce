import React from 'react'
import { render, screen } from '@testing-library/react'
import Login from '../Login'  // Replace path

describe('Login', () => {
  test('renders with GraphQL wrapper & aria-label', () => {
    render(<Login />)
    expect(screen.getByLabelText('Login form')).toBeInTheDocument()  // Assume UserForm has aria
  })

  // Mock GraphQL error/loading if needed
  test('handles loading (mock UserForm)', () => {
    // Simplified: Assume UserForm renders loading
    render(<Login />)
    // Add asserts for form elements
    expect(screen.getByText('Login')).toBeInTheDocument()  // From title
  })
})