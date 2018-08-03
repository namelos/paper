import { tokenProvider } from 'common/utils/tokenProvider'
import gql from 'graphql-tag'
import React from 'react'
import { Mutation } from 'react-apollo'

const mutation = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`

export const Login = () => {
  let usernameInput, passwordInput

  return <Mutation mutation={mutation}>
    {(login, { data }) => {
      async function handleSubmit(e) {
        e.preventDefault()
        if (!usernameInput.value || !passwordInput.value) return
        const response: any = await login({
          variables: {
            username: usernameInput.value,
            password: passwordInput.value
          }
        })
        const loginData = response.data.login

        if (loginData) {
          tokenProvider.set(loginData.token)
        }
      }

      return <form onSubmit={handleSubmit}>
        username: <input ref={r => usernameInput = r} />
        password: <input type="password" ref={r => passwordInput = r} />
        <button type="submit">Submit</button>
      </form>
    }}
  </Mutation>
}
