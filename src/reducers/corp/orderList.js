let initState = {
  data:[],
  loading: false,
  page:1,
  size:10,
  total:null,
  expand:false,
  venue_item_list:{},
  order_pay_statelist:{},
  charge_type_list:{},
  tabsActiveKey:'contest',
}
export default function(state = initState, action){
  switch(action.type){
    case 'getSelect':
      return Object.assign({}, state, {
        data:action.data.data,
        loading: false,
        page:action.data.page,
        size:action.data.size,
        total:action.data.total,
      })
    case 'getVenuteScreeningConditions':
      return Object.assign({}, state, {
        venue_item_list: action.data.venue_item_list,
        order_pay_statelist: action.data.order_pay_statelist,
        charge_type_list: action.data.charge_type_list,
        sales_order_channel: action.data.sales_order_channel,
      })
    case 'meetingListAttrChange':
      return Object.assign({}, state, {
        [action.attr]:action.value,
      })
    default:
      return state;
  }
}