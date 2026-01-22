import { gql, useQuery } from "@apollo/client"
import Layout from "@theme/Layout"
import React from "react"
import { Graphql } from "../components/main/graphql"

const DashboardPage = (): JSX.Element => {
  const { loading, error, data } = useQuery(gql`
    {
      user {
        id
        email
        stores {
          nodes {
            id
            paidUntil
            settings {
              domainName
            }
          }
        }
      }
    }
  `)

  // NEW: Log query for debug (no sensitive)
  if (loading) {
    console.log('Dashboard query loading...')
    return <div aria-label="Loading dashboard data">Loading...</div>
  }
  if (error) {
    console.error('Dashboard query error:', error.message)  // NEW: Log error
    return <div aria-label="Error loading dashboard">Error! {error.message}</div>
  }

  return (
    <>
      <h1 aria-label="User Info">User ID: {data.user.id}</h1>
      <p aria-label="User Email">User email: {data.user.email}</p>
      <section aria-label="Stores Table">
        <h2>Stores</h2>
        <table role="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Paid Until</th>
              <th>Domain Names</th>
            </tr>
          </thead>
          <tbody>
            {data.user.stores.nodes.map(({ id, paidUntil, settings }) => (
              <tr key={id} role="row">
                <td>{id}</td>
                <td>{paidUntil}</td>
                <td>{settings.domainName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}

const Dashboard = (): JSX.Element => (
  <Layout title="Dashboard">
    <Graphql>
      <DashboardPage />
    </Graphql>
  </Layout>
)

export default Dashboard