import { push } from 'react-router-redux'
import * as api from './api';
import { message} from 'antd';
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';

function attrChange(attr, value){
  return {
    type:'meetingListAttrChange',
    attr:attr,
    value:value,
  }
}
export const queryServiceList = (id,key) => (dispatch, getState) => {
  let state = getState().serviceList;
  let tabsCorpActiveKey = key ? key : state.tabsCorpActiveKey;
  dispatch(attrChange('tabsCorpActiveKey', tabsCorpActiveKey));
  let params = {
    corp_id:id
  }
  switch(tabsCorpActiveKey){
    case 'service':
      dispatch(attrChange('loading', true));
      api.getServiceList(params).then(function(data){
        dispatch({
          type:'getServiceList',
          data:data,
        })
      },function(){})
      break;
    case 'receipt':
     dispatch(attrChange('loading', true));
     api.getReceiptSettingsList(params).then(function(data){
       dispatch({
         type:'getReceiptSettingsList',
         data:data,
       })
     },function(){})
      break;
    default:
      return state;
  }
}
export const getCorpInfo = (corp_id) => (dispatch, getState) => {
  let params = {
    corp_id:corp_id
  }
  api.getCorpInfo(params).then(function(data){
    dispatch(attrChange('corp_name', data.result.corp_name));
  },function(){})
}
export const editServiceState = (id,state,corp_id) => (dispatch, getState) => {
  let params = {
    corp_service_id:id,
    state:state,
    corp_id:corp_id
  }
  api.editServiceState(params).then(function(data){
    message.success('操作成功');
    dispatch(queryServiceList(corp_id));
  },function(){})
}
export const initializeService = (id) => (dispatch, getState) => {
  let params = {
    corp_id:id
  }
  api.initializeService(params).then(function(data){
      message.success('初始化成功');
      dispatch(queryServiceList(id));
  },function(){})
}


export const modalReceiptSettingsChanges = (values) => (dispatch, getState) => {
  let state = getState().serviceList;  
  let params =  Object.assign(state.receiptSetData,values);
  switch(state.receiptSetType){
    case 'addReceiptSettings':
    case 'changesReceiptSettings':
      api.setChargeDistInfo(params).then(function(data){
          message.success('设置成功');
          dispatch(queryServiceList(params.corp_id));
          dispatch(handleCancel());
      },function(){})
      break;
    case 'renewalReceiptSettings':
      api.setRenewalReceiptSettings(params).then(function(data){
          message.success('设置成功');
          dispatch(queryServiceList(params.corp_id));
          dispatch(handleCancel());
      },function(){})
      break;
    default:
      return state;
  }
}
export function changeRenewalMethod(rule, value, callback){
  return dispatch => {
    if (value === '2') {
      dispatch(attrChange('receiptSetInputDisabled', false));
      callback();
    } else {
      dispatch(attrChange('receiptSetInputDisabled', true));
      callback();
    }
  }
}
export const showSetCorpModal = (actionType,actionData) => (dispatch, getState) => {
  let state = getState().serviceList;  
  switch(actionType){
    case 'addReceiptSettings':
      dispatch({
        type:'actionReceiptSet',
        receiptSetData:actionData,
        receiptSetType:actionType,
        receiptSetDateDisabled:false,
        initialRenewalMethodDate:[],
        receiptSetInputDisabled:false,
        visible:true,
      })
      break;
    case 'changesReceiptSettings':
      dispatch({
        type:'actionReceiptSet',
        receiptSetData:actionData,
        receiptSetType:actionType,
        receiptSetDateDisabled:true,
        initialRenewalMethodDate:[moment(actionData.charge_start_time , dateFormat), moment(actionData.charge_end_time, dateFormat)],
        receiptSetInputDisabled:false,
        visible:true,
      })
      break;
    case 'renewalReceiptSettings':
      let params = {
        corp_id:actionData.corp_id,
        service_id:actionData.service_id,
      }
      api.getListRenewalInfo(params).then(function(data){
        data.result['service_name'] = actionData.service_name;
        dispatch({
          type:'actionReceiptSet',
          receiptSetData:data.result,
          receiptSetType:actionType,
          receiptSetDateDisabled:false,
          initialRenewalMethodDate:[moment(data.result.charge_start_time , dateFormat), moment(data.result.charge_end_time, dateFormat)],
          receiptSetInputDisabled:true,
          visible:true,
        })
      },function(){})
      break;
    default:
      return state;
  }
}
// 打开模态框查看日志
export const viewReceiptSettingsLog = (actionData,newParams) => (dispatch, getState) => {
  let state = getState().serviceList;  
  let params = {
    corp_id:actionData.corp_id,
    service_id:actionData.service_id,
    page:state.page,
    size:state.size,
  }
  Object.assign(params, newParams);
  api.getViewReceiptSettingsLog(params).then(function(data){
    dispatch({
      type:'viewReceiptSettingsLog',
      data:data,
      visibleReceiptSetLog:true,
      receiptSetData:actionData
    })
  },function(){})
}

export function handleCancel(){
  return dispatch => {
    dispatch(attrChange('visible', false));
    dispatch(attrChange('visibleReceiptSetLog', false));
  }
}
export const onChangeChargeType = (key) => (dispatch, getState) => {
  dispatch(attrChange('chargeType', key.target.value));
}
export const setReceiptModeSettings = (params) => (dispatch, getState) => {
  let state = getState().serviceList;  
  api.setReceiptModeSettings(params).then(function(data){
    message.success('设置成功');
    dispatch(queryServiceList(params.corp_id));
  },function(){})
}


