import React from 'react';
import { FlatList } from 'react-native';

import Header from '../components/header';
import Galery from '../components/galery';

import Api from '../utils/api-unsplash';

class Explore extends React.Component {

  state = { photos: [] };

  async componentWillMount() {
    const photos = await Api.getPhotosCurated();
    this.setState({ photos });
  }

  _renderGaleryList = ({ item }) => (
    <Galery
      navigation={this.props.navigation}
      { ...item }
    /> 
  );

  _keyExtractor = item => item.id.toString();

  render = () => {
    return (
      <React.Fragment>
        <Header navigation={null} />

          <FlatList
            data={this.state.photos}
            renderItem={this._renderGaleryList}
            keyExtractor = {this._keyExtractor}
          />  
       
      </React.Fragment>
    );
  }
}

export default Explore;