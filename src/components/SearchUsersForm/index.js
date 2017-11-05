import React, { Component } from 'react';
import debounce from 'lodash/debounce';

import UserCard from '../../components/UserCard';

import './index.css';

export default class SearchUsersForm extends Component {
  state = {
    cursor: 0,
  };

  handleSubmit = debounce(() => {
    this.inputLogin.value && this.props.searchUsers(this.inputLogin.value);
  }, 500);

  handleKeyDown = e => {
    const { users, resetSearchUser, history } = this.props;
    const { cursor } = this.state;

    if (e.keyCode === 38 && cursor > 0) {
      this.setState(prevState => ({
        cursor: prevState.cursor - 1,
      }));
    } else if (e.keyCode === 40 && cursor < users.length - 1) {
      this.setState(prevState => ({
        cursor: prevState.cursor + 1,
      }));
    } else if (e.keyCode === 13 && cursor <= users.length - 1) {
      history.push(`/user/${users[cursor].login}`);
      resetSearchUser();
    }
  };

  componentDidMount() {
    this.inputLogin.focus();
  }

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { users, isFetching } = this.props;
    const { cursor } = this.state;

    return (
      <div className="searchUserForm">
        <form className="startForm" onSubmit={this.onSubmit}>
          <input
            onKeyDown={this.handleKeyDown}
            type="text"
            onChange={this.handleSubmit}
            className="login"
            ref={login => (this.inputLogin = login)}
            placeholder="Type login"
          />

          {users.length && !isFetching ? (
            <div className="preloadUsers">
              <ul>
                {users.map((user, index) => (
                  <UserCard
                    key={user.id}
                    id={user.id}
                    className={`${cursor === index ? 'active' : ''}`}
                    login={user.login}
                    avatar={user.avatar_url}
                    type={user.type}
                    html_url={user.html_url}
                  />
                ))}
              </ul>
            </div>
          ) : null}
        </form>
      </div>
    );
  }
}
