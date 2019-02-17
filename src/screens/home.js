import React from 'react';

import HeaderComponent from '../components/header';
import GaleryList from '../components/galery-list';

import Api from '../utils/api-unsplash';

class HomeScreen extends React.Component {

  state = { photos: [] };

  async componentDidMount() {
    const photos = await Api.getPhotos();
    this.setState({ photos });
  }

  render() {
    return(
      <React.Fragment>
        <HeaderComponent navigation={this.props.navigation} />
        <GaleryList photos={this.state.photos} />
      </React.Fragment>
    );
  }

}

export default HomeScreen;