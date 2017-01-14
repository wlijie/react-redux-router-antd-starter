import fetch from 'isomorphic-fetch'
import { message } from 'antd';
var getData = function (url, type = 'get'){
  return function(params = {}){
    var fetchConfig = {
      method:type,
      credentials:'include',
    };
    let requestUrl;
    requestUrl = url;
    if(Object.keys(params).length !== 0){
      var paramsString = "";
      paramsString = Object.entries(params).reduce((previousValue, item)=>{
        // if(item[1] === ''){
        //   return previousValue;
        // }
        if(previousValue === ''){
          return item[0]+'='+item[1]
        }else{
          return previousValue+'&'+item[0]+'='+item[1]
        }
      }, '');
      if(type === 'post'){
        fetchConfig.body = paramsString;
        fetchConfig.headers = {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }else{
        requestUrl = requestUrl + '?' + paramsString;
      }
    }
    return new Promise(function(resolve, reject){
      fetch(requestUrl, fetchConfig)
        .then(response =>
          response.json().then(json => ({ json, response }))
        ).then(({ json, response }) => {
          if (!response.ok) {
            message.error('网络错误',2);
            return reject('网络错误')
          }
          if (json.error === 0) {
            return resolve(json);
          }else{
            message.warning(json.info,2);
            return reject(json.info);
          }
        }).catch(function(error){
          message.error('接口错误',2);
          return reject('接口错误')
        });
    })
  }
}
export const getListMenu = getData('/json/list_menu.json');

