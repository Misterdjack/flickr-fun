import {UPDATE_RESULTS, FETCHING_PICS, RESULTS_ERROR} from '../actions/actions'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_RESULTS:
      return {...state, picUrls: action.payload}
    case RESULTS_ERROR:
      return {...state, error: action.payload}
    default:
      return state
  }
}

export default reducer
