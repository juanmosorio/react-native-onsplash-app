import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';

import Header from '../components/header';
import Galery from '../components/galery';

import Api from '../utils/api-unsplash';

let page = 1;

class Explore extends React.Component {

  async componentWillMount() {
    const curatedList = await Api.getPhotosCurated(page);

    this.props.dispatch({
      type: 'SET_CURATED_LIST',
      payload: { curatedList }
    });
  }

  _renderGaleryList = ({ item }) => <Galery { ...item } />;

  _keyExtractor = item => item.id.toString();

  async getPhotos() {
    let newCuratedList = await Api.getPhotosCurated(page);
    let curatedList = this.props.curatedList.concat(newCuratedList);

    this.props.dispatch({
      type: 'SET_CURATED_LIST',
      payload: { curatedList }
    });  
  }

  onEndReached = () => {
    page += 1;
    this.getPhotos();
  }

  render = () => {
    return (
      <React.Fragment>
        <Header navigation={null} />

          <FlatList
            data={this.props.curatedList}
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
    curatedList: state.photos.curatedList
  };
}

export default connect(mapStateToProps)(Explore);