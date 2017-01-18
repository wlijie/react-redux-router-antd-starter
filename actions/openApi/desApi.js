import * as api from '../api';
import { message } from 'antd';
export const getParamsInfo = (id) => (dispatch, getState) => {
  dispatch(attrChange('loadingCard', true));
  if(id){
    api.getApiParamsInfo({
      api_id:id,
    }).then(function(data){
      dispatch({
        type:'getApiParamsInfo',
        data:data,
      })
    },function(){})
  }
}

function attrChange(attr, value){
  return {
    type:'meetingListAttrChange',
    attr:attr,
    value:value,
  }
}
export const showModal = (ioType,operateType,operateData) => (dispatch, getState) =>{
    operateData = operateData ? operateData : {};
    let operateFormData = operateData;
    if(operateType != 'edit'){
      operateFormData = {};
    }
    dispatch({
      type:'editParams',
      operateData:operateData,
      operateType:operateType,
      operateFormData:operateFormData,
      ioType:ioType,
    })
}
export function handleCancel(){
  return dispatch => {
    dispatch(attrChange('visible', false));
  }
}
export function handleOk(){
  return dispatch => {
    dispatch(attrChange('loading', true));
    setTimeout(() => {
      dispatch(attrChange('loading', false));
      dispatch(attrChange('visible', false));
    }, 3000);
  }
}


export function changeLimit(limit){
  return dispatch => {
    dispatch(attrChange('limit', limit));
    dispatch(getParamsInfo());
  }
}
export const modalParamsChanges = (_self) => (dispatch, getState) => {

  let  pk_api_params = _self.operateData.pk_api_params ? _self.operateData.pk_api_params : null ;
  let params = {
        api_id:_self.api_id,
        io_type:_self.ioType,
        param_name:_self.values.param_name,
        param_type:_self.values.param_type,
        param_name_internal:_self.values.param_name_internal,
        mark:_self.values.mark,
        param_null:_self.values.param_null,
        param_order:_self.values.param_order,
        api_param_id:pk_api_params,
      }
  switch(_self.operateType){
    case 'edit':
      api.editApiparams(params).then(function(data){
        message.success('保存成功');
         dispatch(getParamsInfo(_self.api_id));//必选加参数调用
      },function(){})
      break;
    case 'addChild':
      params.parent_id = pk_api_params;
      api.addApiparams(params).then(function(data){
        message.success('添加成功');
         dispatch(getParamsInfo(_self.api_id));//必选加参数调用
      },function(){})
      break;
    default:
      params.parent_id = 0;
      api.addApiparams(params).then(function(data){
       message.success('添加成功');
        dispatch(getParamsInfo(_self.api_id));//必选加参数调用
      },function(){})
  };
}
export const switchParameter = (_self,api_id) => (dispatch, getState) => {
  var params = {
    api_param_id:_self.pk_api_params,
  }
  switch(_self.state){
    case '1':
      api.deleteApiparams(params).then(function(data){
       message.success('操作成功');
        dispatch(getParamsInfo(api_id));
      },function(){})
      break;
    case '2':
      api.restoreApiparams(params).then(function(data){
        message.success('操作成功');
         dispatch(getParamsInfo(_self.api_id));//必选加参数调用
      },function(){})
      break;
    default:
    dispatch(getParamsInfo(_self.api_id));//必选加参数调用
  };
  
} 

