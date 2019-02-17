import React from 'react';
import { BackHandler, FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux';

import Navbar from '../components/navbar';
import Galery from '../components/galery';

import Api from '../utils/api-unsplash';

class PhotosCollection extends React.Component {

  onBackPress = () => this.props.navigation.goBack();

  async componentWillMount() {
    const { id } = this.props.navigation.state.params;

    const collectionPhotosList = await Api.getCollectionPhotos(id);

    this.props.dispatch({
      type: 'SET_COLLECTION_PHOTOS_LIST',
      payload: { collectionPhotosList }
    });

    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
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