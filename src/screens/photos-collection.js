import React from 'react';
import { BackHandler } from 'react-native';

import Navbar from '../components/navbar';
import GaleryList from '../components/galery-list';

import Api from '../utils/api-unsplash';

class PhotosCollection extends React.Component {

  state = { photos: [] };

  onBackPress = () => this.props.navigation.goBack();

  async componentWillMount() {
    const { id } = this.props.navigation.state.params;

    const photos = await Api.getCollectionPhotos(id);
    this.setState({ photos });

    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount = () => BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);

  render() {
    
    const { title } = this.props.navigation.state.params;

    return (
      <React.Fragment>
        <Navbar title={title} buttonBack onPress={this.onBackPress}/>
        <GaleryList
          photos={this.state.photos}
        />
      </React.Fragment>
    );
  }
}

export default PhotosCollection;