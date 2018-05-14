import {UPDATE_RESULTS, FETCHING_PICS} from '../actions/actions'

const picsReducer = (state = [], action) => {
  if (action.type === UPDATE_RESULTS) return [...state, action.data]
  return state
}

export default picsReducer
