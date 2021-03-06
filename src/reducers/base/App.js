let initState = {
  user_name:'',
  user_avatar:'', //搜索类型
  list_menu:{},
  openKeys:[],
}
export default function(state = initState, action){
  switch(action.type){
    case 'getMenu':
      return Object.assign({}, state, {
        list_menu:action.data.result,
        user_name:action.data.userInfo.user_name,
        user_avatar: action.data.userInfo.user_avatar,
      })
    case 'change_app_attr':
      return Object.assign({}, state, {
        [action.attr]:action.value,
      })
    default:
      return state;
  }
}