import React, { Component } from 'react'
import { connect } from 'react-redux'

import ModalRepoDetails from '../ModalRepoDetails'

import {
  fetchUser,
  fetchUserRepos,
  changeSortBy,
  addFilterUserRepos,
  changeSortOrder,
  fetchRepoDetails,
  resetUserInfo,
  userInfoSelector,
  hasMoreReposSelector,
  repoPageSelector,
  reposLanguagesSelector,
  initSelector,
  isReposFetchingSelector,
  sortBySelector,
  sortOrderSelector,
  filteredReposSelector,
  repoDetailsInitSelector,
  repoDetailsDataSelector,
  repoDetailsIsFetchingSelector,
  repoDetailsLangsDataSelector,
  repoDetailsContributorsSelector,
} from '../../ducks/userDetails'

import UserInfo from '../UserInfo'
import RepoList from '../RepoList'

import './index.css'

class UserPage extends Component {
  state = {
    isShowingModal: false,
  }

  componentWillMount() {
    const { fetchUser, match } = this.props

    fetchUser(match.params.login)
  }

  handleRepoModalOpen = repoName => {
    this.props.fetchRepoDetails(this.props.userInfo.login, repoName)

    this.setState({ isShowingModal: true })
  }

  handleClose = () => this.setState({ isShowingModal: false })

  handleFilter = (e, filterType) => {
    switch (filterType) {
      case 'lang':
        const lang = e.target.value === 'Not selected' ? null : e.target.value

        this.props.addFilterUserRepos({ filterType, lang })
        break

      case 'hasTopics':
        this.props.addFilterUserRepos({
          filterType,
          checked: e.target.checked,
        })
        break

      case 'openIssues':
        this.props.addFilterUserRepos({
          filterType,
          checked: e.target.checked,
        })
        break

      case 'type':
        this.props.addFilterUserRepos({ filterType, data: e.target.value })
        break

      case 'started':
        this.props.addFilterUserRepos({ filterType, data: +e.target.value })
        break

      case 'updateAfter':
        this.props.addFilterUserRepos({ filterType, date: e.target.value })
        break
    }
  }

  handleSortBy = sort => {
    this.props.changeSortBy(sort)
  }

  handleSortOrder = sort => {
    this.props.changeSortOrder(sort)
  }

  render() {
    const {
      userInfo,
      reposLanguages,
      fetchUserRepos,
      sortBy,
      sortOrder,
      repos,
      repoPage,
      fetchRepoDetails,
      hasMoreRepos,
      isReposFetching,
      init,
      repoDetailsInit,
      repoDetailsData,
      repoDetailsIsFetching,
      resetUserInfo,
      repoDetailsLangs,
      repoDetailsContributors
    } = this.props

    return (
      <div className="user-page">
        <ModalRepoDetails
          isOpen={this.state.isShowingModal}
          onRequestClose={this.handleClose}
          repoDetailsInit={repoDetailsInit}
          repoDetails={repoDetailsData}
          repoDetailsIsFetching={repoDetailsIsFetching}
          repoDetailsLangs={repoDetailsLangs}
          repoDetailsContributors={repoDetailsContributors}
        />

        <div className="main-block">
          <UserInfo
            userInfo={userInfo}
            reposLanguages={reposLanguages}
            handleFilter={this.handleFilter}
            history={this.props.history}
            resetUserInfo={resetUserInfo}
          />

          <div className="mainWrapper">
            <RepoList
              handleSortOrder={this.handleSortOrder}
              handleSortBy={this.handleSortBy}
              fetchUserRepos={fetchUserRepos}
              sortBy={sortBy}
              sortOrder={sortOrder}
              hasMoreRepos={hasMoreRepos}
              fetchRepoDetails={fetchRepoDetails}
              repoPage={repoPage}
              login={userInfo.login}
              repos={repos}
              isReposFetching={isReposFetching}
              init={init}
              handleRepoModalOpen={this.handleRepoModalOpen}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    userInfo: userInfoSelector(state),
    hasMoreRepos: hasMoreReposSelector(state),
    reposLanguages: reposLanguagesSelector(state),
    repoPage: repoPageSelector(state),
    init: initSelector(state),
    repos: filteredReposSelector(state),
    isReposFetching: isReposFetchingSelector(state),
    sortBy: sortBySelector(state),
    sortOrder: sortOrderSelector(state),
    repoDetailsInit: repoDetailsInitSelector(state),
    repoDetailsData: repoDetailsDataSelector(state),
    repoDetailsIsFetching: repoDetailsIsFetchingSelector(state),

    repoDetailsLangs: repoDetailsLangsDataSelector(state),

    repoDetailsContributors: repoDetailsContributorsSelector(state),
  }),
  {
    fetchUser,
    fetchUserRepos,
    addFilterUserRepos,
    changeSortOrder,
    changeSortBy,
    fetchRepoDetails,

    resetUserInfo,
  },
)(UserPage)
