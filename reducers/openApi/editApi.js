import moment from 'moment'
let initGuestDialog = {
  isShow:false,
  id:'',
  guest_name:'',
  company_name:'',
  company_position:'',
  photo_url:'',
  introduction:'',
  index:-1,
  isSaving:false,
}
let initReviewDialog = {
  isShow:false,
  id:'',
  content:'',
  index:-1,
}
let initState = {
  id:'',
  title:'',
  result:{}
}
export default function(state = initState, action){
  switch(action.type){
    case 'getApiInfo':
      let data = action.data;
      return Object.assign({}, state, data);
    case 'editApiInfo':
      return Object.assign({}, state, initState);
    case 'meetingEditAttrChange':
      return Object.assign({}, state, {
        [action.attr]:action.value
      })
    case 'meetingContentChange':
      return Object.assign({}, state, {
        content:state.content.map((info, index)=>{
          if(index === action.index){
            info = action.value;
          }
          return info;
        })
      })
    case 'deletemeetingContent':
      return Object.assign({}, state, {
        content:state.content.filter((info, index) => {
          return index !== action.index
        })
      })
    case 'addMeetingContent':
      return Object.assign({}, state, {
        content:[...state.content, ''],
      })
    case 'deleteMeetingGuest':
      return Object.assign({}, state, {
        guest:state.guest.filter((info, index) => {
          return index !== action.index
        })
      })
    case 'addMeetingGuest':
      return Object.assign({}, state, {
        guestDialog:Object.assign({}, state.guestDialog, {
          isShow:true,
          index:state.guest.length,
        })
      })
    case 'editGuest':
      return Object.assign({}, state, {
        guestDialog:Object.assign({}, state.guestDialog, {
          isShow:true,
          ...state.guest[action.index],
        })
      })
    case 'deleteMeetingReview':
      return Object.assign({}, state, {
        review:state.review.filter((info, index) => {
          return index !== action.index
        })
      })
    case 'addReview':
      return Object.assign({}, state, {
        reviewDialog:Object.assign({}, state.reviewDialog, {
          isShow:true,
          index:state.review.length,
        })
      })
    case 'editReview':
      return Object.assign({}, state, {
        reviewDialog:Object.assign({}, state.reviewDialog, {
          isShow:true,
          ...state.review[action.index],
        })
      })
    case 'guestAttrChange':
      return Object.assign({}, state, {
        guestDialog:Object.assign({}, state.guestDialog, {
          [action.attr]:action.value,
        })
      })
    case 'addGuestToList':
      var index = state.guestDialog.index;
      var guest = [];
      if(index >= state.guest.length){
        guest = [...state.guest, action.data]
      }else{
        guest = state.guest.map((info, itemIndex)=>{
          if(index === itemIndex){
            return action.data;
          }else{
            return info;
          }
        })
      }
      return Object.assign({}, state, {
        guest:guest,
        guestDialog:Object.assign({}, state.guestDialog, initGuestDialog)
      })
    case 'closeGuestDialog':
      return Object.assign({}, state, {
        guestDialog:Object.assign({}, state.guestDialog, initGuestDialog)
      })
    case 'reviewAttrChange':
      return Object.assign({}, state, {
        reviewDialog:Object.assign({}, state.reviewDialog, {
          [action.attr]:action.value,
        })
      })
    case 'savingGuest':
      return Object.assign({}, state, {
        guestDialog:Object.assign({}, state.guestDialog, {
          isSaving:true,
        })
      })
    case 'saveGuestError':
      return Object.assign({}, state, {
        guestDialog:Object.assign({}, state.guestDialog, {
          isSaving:false,
        })
      })
    case 'saveReview':
      var index = state.reviewDialog.index;
      var saveItem = {
        id:state.reviewDialog.id,
        content:state.reviewDialog.content,
      }
      var review = [];
      if(index >= state.review.length){
        review = [...state.review, saveItem]
      }else{
        review = state.review.map((info, itemIndex)=>{
          if(index === itemIndex){
            return saveItem;
          }else{
            return info;
          }
        })
      }
      return Object.assign({}, state, {
        review:review,
        reviewDialog:Object.assign({}, state.reviewDialog, initReviewDialog)
      })
    case 'closeReviewDialog':
      return Object.assign({}, state, {
        reviewDialog:Object.assign({}, state.reviewDialog, initReviewDialog)
      })
    default:
      return state;
  }
}