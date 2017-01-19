let initState = {
  serviceData:[],
  receiptData:[],
  logData:[],
  loading: false,
  page:1,
  size:10,
  total:null,
  corp_name:null,
  visible:false,
  tabsCorpActiveKey:'receipt',
  chargeType:null,
  receiptSetData:{},
  receiptSetType:null,
  initialRenewalMethodType:'1',//默认续期方式
  receiptSetDateDisabled:false,//默认是否禁止选择计费日期
  receiptSetInputDisabled:false,//默认是否禁止填写收费设置
  initialRenewalMethodDate:[],//默认显示计费日期
  visibleReceiptSetLog:false,//默认显示日志表格
}
export default function(state = initState, action){
  switch(action.type){
    case 'getServiceList':
      return Object.assign({}, state, {
        serviceData:action.data.data,
        loading: false,
        page:action.data.page,
        size:action.data.size,
        total:action.data.total,
      })
    case 'getReceiptSettingsList':
      return Object.assign({}, state, {
        receiptData:action.data.result.data,
        loading: false,
        chargeType:action.data.result.charge_type,
      })
    case 'actionReceiptSet':
      return Object.assign({}, state, {
        receiptSetData:action.receiptSetData,
        receiptSetType:action.receiptSetType,
        receiptSetDateDisabled:action.receiptSetDateDisabled,
        initialRenewalMethodDate:action.initialRenewalMethodDate,
        receiptSetInputDisabled:action.receiptSetInputDisabled,
        visible:action.visible,
      })
    case 'viewReceiptSettingsLog':
      return Object.assign({}, state, {
        receiptSetData:action.receiptSetData,
        logData:action.data.data,
        loading: false,
        page:action.data.page,
        size:action.data.size,
        total:action.data.total,
        visibleReceiptSetLog:action.visibleReceiptSetLog,
      })
    case 'meetingListAttrChange':
      return Object.assign({}, state, {
          [action.attr]:action.value,
      })
    default:
    return state;
  }
}
