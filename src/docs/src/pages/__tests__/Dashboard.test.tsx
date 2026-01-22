import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { gql } from '@apollo/client'
import Dashboard from '../Dashboard'  // Replace path

const mocks = [
  {
    request: { query: gql`{ user { id email stores { nodes { id paidUntil settings { domainName } } } } }` },
    result: { data: { user: { id: '1', email: 'test@example.com', stores: { nodes: [{ id: 'store1', paidUntil: '2026-01-22', settings: { domainName: 'test.com' } }] } } } }
  },
  {
    request: { query: gql`{ user { id email stores { nodes { id paidUntil settings { domainName } } } } }` },
    error: new Error('Query failed')
  }
]

describe('Dashboard', () => {
  test('renders loading state', () => {
    render(
      <MockedProvider mocks={[]}>
        <Dashboard />
      </MockedProvider>
    )
    expect(screen.getByLabelText('Loading dashboard data')).toBeInTheDocument()
  })

  test('renders data on success', async () => {
    render(
      <MockedProvider mocks={[mocks[0]]}>
        <Dashboard />
      </MockedProvider>
    )
    await waitFor(() => {
      expect(screen.getByText('User ID: 1')).toBeInTheDocument()
      expect(screen.getByText('User email: test@example.com')).toBeInTheDocument()
      expect(screen.getByLabelText('Stores Table')).toBeInTheDocument()
    })
  })

  test('logs error on failure', async () => {
    global.console = { error: jest.fn() } as any
    render(
      <MockedProvider mocks={[mocks[1]]}>
        <Dashboard />
      </MockedProvider>
    )
    await waitFor(() => {
      expect(screen.getByLabelText('Error loading dashboard')).toBeInTheDocument()
      expect(console.error).toHaveBeenCalledWith('Dashboard query error:', 'Query failed')
    })
  })
})