import React from 'react';

import { connect } from 'react-redux';

import HeaderComponent from '../components/header';
import GaleryList from './galery-list';

import Api from '../utils/api-unsplash';

class HomeScreen extends React.Component {

  async componentDidMount() {
    const photosList = await Api.getPhotos();

    this.props.dispatch({
      type: 'SET_PHOTOS_LIST',
      payload: { photosList }
    });
  }

  render() {
    return(
      <React.Fragment>
        <HeaderComponent navigation={this.props.navigation} />
        <GaleryList />
      </React.Fragment>
    );
  }

}

export default connect(null)(HomeScreen);