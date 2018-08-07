import { Hello } from 'common/components/Hello'
import { Boards } from 'common/layouts/Boards'
import { Login } from 'common/layouts/Login'
import { Me } from 'common/layouts/Me'
import { Posts } from 'common/layouts/Posts'
import React from 'react'
import { hot } from 'react-hot-loader'
import { Route } from 'react-router'
import { Link } from 'react-router-dom'
import { Notes } from './layouts/Notes'
import { Registration } from './layouts/Registration'
import styled from 'styled-components'

const Nav = styled.ul`
  display: flex;
  width: 100vw;
  justify-content: space-around;
`

export const AppComp = () => <div>
  <Nav>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/notes">Notes</Link></li>
    <li><Link to="/registration">Registration</Link></li>
    <li><Link to="/login">Login</Link></li>
    <li><Link to="/me">Me</Link></li>
    <li><Link to="/posts">Posts</Link></li>
    <li><Link to="/boards">Boards</Link></li>
  </Nav>

  <Route exact path="/" component={Hello} />
  <Route path="/notes" component={Notes} />
  <Route path="/registration" component={Registration} />
  <Route path="/login" component={Login} />
  <Route path="/me" component={Me} />
  <Route path="/posts" component={Posts} />
  <Route path="/boards" component={Boards} />
</div>

export const App = hot(module)(AppComp)
