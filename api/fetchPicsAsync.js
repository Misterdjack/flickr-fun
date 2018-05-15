import { flickrKey } from '../config'
import axios from 'axios'
import {exampleResponse} from './exampleResponse'



// export const getSearchResults = async () => {
//     const search = await axios.get(
//       `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_n.jpg`
//     );
//   return
// }

export const getSearchResults = (picIds) => {
    const promises = picIds.map(async () => {
        const allPictures = await axios.get(
          `https://farm${picIds.farm}.staticflickr.com/${picIds.server}/${picIds.id}_${picIds.secret}_n.jpg`
        );
        return allPictures
    });
    return Promise.all(promises);
}



// const mapPhotoKeys = arr.map(async (obj) => { return obj.key; });

// let data = await Promise.all(data.map(async (item) => {
//       item.fetchItem = await fetchFunc(item.fetchParams);
//
//       return item;
//   });
