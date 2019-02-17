import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';

import Header from '../components/header';
import Galery from '../components/galery';

import Api from '../utils/api-unsplash';

class Explore extends React.Component {

  async componentWillMount() {
    const curatedList = await Api.getPhotosCurated();

    this.props.dispatch({
      type: 'SET_CURATED_LIST',
      payload: { curatedList }
    });
  }

  _renderGaleryList = ({ item }) => <Galery { ...item } />;

  _keyExtractor = item => item.id.toString();

  render = () => {
    return (
      <React.Fragment>
        <Header navigation={null} />

          <FlatList
            data={this.props.curatedList}
            renderItem={this._renderGaleryList}
            keyExtractor = {this._keyExtractor}
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