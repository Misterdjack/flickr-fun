import { flickrKey, flickrSecret } from '../config';
import axios from 'axios';

export const FETCHING_PICS = 'FETCHING_PICS'
export const UPDATE_RESULTS = 'UPDATE_RESULTS'

// async action creator
export const updateSearchResults = (flickrKey) => async dispatch => {
  dispatch({type: FETCHING_PICS})
  let response = false;
  try {
    response = await axios.get(
      'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ee0ca20890069ba3b61332d029e55f4d&tags=cats&format=json'
    )
    console.log(response.data);
    dispatch({type: UPDATE_RESULTS, data: response.data})
  } catch (error) {
  }
}

// async _getSearchValue() {
//   let response = await axios.get(
//     `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${
//       flickrKey
//     }&tags=${this.state.searchValue}&format=json`
//   );
//   return response;
// }
