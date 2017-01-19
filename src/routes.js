import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router';
//Base
import App from './containers/base/App';
import Home from './containers/base/Home';
//商家管理
import CorpList from './containers/corp/CorpList'
import serviceList from './containers/corp/serviceList'
import dataStatistics from './containers/corp/dataStatistics'
import orderList from './containers/corp/orderList'

const ApiIndex = React.createClass({
  render() {
    return (
      <div> 
        {this.props.children}
      </div>
    );
  },
});

export default (
  <Route path="/" component={App} breadcrumbName="首页">
    {/* 当 url 为/时渲染 home */}
    <IndexRoute component={Home}/>
    {/* 商家管理 */}
    <Route path="/corp" component={ApiIndex} breadcrumbName="商家管理">
      <IndexRoute component={CorpList}/>
      <Route path="/corp/serviceList/:id" component={serviceList} breadcrumbName="设置"/>
      <Route path="/corp/dataStatistics/:id" component={dataStatistics} breadcrumbName="数据统计"/>
    </Route>
    {/* 订单管理 */}
    <Route path="/order" component={ApiIndex} breadcrumbName="订单管理">
      <IndexRoute component={orderList}/>
    </Route>
  </Route>
);

