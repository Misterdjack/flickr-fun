import {UPDATE_RESULTS, FETCHING_PICS, RESULTS_ERROR} from '../actions/actions'

const initialState = {
  loading: false,
  picUrls: undefined,
  error: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_PICS:
      return {...state, loading: true, error: false}
    case UPDATE_RESULTS:
      return {...state, loading: false, picUrls: action.payload, error: false}
    case RESULTS_ERROR:
      return {...state, loading: false, error: true}
    default:
      return state
  }
}

export default reducer
