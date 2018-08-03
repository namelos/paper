import { Hello } from 'common/components/Hello'
import { Login } from 'common/layouts/Login'
import { Me } from 'common/layouts/Me'
import React from 'react'
import { hot } from 'react-hot-loader'
import { Route } from 'react-router'
import { Link } from 'react-router-dom'
import { Notes } from './layouts/Notes'
import { Registration } from './layouts/Registration'

export const AppComp = () => <div>
  <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/notes">Notes</Link></li>
    <li><Link to="/registration">Registration</Link></li>
    <li><Link to="/login">Login</Link></li>
    <li><Link to="/me">Me</Link></li>
  </ul>

  <Route exact path="/" component={Hello} />
  <Route path="/notes" component={Notes} />
  <Route path="/registration" component={Registration} />
  <Route path="/login" component={Login} />
  <Route path="/me" component={Me} />
</div>

export const App = hot(module)(AppComp)
