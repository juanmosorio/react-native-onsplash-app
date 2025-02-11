import React from 'react';
import { FlatList } from 'react-native';

import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import Header from '../components/header';
import Api from '../utils/api-unsplash';
import Category from '../components/category';

let page = 1;

class Collections extends React.Component {

  async componentWillMount() {
    const collectionsList = await Api.getCollections(page);
    
    this.props.dispatch({
      type: 'SET_COLLECTIONS_LIST',
      payload: { collectionsList }
    });
  }

  async getPhotos() {
    let newCollectionsList = await Api.getCollections(page);
    let collectionsList = this.props.collectionsList.concat(newCollectionsList);

    this.props.dispatch({
      type: 'SET_COLLECTIONS_LIST',
      payload: { collectionsList }
    });
  }

  onEndReached = () => {
    page += 1;
    this.getPhotos();
  }

  keyExtractor = item => item.id.toString();

  _renderItem = ({ item }) => (
    <Category
      { ...item } 
      onPress={ () => this.goToPhotos(item) }
    />
  );

  goToPhotos = ({ id, title }) => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'PhotosCollection',
        params: { id, title }
      })
    );
  }
  
  render() {
    return (
      <React.Fragment>
        <Header />
        <FlatList
          data={this.props.collectionsList}
          renderItem={this._renderItem}
          keyExtractor={this.keyExtractor}
          onEndReachedThreshold={0.5}
          onEndReached={this.onEndReached}
        />
        {/* <Galery photos={ this.state.photos } /> */}
      </React.Fragment>
    );
  }
}

const mapStateTopProps = state => {
  return {
    collectionsList: state.photos.collectionsList
  };
}

export default connect(mapStateTopProps)(Collections);