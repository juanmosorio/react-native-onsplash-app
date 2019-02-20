import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';

import HeaderComponent from '../components/header';
import Galery from '../components/galery';

import Api from '../utils/api-unsplash';

let page = 1;

class HomeScreen extends React.Component {

  async componentDidMount() {
    const photosList = await Api.getPhotos(page);

    this.props.dispatch({
      type: 'SET_PHOTOS_LIST',
      payload: { photosList }
    });
  }

  async getPhotos() {
    let newPhotosList = await Api.getPhotos(page);
    let photosList = this.props.photosList.concat(newPhotosList);

    this.props.dispatch({
      type: 'SET_PHOTOS_LIST',
      payload: { photosList }
    });
  }

  onEndReached = () => {
    page += 1;
    this.getPhotos();
  }
  
  _keyExtractor = item => item.id.toString();

  _renderGalery = ({ item }) => <Galery { ...item } />;

  render() {
    return(
      <React.Fragment>
        <HeaderComponent navigation={this.props.navigation} />
        <FlatList
          data={this.props.photosList}
          renderItem={this._renderGalery}
          keyExtractor = {this._keyExtractor}
          onEndReachedThreshold={0.5}
          onEndReached={this.onEndReached}
        />
      </React.Fragment>
    );
  }

}

const mapSateToProps = (state) => {
  return {
    photosList: state.photos.photosList
  };
}

export default connect(mapSateToProps)(HomeScreen);