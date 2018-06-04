import { flickrKey, flickrSecret } from '../config';
import axios from 'axios';

export const FETCHING_PICS = 'FETCHING_PICS'
export const UPDATE_RESULTS = 'UPDATE_RESULTS'
export const RESULTS_ERROR = 'RESULTS_ERROR'

export const updateSearchResults = (searchValue) => async dispatch => {
  dispatch({type: FETCHING_PICS})
  try {
    const response = await axios.get(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${
        flickrKey
      }&tags=${searchValue}&format=json&nojsoncallback=1`
    )
    const picUrls = await response.data.photos.photo.map((item, index) => {
      return (
        `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_n.jpg`
      )
    });
    // console.log(picUrls);
    dispatch({type: UPDATE_RESULTS, payload: picUrls})
  } catch (error) {
    // console.log(error);
    dispatch({type: RESULTS_ERROR, payload: error.message})
  }
}
