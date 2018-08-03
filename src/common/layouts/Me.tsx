import gql from 'graphql-tag'
import React from 'react'
import { Query } from 'react-apollo'

const query = gql`
  query Me {
    me {
      username
    }
  }
`
export const Me = () => <Query query={query}>
  {({ loading, data }) =>
    loading ? <p>loading</p> : <div>Username: {data.me ? data.me.username : 'No one'}</div>}
</Query>
