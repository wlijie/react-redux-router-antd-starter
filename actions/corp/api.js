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

export const getCorpList = getData('/corp/service/get_corp_list')
export const getServiceList = getData('/corp/service/get_corp_service')
export const editServiceState = getData('/corp/service/update_service_state','post')
export const initializeService = getData('/corp/service/init_crop_service','post')


export const getReceiptSettingsList = getData('/corp/service/list_charge_dist')
export const setChargeDistInfo = getData('/corp/service/add_charge_dist_set','post')
export const setRenewalReceiptSettings = getData('/corp/service/add_renewal_set','post')
export const getListRenewalInfo = getData('/corp/service/get_last_renewal_info')
export const getViewReceiptSettingsLog = getData('/corp/service/list_charge_dist_log')
export const setReceiptModeSettings = getData('/corp/service/add_corp_charge_type','post')

export const getCorpInfo = getData('/corp/service/get_corp_info')

export const dataStatisticsList = getData('/corp/service/list_data')


export const getVenuteScreeningConditions = getData('/order/index/venute_screening_conditions');
export const getSelectBook = getData('/order/index/select_book');
export const getSelectContest = getData('/order/index/select_contest');




