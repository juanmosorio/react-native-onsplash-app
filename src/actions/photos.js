const photos = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PHOTOS_LIST': {
      return {...state, ...action.payload}
    }
    case 'SET_COLLECTIONS_LIST': {
      return {...state, ...action.payload}
    }
    case 'SET_CURATED_LIST': {
      return {...state, ...action.payload}
    }
    case 'SET_COLLECTION_PHOTOS_LIST': {
      return {...state, ...action.payload}
    }
    default:
      return state
  }
}

export default photos;
