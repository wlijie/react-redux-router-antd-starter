import * as api from '../api';
import { push } from 'react-router-redux'
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';
export const query = (id) => (dispatch, getState) => {
  dispatch(attrChange('loading', true));
  let state = getState().dataStatistics;
  let params = {
    seller_corp_id:id,
    dim:state.dataStatisticsTabs,
  }
  api.dataStatisticsList(params).then(function(data){
    dispatch({
      type:'dataStatisticsSummary',
      data:data,
    })
  },function(){})
}
export const searchChartData = (id,action) => (dispatch, getState) => {
  let state = getState().dataStatistics;
  let params = {
    seller_corp_id:id,
    dateType:state.searchDateType,
    type : 'day',
  }
  switch(state.dataStatisticsTabs){
    case 'book':
      params['dim'] = 'book_day';
      break;
    case 'contest':
      params['dim'] = 'contest_order_day';
      break;
    default:
      return state;
  }
  if(action && action === "export"){
    if( params['dateType'] instanceof Array ){
      params['dateType'] = params['dateType'].join(',');
    }
    window.open(`/corp/service/export_${state.dataStatisticsTabs}_list_data?${parseParam(params)}`);
    return;
  }
  dispatch(attrChange('loading', true));
  console.log(params);
  api.dataStatisticsList(params).then(function(data){
    dispatch({
      type:'dataStatisticsChart',
      data:data,
      searchDate:[moment(data.start, dateFormat), moment(data.end, dateFormat)],
    })
  },function(){})
}
export const StatisticsTabs = (key,id) => (dispatch, getState) => {
  dispatch(attrChange('dataStatisticsTabs', key));
  dispatch(query(id));
  dispatch(searchChartData(id));
}
export const onChangeDate = (value, dateString) => (dispatch, getState) => {
  dispatch(attrChange('searchDateType', dateString));
  dispatch(attrChange('searchDate', value));
}
export const onChangeDateType = (e,id) => (dispatch, getState) => {
  dispatch(attrChange('searchDateType', e.target.value));
  dispatch(searchChartData(id));
}
function parseParam(param, key) {
  let paramStr = "";
  if (typeof param === 'string' || typeof param === 'number' || typeof param === 'boolean') {
    paramStr += "&" + key + "=" + encodeURIComponent(param);
  }else {
    for (let i in param){
      let k = key == null ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i);
      paramStr += '&' + parseParam(param[i], k);
    }
  }
  return paramStr.substr(1);
};
function attrChange(attr, value){
  return {
    type:'meetingListAttrChange',
    attr:attr,
    value:value,
  }
}