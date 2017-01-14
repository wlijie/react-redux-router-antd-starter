let initState = {
  loading: false, //模态框 按钮状态
  visible: false,
  loadingCard:false,
  data:[],
  ParamsData:{},
  operateFormData:{},
  apiInfo:{},
}
export default function(state = initState, action){
  switch(action.type){
    case 'getApiParamsInfo':
      return Object.assign({}, state, {
        apiInfo:action.data.result.api,
        ParamsData:action.data.result.apiParams,
        loadingCard:false,
      })
    case 'meetingListAttrChange':
      return Object.assign({}, state, {
        [action.attr]:action.value,
      })
    case 'editParams':
      return Object.assign({}, state, {
        operateData:action.operateData,
        operateType:action.operateType,
        operateFormData:action.operateFormData,
        ioType:action.ioType,
        visible:true,
      })
    default:
      return state;
  }
}