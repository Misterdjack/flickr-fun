import { flickrKey, flickrSecret } from '../config';
import axios from 'axios';

// export const FETCHING_PICS = 'FETCHING_PICS'
export const UPDATE_RESULTS = 'UPDATE_RESULTS'
// export const RESULTS_ERROR = 'RESULTS_ERROR'


export const updateSearchResults = (picUrls) => dispatch => ({
  type: UPDATE_RESULTS,
  payload: picUrls,
})

// export const updateSearchResults = (picIds) => async dispatch => {
//   dispatch({type: FETCHING_PICS})
//   try {
//     const search = await getSearchResults(picIds)
//     console.log(search);
//     dispatch({type: UPDATE_RESULTS, data: search})
//   } catch (error) {
//     console.log(error);
//     dispatch({type: RESULTS_ERROR, data: error.message})
//   }
// }

// async _getSearchValue() {
//   let response = await axios.get(
//     `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${
//       flickrKey
//     }&tags=${this.state.searchValue}&format=json`
//   );
//   return response;
// }
