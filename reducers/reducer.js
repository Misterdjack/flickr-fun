// import {UPDATE_RESULTS, FETCHING_PICS, RESULTS_ERROR} from '../actions/actions'
import {UPDATE_RESULTS} from '../actions/actions'

const reducer = (state = [], action) => {
  if (action.type === UPDATE_RESULTS) return [...state, action.payload]
  return state
}

// const reducer = (state = {}, action) => {
//   switch (action.type) {
//     case FETCHING_PICS:
//       return {...state, action.status}
//     case UPDATE_RESULTS:
//       return {...state, search: action.data}
//     case RESULTS_ERROR:
//       return {...state, error: action.data}
//     default:
//       return state
//   }
// }


export default reducer
