import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import app from './app'

import apiIndex from './openApi/apiIndex'
import editApi from './openApi/editApi'
import desApi from './openApi/desApi'

import corpList from './corp/corpList'
import serviceList from './corp/serviceList'
import dataStatistics from './corp/dataStatistics'
import orderList from './corp/orderList'


const rootReducer = combineReducers({
  routing: routerReducer,
  app,

  apiIndex,
  editApi,
  desApi,
  openApiSystem:()=>({
  	1:'报名',
  	2:'票务',
  	3:'场馆',
  }),
  openApiType:()=>({
  	1:'系统',
  	2:'角色',
  }),
  openApiState:()=>({
  	1:'启用',
  	2:'禁用',
  }),
  openApiRole:()=>({
  	1:'普通角色',
  }),
  openApiMethod:()=>({
  	1:'GET',
  	2:'POST',
  }),
  openApiParamsType:()=>({
    1:'数字',
    2:'字符串',
    3:'对象',
    4:'对象数组',
  }),
  openApiParamsNull:()=>({
    1:'非必选',
    2:'必选',
  }),
  
  corpList,
  serviceList,
  dataStatistics,
  serviceState:()=>({
    '1':'停用',
    '2':'启用'
  }),
  receiptType:()=>({
    '1':'平台收款',
    '2':'商户收款',
  }),
  feesType:()=>({
    '1':'按比例',
    '2':'固定收费'
  }),
  feesTypeUnit:()=>({
    '1':'%',
    '2':'元'
  }),
  renewalType:()=>({
    '1':'按原配置',
    '2':'按新配置'
  }),
  logActionsStatus:()=>({
    'set':'设置',
    'save':'修改',
    'renewal':'续期',
  }),
  dataStatisticsObj:()=>({
    "contest": {
      "amount": {
        name:"订单金额（元）",
        stroke:"#ff7300",
        unit:"元",
      },
      "amount_pay": {
        name:"支付金额（元）",
        stroke:"#000080",
        unit:"元",
      },
      "numbers": {
        name:"订单数",
        stroke:"#8B4513",
        unit:"",
      },
      "enrol_data_count": {
        name:"报名人数",
        stroke:"#8884d2",
        unit:"",
      },
    },
    "book": {
      "price_pay": {
        name:"金额（元）",
        stroke:"#ff7300",
        unit:"元",
      },
      "num_times": {
        name:"预订场地数",
        stroke:"#000080",
        unit:"",
      }, 
    }
  }),

  orderList,

})

export default rootReducer
