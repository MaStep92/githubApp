import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-modal';

import './index.css';

import Loader from '../../components/Loader';

class ModalRepoDetails extends Component {
  renderLoad() {
    return (
      <div className="modal-loader">
        <Loader />
      </div>
    );
  }

  renderBody() {
    const {
      repoDetails,
      repoDetailsContributors,
      repoDetailsLangs,
    } = this.props;

    return (
      <div className="modalRepoDetails">
        <h1 className="repoName">{repoDetails.name}</h1>

        <div className="links">
          <div>
            <a href={repoDetails.html_url}>Open on github</a>
          </div>
          {repoDetails.fork ? (
            <div>
              <a href={repoDetails.forks_url}>Link to fork</a>
            </div>
          ) : null}
        </div>

        <div className="contrib">
          <h5>Top contributors</h5>
          <table>
            <thead>
              <tr>
                <th />
                <th>UserName</th>
                <th>Contributions</th>
              </tr>
            </thead>
            <tbody>
              {repoDetailsContributors.map(c => (
                <tr key={c.id}>
                  <td>
                    <img src={c.avatar_url} className='avatar' alt="" />
                  </td>
                  <td>{c.login}</td>
                  <td>{c.contributions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {repoDetailsLangs.length ? (
          <div className="languages">
            <h5>Most used languages</h5>
            <table>
              <thead>
                <tr>
                  <th>Language</th>
                  <th>Code size</th>
                </tr>
              </thead>
              <tbody>
                {repoDetailsLangs.map((l, i) => (
                  <tr key={i}>
                    <td>{l.lang}</td>
                    <td>{l.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    );
  }

  render() {
    const { repoDetailsIsFetching, repoDetailsInit } = this.props;
    const style = {
      overlay: {
        transition: '.3s',
        backgroundColor: 'rgba(24, 39, 56, 0.83)',
      },
      content: {
        width: '500px',
        margin: 'auto',
      },
    }

    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          contentLabel="onRequestClose Example"
          onRequestClose={this.props.onRequestClose}
          style={style}
        >
          {!repoDetailsIsFetching && !repoDetailsInit
            ? this.renderBody()
            : this.renderLoad()}
        </Modal>
      </div>
    );
  }
}

ModalRepoDetails.propTypes = {};
ModalRepoDetails.defaultProps = {};

export default ModalRepoDetails;
