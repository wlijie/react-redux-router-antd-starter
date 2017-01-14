import * as api from './api';

import { message } from 'antd';
export const query = (key,newParams) => (dispatch, getState) => {
  let state = getState().orderList;
  let tabsActiveKey = key ? key : state.tabsActiveKey;
  dispatch(attrChange('tabsActiveKey', tabsActiveKey));
  switch(tabsActiveKey){
    case 'venue':
      dispatch(attrChange('loading', true));
      var params = {
        page:state.page,
        size:state.size,
      }
      Object.assign(params, newParams);
      api.getSelectBook(params).then(function(data){
          dispatch({
            type:'getSelect',
            data: data,
          })
      },function(){})
      break;
    case 'contest':
      dispatch(attrChange('loading', true));
      var params = {
        page:state.page,
        size:state.size,
      }
      Object.assign(params, newParams);
      api.getSelectContest(params).then(function(data){
          dispatch({
            type:'getSelect',
            data: data,
          })
      },function(){})
      break;
    default:
      return state;
  }
}
export const downSelect = (params) => (dispatch, getState) => {
    let state = getState().orderList;
    params['size'] = state.size;
    switch(state.tabsActiveKey){
      case 'venue':
        window.open(`/order/index/down_select_book?${parseParam(params)}`);
        break;
      case 'contest':
        window.open(`/order/index/down_select_contest?${parseParam(params)}`);
        break;
      default:
        return state;
    }
}
function parseParam(param, key) {
  let paramStr = "";
  if (typeof param === 'string' || typeof param === 'number' || typeof param === 'boolean') {
    paramStr += "&" + key + "=" + encodeURIComponent(param);
  } else {
    for (let i in param){
      let k = key == null ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i);
      paramStr += '&' + parseParam(param[i], k);
    }
  }
  return paramStr.substr(1);
};
export const getVenuteScreeningConditions = () => (dispatch, getState) => {
  let state = getState().orderList;
  api.getVenuteScreeningConditions().then(function(data){
    dispatch({
      type:'getVenuteScreeningConditions',
      data: data,
    })
  },function(){})
}
export const orderScreeningToggle = () => (dispatch, getState) => {
  let state = getState().orderList;
  dispatch(attrChange('expand', !state.expand));
}
function attrChange(attr, value){
  return {
    type:'meetingListAttrChange',
    attr:attr,
    value:value,
  }
}
export function filterSearchChange(staticSearch){
  return dispatch => {
    dispatch(attrChange('staticSearch', staticSearch));
  }
}
