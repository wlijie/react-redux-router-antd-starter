import * as api from '../api';
import { push } from 'react-router-redux'
export const query = (newParams) => (dispatch, getState) => {
  dispatch(attrChange('loading', true));
  let state = getState().apiIndex;
  var params = {
    page:state.page,
    size:state.size,
  }
  Object.assign(params, newParams);
  api.getCorpList(params).then(function(data){
    dispatch({
      type:'getCorpList',
      data:data,
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

