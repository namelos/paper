import { AddPost } from 'common/components/blog/AddPost'
import gql from 'graphql-tag'
import React from 'react'
import { Query } from 'react-apollo'

const query = gql`
  query Posts {
    posts {
      id
      title
      content
      user {
        username
      }
    }
  }
`
export const Posts = () => <Query query={query}>
  {({ loading, data }) => loading ? <p>loading</p> : <div>
    <ul>{data.posts && data.posts.map(p => <Post key={p.id} {...p} />)}</ul>
    <AddPost />
  </div>}
</Query>

const Post = ({ id, title, content, user: { username } }) => <li>
  <p>id: {id}</p>
  <p>title: {title}</p>
  <p>content: {content}</p>
  <p>username: {username}</p>
</li>
