import * as React from 'react'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'

export function Board({ match }) {
  return <div>
    <BoardView id={match.params.id} />
  </div>
}

const query = gql`
  query Board($id: ID!) {
    board(id: $id) {
      id
      name
      boardColumns {
        id
        name
        cards {
          id
          name
        }
      }
    }
  }
`

export const BoardView = ({ id }) => <Query query={query} variables={{ id }}>
  {({ loading, data }) =>
    loading ?
      <p>loading</p> :
      <div>{ data.board && <BoardComponent {...data.board} /> }</div>
  }
</Query>

function BoardComponent({ id, boardColumns, name }) {
  return <div>
    <p>{name}</p>
    <div>
      <ul>{boardColumns.map(boardColumn =>
        <BoardColumn key={boardColumn.id} {...boardColumn} />)}</ul>
      <CreateBoardColumn boardId={id} />
    </div>
  </div>
}

function BoardColumn({ id, name, cards }) {
  return <div>
    <p>column: {name}</p>
    <ul>{cards.map(card => <Card key={card.id} {...card} />)}</ul>
    <CreateCard boardColumnId={id} />
  </div>
}

function Card({ name }) {
  return <div>card: { name }</div>
}

const createBoardColumnMutation = gql`
  mutation CreateBoardColumn($name: String!, $boardId: ID!) {
    createBoardColumn(name: $name, boardId: $boardId) {
      id
      name
    }
  }
`
function CreateBoardColumn({ boardId }) {
  let nameInput

  return <Mutation mutation={createBoardColumnMutation}>
    {(createBoardColumn, { data }) => {
      async function handleSubmit(e) {
        e.preventDefault()
        if (!nameInput.value) return
        createBoardColumn({ variables: { name: nameInput.value, boardId } })
        nameInput.value = ''
      }

      return <form onSubmit={handleSubmit}>
        name: <input ref={r => nameInput = r} />
        <button type="submit">Create column</button>
      </form>
    }}
  </Mutation>
}

const createCardMutation = gql`
  mutation CreateCard($name: String!, $boardColumnId: ID!) {
    createCard(name: $name, boardColumnId: $boardColumnId) {
      id
      name
    }
  }
`
function CreateCard({ boardColumnId }) {
  let nameInput

  return <Mutation mutation={createCardMutation}>
    {(createCard, { data }) => {
      async function handleSubmit(e) {
        e.preventDefault()
        if (!nameInput.value) return
        createCard({ variables: { name: nameInput.value, boardColumnId } })
        nameInput.value = ''
      }

      return <form onSubmit={handleSubmit}>
        name: <input ref={r => nameInput = r} />
        <button type="submit">Create card</button>
      </form>
    }}
  </Mutation>
}
