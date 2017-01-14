import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
// import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import hashHistory from '../components/history'
import { routerMiddleware} from 'react-router-redux'

const middleware = routerMiddleware(hashHistory);
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  middleware
  // createLogger()
)(createStore)

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
  
}
