import * as api from './api';

import { message } from 'antd';
export const query = (newParams) => (dispatch, getState) => {
  dispatch(attrChange('loading', true));
  let state = getState().apiIndex;
  var params = {
    page:state.page,
    size:state.size,
    staticSearch:state.staticSearch,
    role:state.role,
    system:state.system,
  }
  Object.assign(params, newParams);
  api.getApiList(params).then(function(data){
    dispatch({
      type:'getApiList',
      data: data,
    })
  },function(){})
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
export const del = (id) => (dispatch, getState) => {
  let state = getState().apiIndex;
  api.delApi({
    api_id:id,
  }).then(function(data){
      message.success('操作成功',2);
      dispatch(query());
  },function(){})
} 