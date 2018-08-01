import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const mutation = gql`
  mutation AddNote($text: String!) {
    addNote(text: $text) {
      id
      text
    }
  }
`
export const AddNote = () => {
  let input

  return <Mutation mutation={mutation}>
    {(addNote, { data }) => {
      function handleSubmit(e) {
        e.preventDefault()
        if (!input.value) return
        addNote({ variables: { text: input.value } })
        input.value = ''
      }

      return <form onSubmit={handleSubmit}>
        <input ref={r => input = r} />
        <button type="submit">Add Note</button>
      </form>
    }}
  </Mutation>
}
