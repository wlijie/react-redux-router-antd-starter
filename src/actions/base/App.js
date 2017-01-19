import { push } from 'react-router-redux'
import { message } from 'antd';
import * as api from '../api'


export const getMenu = () => (dispatch, getState) => {
  api.getMenu().then(function(data){
    dispatch({
      type: 'getMenu',
      data,
    })
  },function(){})
};
export const pushRouter = (link) => (dispatch, getState) => {
	if (link === '/'){
	    link = '';
	}
   dispatch(push(link))
};
export const onMenuOpenChange = (openKeys) => (dispatch, getState) => {
	let state = getState().App;
	const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
	const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));
	let nextOpenKeys = [];
	if (latestOpenKey) {
	  nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
	}
	if (latestCloseKey) {
	  nextOpenKeys = getAncestorKeys(latestCloseKey);
	}
	dispatch(attrChange('openKeys', nextOpenKeys));
};
function attrChange(attr, value){
  return {
    type:'change_app_attr',
    attr:attr,
    value:value,
  }
};
function getAncestorKeys(key) {
  const map = {
    sub3: ['sub2'],
  };
  return map[key] || [];
};