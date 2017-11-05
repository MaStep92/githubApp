import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export default class UserCard extends PureComponent {
  render() {
    const { login, avatar, html_url, type } = this.props;

    return (
      <li className={this.props.className}>
        <Link to={`/user/${login}`}>
          <div className="ac_results">
            <div className="ac_item poster list_item">
              <div className="main-info">
                <div className="image_content poster">
                  <img src={avatar} alt="avatar" />
                </div>
                <div className="content">
                  <div className="sub">
                    <span className="comma">
                      <span className="original_title">{login}</span>
                    </span>
                    <div className="comma">
                      <span className="release_date">{html_url}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <span className="media_type movie">{type}</span>
              </div>
            </div>
          </div>
        </Link>
      </li>
    );
  }
}
