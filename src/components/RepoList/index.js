import React, { Component } from 'react'
import { connect } from 'react-redux'

import RepoCard from '../RepoCard'
import InfiniteScroll from '../InfiniteScroll'
import Loader from '../Loader'

import { formateDate } from '../../utils/'

import './index.css'

class Repolist extends Component {
  state = {
    isShowingModal: false,
  }

  loadMore = () => {
    const {
      login,
      fetchUserRepos,
      repoPage,
      isReposFetching,
      init,
    } = this.props

    if (!isReposFetching && init) {
      fetchUserRepos(login, repoPage)
    }
  }

  handleSort = sort => () => {
    this.props.handleSortOrder(sort)
  }

  handleSortBy = sort => () => {
    this.props.handleSortBy(sort)
  }

  render() {
    const {
      sortBy,
      sortOrder,
      hasMoreRepos,
      fetchRepoDetails,
      repoPage,
      login,
      repos,
      handleRepoModalOpen
    } = this.props

    const sortByItems = [
      { name: 'Name', type: 'name' },
      { name: 'Stars count', type: 'stargazers_count' },
      { name: 'Open issues count', type: 'open_issues_count' },
      { name: 'Updated date', type: 'updated_at' },
    ]

    const showFirstItems = [
      { name: 'Ascending', type: 'asc' },
      { name: 'Descending', type: 'desc' },
    ]

    return (
      <div className="repolist">
        <div className="sortWrap">
          <div className="repos-sorted">
            <div className="sorter-title">Sort by:</div>

            {sortByItems.map((i, k) => (
              <div
                key={k}
                className={`sorter-item ${sortBy === i.type ? 'active' : ''}`}
                onClick={this.handleSortBy(i.type)}
              >
                {i.name}
              </div>
            ))}
          </div>

          <div className="repos-sorted">
            <div className="sorter-title">Show first:</div>
            {showFirstItems.map((i, k) => (
              <div
                key={k}
                className={`sorter-item ${sortOrder === i.type
                  ? 'active'
                  : ''}`}
                onClick={this.handleSort(i.type)}
              >
                {i.name}
              </div>
            ))}
          </div>
        </div>

        <InfiniteScroll
          pageStart={repoPage}
          loadMore={this.loadMore}
          hasMore={hasMoreRepos}
          threshold={600}
          loader={
            <div className="loader">
              <Loader />
            </div>
          }
        >
          <div className="cards">
            {repos.map(repo => (
              <RepoCard
                key={repo.id}
                repoName={repo.name}
                update={formateDate(repo.updated_at)}
                description={repo.description}
                avatar={repo.avatar_url}
                language={repo.language}
                stars={repo.stargazers_count}
                fork={repo.fork}
                fetchRepoDetails={fetchRepoDetails}
                user={login}
                handleRepoModalOpen={handleRepoModalOpen}
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    )
  }
}

export default Repolist
