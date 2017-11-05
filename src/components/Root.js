import React, { Component } from 'react'
import { Route, Link, Switch, BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import StartPage from './routes/StartPage'
import UserPage from './routes/UserPage'

import { moduleName } from '../ducks/searchUsers'

class Root extends Component {
  render() {
    return (
      <div className="root">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={StartPage} />
            <Route path="/user/:login" component={UserPage} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(state => ({
  signedIn: !!state[moduleName].user,
}))(Root)
