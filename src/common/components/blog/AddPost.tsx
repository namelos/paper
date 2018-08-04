import gql from 'graphql-tag'
import React from 'react'
import { Mutation } from 'react-apollo'

const mutation = gql`
  mutation AddPost($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      id
      title
      content
      user {
        username
      }
    }
  }
`
export const AddPost = () => {
  let titleInput, contentInput

  return <Mutation mutation={mutation}>
    {(addPost, { data }) => {
      async function handleSubmit(e) {
        e.preventDefault()
        console.log(titleInput.value, contentInput.value)
        if (!titleInput.value || !contentInput.value) return
        addPost({ variables: { title: titleInput.value, content: contentInput.value } })
        titleInput.value = contentInput.value = ''
      }

      return <form onSubmit={handleSubmit}>
        title: <input ref={r => titleInput = r} />
        content: <input ref={r => contentInput = r} />
        <button type="submit">Add Post</button>
      </form>
    }}
  </Mutation>
}
