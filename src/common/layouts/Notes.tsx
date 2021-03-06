import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { AddNote } from 'common/components/notes/AddNote'

const query = gql`
  query Notes {
    notes {
      id
      text
    }
  }
`
export const Notes = () => <Query query={query}>
  {({ loading, data }) =>
    loading ? <p>loading</p> : <div>
      <ul>
        {data && data.notes.map(note =>
          <li key={note.id}>{note.text}</li>)}
      </ul>
      <AddNote />
    </div>}
</Query>
