import { push } from 'react-router-redux'
import * as api from './api'
import { message } from 'antd';
export const getListMenu = () => (dispatch, getState) => {
  api.getListMenu().then(function(data){
    dispatch({
      type:'getListMenu',
      data:data,
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
	let state = getState().app;
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
    type:'openKeysChangeApp',
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