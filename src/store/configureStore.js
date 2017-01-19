import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'
import hashHistory from '../components/history'
import { routerMiddleware} from 'react-router-redux'
// import DevTools from '../containers/DevTools' // 引入DevTools调试组件
let thunkMiddlewares = [thunkMiddleware];
if (process.env.NODE_ENV === 'development') {
	const createLogger = require('redux-logger'); // 调用日志打印方法
  	thunkMiddlewares = [...thunkMiddlewares,createLogger()];
}
const middleware = routerMiddleware(hashHistory);
const createStoreWithMiddleware = compose(     // 利用compose增强store，这个 store 与 applyMiddleware 和 redux-devtools 一起使用
    applyMiddleware(...thunkMiddlewares,middleware),
    // DevTools.instrument(),
)(createStore)
export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}
