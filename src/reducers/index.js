import { combineReducers } from 'redux';

import navigation from '../actions/navigation';
import photos from '../actions/photos';

const reducer = combineReducers({
  navigation,
  photos
});

export default reducer;
