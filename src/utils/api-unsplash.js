const URL = 'https://api.unsplash.com';
const API_KEY = '0dd55d4bd79ce713b1fb5932550f64cf3e1575222059444dc5b9a8a0b82f9b94';

class Api {

  async getPhotos() {
    const query = await fetch(`${URL}/photos/?client_id=${API_KEY}&per_page=500`);
    const data = await query.json();
    return data;
  }

  async getUserProfile(userName){
    const query = await fetch(`${URL}/users/${userName}/?client_id=${API_KEY}`);
    const data = await query.json();
    return data;
  }

  async getUserPhotos(userName){
    const query = await fetch(`${URL}/users/${userName}/photos/?client_id=${API_KEY}`);
    const data = await query.json();
    return data;
  }  

  async getUserLikes(userName){
    const query = await fetch(`${URL}/users/${userName}/likes/?client_id=${API_KEY}`);
    const data = await query.json();
    return data;
  }

  async getUserCollections(userName){
    const query = await fetch(`${URL}/users/${userName}/collections/?client_id=${API_KEY}`);
    const data = await query.json();
    return data;
  } 

  async getCollections() {
    const query = await fetch(`${URL}/collections/?client_id=${API_KEY}&per_page=500`);
    const data = await query.json();
    return data;
  }

  async getCollectionPhotos(id) {
    const query = await fetch(`${URL}/collections/${id}/photos/?client_id=${API_KEY}&per_page=500`);
    const data = await query.json();
    return data;
  }

  async getPhotosCurated() { 
    const query = await fetch(`${URL}/photos/curated/?client_id=${API_KEY}&per_page=500`);
    const data = await query.json();
    return data;
  }
  
}

export default new Api();