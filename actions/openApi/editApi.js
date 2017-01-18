import { push } from 'react-router-redux'
import * as api from '../api';
import { message } from 'antd';
export const getInfo = (id) => (dispatch, getState) => {
  if(id){
    api.getApiInfo({
      api_id:id,
    }).then(function(data){
      dispatch({
        type:'getApiInfo',
        data:data,
      })
    },function(){})
  }
}
export const reset = () => ({
  type:'resetMeetingEdit',
})
export const save = (value) => (dispatch, getState) => {
  api.editApiInfo(value).then(function(data){
    message.success('保存成功');
    dispatch(push('/openApi'))
  },function(){})
}



