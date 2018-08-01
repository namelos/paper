import React from 'react'
import { Route } from 'react-router'
import { hot } from 'react-hot-loader'
import { Hello } from 'common/components/Hello'
import { Link } from 'react-router-dom'
import Counter from './components/Counter'
import { Notes } from './layouts/Notes'

export const AppComp = () => <div>
  <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/notes">Notes</Link></li>
  </ul>

  <Route exact path="/" component={Hello} />
  <Route path="/notes" component={Notes} />
</div>

export const App = hot(module)(AppComp)
