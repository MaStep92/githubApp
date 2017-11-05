import { appName } from '../config'
import { getUsers } from '../api'
import { all, call, put, takeEvery } from 'redux-saga/effects'

export const moduleName = 'searchUsers'
export const FETCH_USERS_LIST_REQUEST = `${appName}/${moduleName}/FETCH_USERS_LIST_REQUEST`
export const FETCH_USERS_LIST_SUCCESS = `${appName}/${moduleName}/FETCH_USERS_LIST_SUCCESS`
export const FETCH_USERS_LIST_FAILED = `${appName}/${moduleName}/FETCH_USERS_LIST_FAILED`
export const RESET_USERS_LIST = `${appName}/${moduleName}/RESET_USERS_LIST`


const initialState = {
  isFetching: false,
  init: true,
  users: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_LIST_REQUEST:
      return {
        ...state,
        isFetching: true,
        users: [],
        init: true
      }

    case FETCH_USERS_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: action.users,
        init: false,
      }

    case FETCH_USERS_LIST_FAILED:
      return {
        ...state,
        isFetching: false,
        users: [],
      }

    case RESET_USERS_LIST:
      return {
        ...state,
        isFetching: false,
        users: [],
        init: true
      }

    default:
      return state
  }
}


export function searchUsers(login) {
  return {
    type: FETCH_USERS_LIST_REQUEST,
    payload: login,
  }
}

export function resetSearchUser() {
  return {
    type: RESET_USERS_LIST,
  }
}

function* fetchUsersSaga(action) {
  try {
    const users = yield call(getUsers, action.payload)

    yield put({
      type: FETCH_USERS_LIST_SUCCESS,
      users: users.data.items.slice(0, 6),
    })
  } catch (e) {
    yield put({ type: FETCH_USERS_LIST_FAILED, error: e })
  }
}

export const saga = function*() {
  yield all([takeEvery(FETCH_USERS_LIST_REQUEST, fetchUsersSaga)])
}
