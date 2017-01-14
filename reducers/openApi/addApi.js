let initState = {
  loading: false, //模态框 按钮状态
  visible: false,
}
export default function(state = initState, action){
  switch(action.type){
    case 'addApiInfo':
      return Object.assign({}, state, {
        data:action.data.data,
        loading: false,
      })
    case 'meetingListAttrChange':
      return Object.assign({}, state, {
        [action.attr]:action.value,
      })
    default:
      return state;
  }
}