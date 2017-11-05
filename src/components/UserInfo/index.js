import React, { PureComponent } from 'react';
import FiltersBox from '../FiltersBox';
import MdArrowBack from 'react-icons/lib/md/arrow-back';

import './index.css';

export default class UserInfo extends PureComponent {
  handleGoBack = () => {
    this.props.resetUserInfo();

    this.props.history.goBack();
  };

  render() {
    const {
      avatar_url,
      bio,
      email,
      followers,
      location,
      login,
      name,
      public_gists,
      public_repos,
    } = this.props.userInfo;

    return (
      <div className="userInfo">
        <div className="main">
          <div className="backButton" onClick={this.handleGoBack}>
            <MdArrowBack size="24" />
          </div>

          <section className="mainInfo">
            <div className="mainContainer">
              <img src={avatar_url} className="userAvatar" alt="avatar" />

              <div>
                <div className="userLogin">{login}</div>
                <div>{name}</div>
              </div>
            </div>

            <div className="info">
              <div>
                <div>
                  <b>Location:</b> {location}
                </div>
                <div>
                  <b>Followers:</b> {followers}
                </div>
              </div>

              <div>
                <div>
                  <b>Public Gists:</b> {public_gists}
                </div>
                <div>
                  <b>Public Repos:</b> {public_repos}
                </div>
              </div>
            </div>

            {email && <div>Email - {email}</div>}
            <div>
              <b>Bio:</b> {bio}
            </div>
          </section>
          <br />
          <section />
        </div>

        <FiltersBox
          reposLanguages={this.props.reposLanguages}
          handleFilter={this.props.handleFilter}
        />
      </div>
    );
  }
}
