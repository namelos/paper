import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { SchemaLink } from 'apollo-link-schema'
import { App } from 'common/App'
import { Html } from 'common/components/Html'
import { QLService } from 'endpoint/QLService'
import { Request, Response } from 'express'
import React from 'react'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Controller, Get, Req, Res } from 'routing-controllers'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

@Controller()
export class RenderController {
  constructor(private qlService: QLService) {}

  @Get('*')
  async get(@Req() req: Request, @Res() res: Response) {
    const client = new ApolloClient({
      ssrMode: true,
      link: new SchemaLink({
        schema: this.qlService.schema,
        context: { req, res }
      }),
      cache: new InMemoryCache()
    })

    const context = {}

    const sheet = new ServerStyleSheet()

    const Root = <StyleSheetManager sheet={sheet.instance}>
      <ApolloProvider client={client}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </ApolloProvider>
    </StyleSheetManager>

    await getDataFromTree(Root)
    const content = renderToString(Root)
    const styleTags = sheet.getStyleTags()

    return `<!doctype html>\n${renderToStaticMarkup(<Html style={styleTags} content={content} client={client} />)}`
  }
}
