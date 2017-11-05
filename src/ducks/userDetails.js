import { all, call, put, takeEvery } from 'redux-saga/effects'
import { appName } from '../config'
import { getUserInfo, getUserRepos, getRepoDetails } from '../api'
import { createSelector } from 'reselect'
import { reposMapping } from '../utils/reposMapping'
import { mergeLangs } from '../utils/'

/**
 * Constants
 * */
export const moduleName = 'userDetails'

export const FETCH_USER_REQUEST = `${appName}/${moduleName}/FETCH_USER_REQUEST`
export const FETCH_USER_SUCCESS = `${appName}/${moduleName}/FETCH_USER_SUCCESS`
export const FETCH_USER_FAILED = `${appName}/${moduleName}/FETCH_USER_FAILED`

export const FETCH_USER_REPOS_REQUEST = `${appName}/${moduleName}/FETCH_USER_REPOS_REQUEST`
export const FETCH_USER_REPOS_SUCCESS = `${appName}/${moduleName}/FETCH_USER_REPOS_SUCCESS`
export const FETCH_USER_REPOS_FAILED = `${appName}/${moduleName}/FETCH_USER_REPOS_FAILED`

export const FETCH_USER_REPOS_DETAILS_REQUEST = `${appName}/${moduleName}/FETCH_USER_REPOS_DETAILS_REQUEST`
export const FETCH_USER_REPOS_DETAILS_SUCCESS = `${appName}/${moduleName}/FETCH_USER_REPOS_DETAILS_SUCCESS`
export const FETCH_USER_REPOS_DETAILS_FAILED = `${appName}/${moduleName}/FETCH_USER_REPOS_DETAILS_FAILED`

export const ADD_FILTER_USER_REPOS = `${appName}/${moduleName}/ADD_FILTER_USER_REPOS`
export const CHANGE_SORT_BY = `${appName}/${moduleName}/CHANGE_SORT_BY`
export const CHANGE_SORT_ORDER = `${appName}/${moduleName}/CHANGE_SORT_ORDER`

export const CHANGE_URL = 'CHANGE_URL'

export const RESET_USER_INFO = 'RESET_USER_INFO'

const initialState = {
  isFetching: false,
  init: false,
  isReposFetching: false,
  repoPage: 1,
  repos: [],
  reposLanguages: [],
  userInfo: {},
  hasMoreRepos: true,
  filters: [],
  sortBy: 'name',
  sortOrder: 'asc',
  repoDetails: {
    init: true,
    data: {},
    isFetching: false,
    contributors: [],
    langs: []
  },
}

/**
 * Reducer
 * */

export default function reducer(state = initialState, action) {
  const { type } = action

  switch (type) {
    case RESET_USER_INFO:
      return {
        ...initialState,
      }

    case FETCH_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
      }

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        isFetching: true,
        init: true,
        userInfo: {
          ...state.info,
          ...action.info,
        },
      }

    case FETCH_USER_FAILED:
      return {}

    case FETCH_USER_REPOS_REQUEST:
      return {
        ...state,
        isReposFetching: true,
      }

    case FETCH_USER_REPOS_SUCCESS:
      return {
        ...state,
        isReposFetching: false,
        repos: [...state.repos, ...action.repos],
        reposLanguages: mergeLangs(state.reposLanguages, action.langs),
        hasMoreRepos: action.repos.length === 30,
        repoPage: state.repoPage + 1,
      }

    case FETCH_USER_REPOS_FAILED:
      return {}

    case FETCH_USER_REPOS_DETAILS_REQUEST:
      return {
        ...state,
        repoDetails: {
          ...state.repoDetails,
          isFetching: true,
        },
      }

    case FETCH_USER_REPOS_DETAILS_SUCCESS:
      return {
        ...state,
        repoDetails: {
          ...state.repoDetails,
          isFetching: false,
          init: false,
          data: action.data,
          langs: action.langs,
          contributors: action.contributors,
        },
      }

    case FETCH_USER_REPOS_DETAILS_FAILED:
      return {}

    case ADD_FILTER_USER_REPOS:
      const filters = state.filters.filter(
        f => f.filterType !== action.filter.filterType,
      )

      return {
        ...state,
        filters: [...filters, action.filter],
      }

    case CHANGE_SORT_BY:
      return {
        ...state,
        sortBy: action.sort,
      }

    case CHANGE_SORT_ORDER:
      return {
        ...state,
        sortOrder: action.sort,
      }

    default:
      return state
  }
}

