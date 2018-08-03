import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client/ApolloClient'
import { SchemaLink } from 'apollo-link-schema'
import { SchemaService } from 'bootstrap/SchemaService'
import { App } from 'common/App'
import { Html } from 'common/components/Html'
import { Request, Response } from 'express'
import React from 'react'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Controller, Get, Req, Res } from 'routing-controllers'

@Controller()
export class RenderController {
  constructor(private schemaService: SchemaService) {}

  @Get('*')
  async get(@Req() req: Request, @Res() res: Response) {
    const client = new ApolloClient({
      ssrMode: true,
      link: new SchemaLink({
        schema: this.schemaService.schema,
        context: { req, res }
      }),
      cache: new InMemoryCache()
    })

    const context = {}

    const Root = <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </ApolloProvider>

    await getDataFromTree(Root)
    const content = renderToString(Root)

    return `<!doctype html>\n${renderToStaticMarkup(<Html content={content} client={client} />)}`
  }
}
