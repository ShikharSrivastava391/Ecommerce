import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from '../Home'  // Replace path

describe('Home', () => {
  test('logs mount & renders links with keys/aria', () => {
    global.console = { log: jest.fn() } as any
    render(<BrowserRouter><Home /></BrowserRouter>)
    expect(console.log).toHaveBeenCalledWith('Home page mounted, links rendered:', 10)
    expect(screen.getAllByRole('link')).toHaveLength(10)
    expect(screen.getByLabelText('Link to GitHub')).toBeInTheDocument()  // NEW aria
  })

  test('alt texts on images', () => {
    render(<BrowserRouter><Home /></BrowserRouter>)
    expect(screen.getByAltText('Cezerin Mobile Order Summary screenshot showing order details on mobile device')).toBeInTheDocument()
    expect(screen.getByAltText('Cezerin Plusha Theme screenshot displaying modern eCommerce layout')).toBeInTheDocument()
  })
})