import { push } from 'react-router-redux'
import * as api from '../api';
import { message } from 'antd';
export const reset = () => ({
  type:'resetMeetingEdit',
})
export const save = (value) => (dispatch, getState) => {
  api.addApiInfo(value).then(function(data){
    message.success('添加成功');
    dispatch(push('/openApi'));
  },function(){})
}



