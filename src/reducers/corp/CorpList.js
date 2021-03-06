let initState = {
  data:[],
  loading: false,
  page:1,
  size:10,
  total:null,
}
export default function(state = initState, action){
  switch(action.type){
    case 'get_corp_list':
      return Object.assign({}, state, {
        data:action.data.data,
        loading: false,
        page:action.data.page,
        size:action.data.size,
        total:action.data.total,
      })
    case 'change_corp_attr':
      return Object.assign({}, state, {
        [action.attr]:action.value,
      })
    default:
    return state;
  }
}
