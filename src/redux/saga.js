import { all } from 'redux-saga/effects'
import { saga as searchUsersSaga } from '../ducks/searchUsers'
import { saga as userDetailsSaga } from '../ducks/userDetails'

export default function* rootSaga() {
  yield all([searchUsersSaga(), userDetailsSaga()])
}
