import React from 'react';
import { Route, IndexRoute } from 'react-router';

//首页
import app from './containers/app';
import home from './containers/home';
import childIndex from './containers/childIndex';

//API 管理
import apiList from './containers/openApi/apiList';
import addApi from './containers/openApi/addApi';
import editApi from './containers/openApi/editApi';
import desApi from './containers/openApi/desApi';

//数据统计

//商家管理
import corpList from './containers/corp/corpList'
import serviceList from './containers/corp/serviceList'
import dataStatistics from './containers/corp/dataStatistics'

//订单管理
import orderList from './containers/order/orderList'

export default (
  <Route path="/" component={app} breadcrumbName="首页">
    {/* 当 url 为/时渲染 home */}
    <IndexRoute component={home}/>
    {/* API管理 */}
    <Route path="/openApi" component={childIndex} breadcrumbName="API 管理">
      <IndexRoute component={apiList}/>
      <Route path="/openApi/addApi" component={addApi} breadcrumbName="API 添加"/>
      <Route path="/openApi/editApi/:id" component={editApi} breadcrumbName="API 编辑"/>
      <Route path="/openApi/desApi/:id" component={desApi} breadcrumbName="API 详情"/>
    </Route>
    {/* 商家管理 */}
    <Route path="/corp" component={childIndex} breadcrumbName="商家管理">
      <IndexRoute component={corpList}/>
      <Route path="/corp/serviceList/:id" component={serviceList} breadcrumbName="设置"/>
      <Route path="/corp/dataStatistics/:id" component={dataStatistics} breadcrumbName="数据统计"/>
    </Route>
    {/* 订单管理 */}
    <Route path="/order" component={childIndex} breadcrumbName="订单管理">
      <IndexRoute component={orderList}/>
    </Route>
  </Route>
);

