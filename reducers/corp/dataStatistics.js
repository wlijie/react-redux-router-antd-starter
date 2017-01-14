let initState = {
  data:[],
  summaryData:{},
  chartData:[],
  loading: false,
  page:1,
  size:10,
  total:null,
  dataStatisticsTabs:'contest',
  searchDateType:'week',
  searchDate:[],
}
export default function(state = initState, action){
  switch(action.type){
    case 'dataStatisticsSummary':
      return Object.assign({}, state, {
        summaryData:action.data.data[0],
        loading: false,
      })
    case 'dataStatisticsChart':
      return Object.assign({}, state, {
        chartData:action.data.data,
        searchDate:action.searchDate,
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