export const resetUserInfo = () => ({
  type: RESET_USER_INFO,
})

export const changeSortBy = sort => ({
  type: CHANGE_SORT_BY,
  sort,
})

export const changeSortOrder = sort => ({
  type: CHANGE_SORT_ORDER,
  sort,
})

export const addFilterUserRepos = filter => ({
  type: ADD_FILTER_USER_REPOS,
  filter,
})

export function fetchUser(login) {
  return {
    type: FETCH_USER_REQUEST,
    payload: login,
  }
}

export function fetchUserRepos(login, page = 1) {
  return {
    type: FETCH_USER_REPOS_REQUEST,
    payload: login,
    page,
  }
}

export function fetchRepoDetails(userName, repo) {
  return {
    type: FETCH_USER_REPOS_DETAILS_REQUEST,
    userName,
    repo,
  }
}

/**
 * Sagas
 * */
function* fetchUserSaga(action) {
  try {
    const user = yield call(getUserInfo, action.payload)

    yield put({ type: FETCH_USER_SUCCESS, info: user.data })
  } catch (e) {
    yield put({ type: FETCH_USER_FAILED, error: e })
  }
}

function* fetchUserReposSaga(action) {
  try {
    const data = yield call(getUserRepos, action.payload, action.page)

    yield put({
      type: FETCH_USER_REPOS_SUCCESS,
      repos: data.repos,
      langs: data.langs,
    })
  } catch (e) {
    yield put({ type: FETCH_USER_REPOS_FAILED, error: e })
  }
}

function* fetchUserRepoDetailsSaga(action) {
  try {
    const data = yield call(getRepoDetails, action.userName, action.repo)

    yield put({
      type: FETCH_USER_REPOS_DETAILS_SUCCESS,
      data: data.repo,
      langs: data.filteredLanguages,
      contributors: data.filteredContributors,
    })
  } catch (e) {
    console.error(e)
    // yield put({ type: FETCH_USER_REPOS_DETAILS_FAILED, error: e })
  }
}

export const saga = function*() {
  yield all([
    takeEvery(FETCH_USER_REQUEST, fetchUserSaga),
    takeEvery(FETCH_USER_REPOS_REQUEST, fetchUserReposSaga),
    takeEvery(FETCH_USER_REPOS_DETAILS_REQUEST, fetchUserRepoDetailsSaga),
  ])
}

/**
 * Selectors
 * */
export const stateSelector = state => state[moduleName]

export const isFetchingSelector = createSelector(
  stateSelector,
  state => state.isFetching,
)

export const initSelector = createSelector(stateSelector, state => state.init)

export const isReposFetchingSelector = createSelector(
  stateSelector,
  state => state.isReposFetching,
)

export const repoPageSelector = createSelector(
  stateSelector,
  state => state.repoPage,
)

export const reposSelector = createSelector(
  stateSelector,
  state => state.repos,
)

export const reposLanguagesSelector = createSelector(
  stateSelector,
  state => state.reposLanguages,
)

export const userInfoSelector = createSelector(
  stateSelector,
  state => state.userInfo,
)

export const hasMoreReposSelector = createSelector(
  stateSelector,
  state => state.hasMoreRepos,
)

export const filtersSelector = createSelector(
  stateSelector,
  state => state.filters,
)

export const sortBySelector = createSelector(
  stateSelector,
  state => state.sortBy,
)

export const sortOrderSelector = createSelector(
  stateSelector,
  state => state.sortOrder,
)

export const repoDetailsInitSelector = createSelector(
  stateSelector,
  state => state.repoDetails.init,
)

export const repoDetailsDataSelector = createSelector(
  stateSelector,
  state => state.repoDetails.data,
)

export const repoDetailsIsFetchingSelector = createSelector(
  stateSelector,
  state => state.repoDetails.isFetching,
)

export const repoDetailsLangsDataSelector = createSelector(
  stateSelector,
  state => state.repoDetails.langs,
)
export const repoDetailsContributorsSelector = createSelector(
  stateSelector,
  state => state.repoDetails.contributors,
)

export const filteredReposSelector = createSelector(
  reposSelector,
  filtersSelector,
  sortBySelector,
  sortOrderSelector,
  (userRepos, filters, sortBy, sortOrder) => {
    return reposMapping(userRepos, filters, sortBy, sortOrder)
  },
)
