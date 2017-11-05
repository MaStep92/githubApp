import React, { Component } from 'react';

import './index.css';

class FiltersBox extends Component {
  render() {
    const exit = this.props.reposLanguages.map((el, index) => {
      if (el === null)
        return (
          <option key={index} value="Not selected">
            Not selected
          </option>
        );
      return (
        <option key={index} value={el}>
          {el}
        </option>
      );
    });

    return (
      <div className="FiltersBox">
        <div className="filters">
          <div className="filter">
            <label htmlFor="update">Type</label>
            <select
              name="type"
              onChange={e => this.props.handleFilter(e, 'type')}
            >
              <option value="all">all</option>
              <option value="forks">forks</option>
              <option value="sources">sources</option>
            </select>
          </div>
          <div className="filter">
            <label htmlFor="update">Language</label>
            <select
              name="lang"
              onChange={e => this.props.handleFilter(e, 'lang')}
            >
              <option value="all">all</option>
              {exit}
            </select>
          </div>
          <div className="filter">
            <label htmlFor="issue">Has open issue</label>
            <input
              name="issue"
              type="checkbox"
              onChange={e => this.props.handleFilter(e, 'openIssues')}
            />
          </div>
          <div className="filter">
            <label htmlFor="topics">Has topics</label>
            <input
              name="topics"
              type="checkbox"
              onChange={e => this.props.handleFilter(e, 'hasTopics')}
            />
          </div>
          <div className="filter">
            <label htmlFor="started">Starred > than</label>
            <input
              name="started"
              type="number"
              onChange={e => this.props.handleFilter(e, 'started')}
            />
          </div>
          <div className="filter">
            <label htmlFor="update">Update after</label>
            <input
              name="update"
              type="date"
              onChange={e => this.props.handleFilter(e, 'updateAfter')}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default FiltersBox;
