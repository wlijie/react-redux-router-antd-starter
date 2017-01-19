import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import App from './base/App'

import CorpList from './corp/CorpList'
import serviceList from './corp/serviceList'
import dataStatistics from './corp/dataStatistics'
import orderList from './corp/orderList'


const rootReducer = combineReducers({
  routing: routerReducer,
  App,
  
  CorpList,
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
