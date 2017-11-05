import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import searchUsersReducer, {
  moduleName as serchUsersModule,
} from '../ducks/searchUsers'
import userDetailsReducer, {
  moduleName as userDetailsModule,
} from '../ducks/userDetails'

export default combineReducers({
  router,
  [serchUsersModule]: searchUsersReducer,
  [userDetailsModule]: userDetailsReducer,
})
