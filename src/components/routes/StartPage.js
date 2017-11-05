import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  searchUsers,
  resetSearchUser,
  moduleName,
} from '../../ducks/searchUsers'

import SearchUsersForm from '../SearchUsersForm'

import './index.css'

class StartPage extends Component {
  render() {
    const {
      searchUsers,
      isFetching,
      users,
      resetSearchUser,
      history,
    } = this.props

    return (
      <div className="start-page">
        <img
          src="https://s3-us-west-2.amazonaws.com/bbrassart/github_icon.png"
          className="logo"
          alt="logo"
        />
        <h1 className="name">GitHub client</h1>
        <SearchUsersForm
          searchUsers={searchUsers}
          resetSearchUser={resetSearchUser}
          isFetching={isFetching}
          users={users}
          history={history}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    users: state[moduleName].users,
    isFetching: state[moduleName].isFetching,
  }),
  { searchUsers, resetSearchUser },
)(StartPage)
