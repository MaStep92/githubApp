import React from 'react'

function RepoCard(props) {
  return (
    <div
      className="repo-card"
      onClick={() => props.handleRepoModalOpen(props.repoName)}
    >
      <div className="post-content">
        <div className="name">{props.repoName}</div>
        <div className="description">
          {props.description ? props.description : 'No description.'}
        </div>
        {props.language ? <div className="lang">{props.language}</div> : null}
        {props.fork ? <div className="fork">Fork</div> : null}

        <div className="bottom">
          <div className="update">
            <div className="update-ico" />
            {props.update}
          </div>
          <div className="stars">
            <div className="stars-ico" />
            {props.stars}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RepoCard
