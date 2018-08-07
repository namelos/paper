import { gql, makeExecutableSchema } from 'apollo-server-express'
import { AccountContext } from 'contexts/account/accountContext'
import { BlogContext } from 'contexts/blog/blogContext'
import { KanbanContext } from 'contexts/kanban/kanbanContext'
import { NotesContext } from 'contexts/notes/notesContext'
import { Service } from 'typedi'

@Service()
export class QLService {
  constructor(
    private notesContext: NotesContext,
    private accountContext: AccountContext,
    private blogContext: BlogContext,
    private kanbanContext: KanbanContext
  ) {}

  get Query() {
    return {
      hello: () => 'world',
      notes: () => this.notesContext.all(),
      posts: () => this.blogContext.posts(),
      me: async (parent, {}, context) => await this.verifyUser(context),
      board: async (_, { id }) => await this.kanbanContext.getBoard(id)
    }
  }

  get Mutation() {
    return {
      addNote: (_, { text }) => this.notesContext.insert(text),
      register: async (_, { username, password }, context) => {
        const token = await this.accountContext.createAccount(username, password)
        return this.signUser(context, token)
      },
      login: async (_, { username, password }, context) => {
        const token = await this.accountContext.login(username, password)
        if (token) return this.signUser(context, token)
      },
      createPost: async (_, { title, content }, context) => {
        const user = await this.verifyUser(context)
        if (user) return this.blogContext.createPost({ title, content, user })
        return null
      },
      createBoard: async (_, { name }, context) => {
        const user = await this.verifyUser(context)
        if (user) return await this.kanbanContext.createBoard({ name, user })
        return null
      },
      createBoardColumn: async (_, { name, boardId }, context) => {
        const user = await this.verifyUser(context)
        // todo uac
        const board = await this.kanbanContext.getBoard(boardId)
        return await this.kanbanContext.createBoardColumn({ name, board })
      },
      createCard: async (_, { name, boardColumnId }, context) => {
        const user = await this.verifyUser(context)
        // todo uac
        const boardColumn = await this.kanbanContext.getBoardColumn(boardColumnId)
        return await this.kanbanContext.createCard({ name, boardColumn })
      }
    }
  }

  get resolvers() {
    const that = this

    return {
      Query: {...this.Query},
      Mutation: {...this.Mutation}
    }
  }

  get schema() {
    return makeExecutableSchema({ typeDefs: this.typeDefs, resolvers: this.resolvers })
  }

  get typeDefs() {
    return gql`
      type Query {
        hello: String!
        notes: [Note]
        posts: [Post]
        me: User
        boards: [Board]
        board(id: ID!): Board
      }

      type Mutation {
        addNote(text: String!): Note
        register(username: String!, password: String!): String
        login(username: String!, password: String!): String
        createPost(title: String!, content: String!): Post
        createBoard(name: String!): Board
        createBoardColumn(name: String!, boardId: ID!): BoardColumn
        createCard(name: String!, boardColumnId: ID!): Card
      }

      type User {
        username: String!
        boards: [Board]
      }

      type Note {
        id: ID!
        text: String!
      }

      type Post {
        id: ID!
        title: String!
        content: String!
        user: User!
      }

      type Board {
        id: ID!
        name: String!
        user: User!
        boardColumns: [BoardColumn]
      }

      type BoardColumn {
        id: ID!
        name: String!
        cards: [Card]
      }

      type Card {
        id: ID!
        name: String!
      }
    `
  }

  private signUser(context, token) {
    context.res.cookie('authorization', token)
    return token
  }

  private async verifyUser(context) {
    if (!context || !context.req) return null
    const token = context.req.cookies.authorization
    return this.accountContext.getUserByToken(token)
  }
}
