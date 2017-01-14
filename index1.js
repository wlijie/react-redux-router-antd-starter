import "babel-polyfill"
import React, {Component, PropTypes} from 'react';
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router';

import { render } from 'react-dom'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
// import hashHistory from './components/history'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

// import 'antd/dist/antd.css';

import './css/corp/corpList.css'
import './css/corp/dataStatistics.css'
import './css/corp/serviceList.css'

import './css/dataStatistics/statisticsHome.css'

import './css/openApi/addApi.css'
import './css/openApi/apiIndex.css'
import './css/openApi/desApi.css'
import './css/openApi/addApi.css'

import './css/order/orderList.css'

import './css/settle/settleList.css'


const store   = configureStore()
const history = syncHistoryWithStore(hashHistory, store)
//首页
const app = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./containers/app').default)
  },'app')
}
const home = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./containers/home').default)
  },'home')
}
const childIndex = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./containers/childIndex').default)
  },'childIndex')
}
// API 管理
const apiList = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./containers/openApi/apiList').default)
  },'apiList')
}
const addApi = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./containers/openApi/addApi').default)
  },'addApi')
}
const editApi = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./containers/openApi/editApi').default)
  },'editApi')
}
const desApi = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./containers/openApi/desApi').default)
  },'desApi')
}
//数据统计
const statisticsHome = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./containers/dataStatistics/statisticsHome').default)
  },'statisticsHome')
}
//商家管理
const corpList = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./containers/corp/corpList').default)
  },'corpList')
}
const serviceList = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./containers/corp/serviceList').default)
  },'serviceList')
}
const dataStatistics = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./containers/corp/dataStatistics').default)
  },'dataStatistics')
}
//订单管理
const orderList = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./containers/order/orderList').default)
  },'orderList')
}
//财务管理
const settleList = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./containers/settle/settleList').default)
  },'settleList')
}


render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" getComponent={app} breadcrumbName="首页">
          {/* 当 url 为/时渲染 home */}
          <IndexRoute getComponent={home}/>
          {/* API管理 */}
          <Route path="/openApi" getComponent={childIndex} breadcrumbName="API 管理">
            <IndexRoute getComponent={apiList}/>
            <Route path="/openApi/addApi" getComponent={addApi} breadcrumbName="API 添加"/>
            <Route path="/openApi/editApi/:id" getComponent={editApi} breadcrumbName="API 编辑"/>
            <Route path="/openApi/desApi/:id" getComponent={desApi} breadcrumbName="API 详情"/>
          </Route>
          {/* 数据统计 */}
          <Route path="/statisticsIndex" getComponent={childIndex} breadcrumbName="数据统计">
            <IndexRoute getComponent={statisticsHome}/>
          </Route>
          {/* 商家管理 */}
          <Route path="/corp" getComponent={childIndex} breadcrumbName="商家管理">
            <IndexRoute getComponent={corpList}/>
            <Route path="/corp/serviceList/:id" getComponent={serviceList} breadcrumbName="设置"/>
            <Route path="/corp/dataStatistics/:id" getComponent={dataStatistics} breadcrumbName="数据统计"/>
          </Route>
          {/* 订单管理 */}
          <Route path="/order" getComponent={childIndex} breadcrumbName="订单管理">
            <IndexRoute getComponent={orderList}/>
          </Route>
          {/* 财务管理 */}
          <Route path="/settle" getComponent={childIndex} breadcrumbName="财务管理">
            <IndexRoute getComponent={settleList}/>
          </Route>
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('app')
)
