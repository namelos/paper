import { tokenProvider } from 'common/utils/tokenProvider'
import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const mutation = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password)
  }
`

export const Registration = () => {
  let usernameInput, passwordInput

  return <Mutation mutation={mutation}>
    {(register, { data }) => {
      async function handleSubmit(e) {
        e.preventDefault()
        if (!usernameInput.value || !passwordInput.value) return
        const response: any = await register({
          variables: {
            username: usernameInput.value,
            password: passwordInput.value
          }
        })
        const token = response.data.register.token
        tokenProvider.set(token)
      }

      return <form onSubmit={handleSubmit}>
        username: <input ref={r => usernameInput = r} />
        password: <input type="password" ref={r => passwordInput = r} />
        <button type="submit">Submit</button>
      </form>
    }}
  </Mutation>
}
