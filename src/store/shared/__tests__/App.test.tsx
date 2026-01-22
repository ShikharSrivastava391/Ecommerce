import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import App from '../App'  // Replace
import * as actions from '../actions'

jest.mock('../actions')

describe('App', () => {
  const mockStore = configureStore([])

  test('logs route change', async () => {
    global.console = { log: jest.fn() } as any
    actions.setCurrentPage = jest.fn()
    render(
      <Provider store={mockStore({ app: { currentPage: {} } })}>
        <MemoryRouter initialEntries={['/']}>
          <Route path="/" component={() => <div>Test</div>} />
          <App />
        </MemoryRouter>
      </Provider>
    )
    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith('Route changed:', expect.any(Object))
    })
  })

  test('renders error boundary', () => {
    render(
      <Provider store={mockStore({ app: { currentPage: { type: 'error' } } })}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    )
    expect(screen.getByRole('alert')).toBeInTheDocument()  // Error alert
  })
})