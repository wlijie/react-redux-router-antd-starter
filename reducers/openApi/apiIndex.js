let initState = {
  data:[],
  loading: false,
  page:1,
  size:10,
  total:null,
  staticSearch:1, //搜索类型
  role:1,
  system:1,
  sele:[],
}
export default function(state = initState, action){
  switch(action.type){
    case 'getApiList':
      return Object.assign({}, state, {
        data:action.data.data,
        loading: false,
        page:action.data.page,
        size:action.data.size,
        total:action.data.total,
        staticSearch:action.data.search_type.staticSearch, //搜索类型
        system:action.data.search_type.system,
        role:action.data.search_type.role,
      })
    case 'meetingListAttrChange':
      return Object.assign({}, state, {
        [action.attr]:action.value,
      })
    default:
      return state;
  }
}