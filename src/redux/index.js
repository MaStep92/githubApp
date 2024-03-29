import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'
import history from '../history'

import rootSaga from '../redux/saga'

const sagaMiddleware = createSagaMiddleware()

const enhancer = applyMiddleware(
  sagaMiddleware,
  routerMiddleware(history),
  logger,
)

const store = createStore(reducer, enhancer)
window.store = store

sagaMiddleware.run(rootSaga)

export default store
