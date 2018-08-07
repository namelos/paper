import { Board } from 'common/layouts/Board'
import gql from 'graphql-tag'
import React from 'react'
import { Mutation, Query } from 'react-apollo'
import { Link, Route } from 'react-router-dom'

const query = gql`
  query Boards {
    me {
      boards {
        id
        name
      }
    }
  }
`

export const Boards = ({ match }) => <Query query={query}>
  {({ loading, data }) =>
    loading ?
      <p>loading</p> :
      <div>
        <Route path={`${match.path}/:id`} component={Board}/>
        <Route exact path={`${match.path}`} render={() =>
          <div>
            <ul>{data.me && data.me.boards.map(board => <BoardListItem key={board.id} {...board} />)}</ul>
            <CreateBoard />
          </div>
        } />
      </div>
  }
</Query>

function BoardListItem({ id, name }) {
  return <li>
    <Link to={`/boards/${id}`} >
      {id} - {name}
    </Link>
  </li>
}

const mutation = gql`
  mutation CreateBoard($name: String!) {
    createBoard(name: $name) {
      id
      name
    }
  }
`
function CreateBoard() {
  let nameInput

  return <Mutation mutation={mutation}>
    {(createBoard, { data }) => {
      async function handleSubmit(e) {
        e.preventDefault()
        if (!nameInput.value) return
        createBoard({ variables: { name: nameInput.value } })
        nameInput.value = ''
      }

      return <form onSubmit={handleSubmit}>
        name: <input ref={r => nameInput = r} />
        <button type="submit">Create board</button>
      </form>
    }}
  </Mutation>
}

