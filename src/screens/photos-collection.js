import React from 'react';
import { BackHandler, FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux';

import Navbar from '../components/navbar';
import Galery from '../components/galery';

import Api from '../utils/api-unsplash';

let page = 1;

class PhotosCollection extends React.Component {

  onBackPress = () => this.props.navigation.goBack();

  async componentWillMount() {
    const { id } = this.props.navigation.state.params;

    const collectionPhotosList = await Api.getCollectionPhotos(id, page);

    this.props.dispatch({
      type: 'SET_COLLECTION_PHOTOS_LIST',
      payload: { collectionPhotosList }
    });

    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  async getPhotos() {
    const { id } = this.props.navigation.state.params;
    const newCollectionPhotosList = await Api.getCollectionPhotos(id, page);
    let collectionPhotosList = this.props.collectionPhotosList.concat(newCollectionPhotosList);

    this.props.dispatch({
      type: 'SET_COLLECTION_PHOTOS_LIST',
      payload: { collectionPhotosList }
    });
  }

  onEndReached = () => {
    page += 1;
    this.getPhotos();
  }

  componentWillUnmount = () => BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);

  _renderGaleryList = ({ item }) => <Galery { ...item } />;

  _keyExtractor = item => item.id.toString();

  render() {
    
    const { title } = this.props.navigation.state.params;

    return (
      <React.Fragment>
        <Navbar title={title} buttonBack onPress={this.onBackPress}/>

        <FlatList
          data={this.props.collectionPhotosList}
          renderItem={this._renderGaleryList}
          keyExtractor = {this._keyExtractor}
          onEndReachedThreshold={0.5}    
          onEndReached={this.onEndReached}
        /> 
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    collectionPhotosList: state.photos.collectionPhotosList
  };
}

export default connect(mapStateToProps)(PhotosCollection);