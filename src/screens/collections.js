import React from 'react';
import { FlatList } from 'react-native';
import Header from '../components/header';
import Api from '../utils/api-unsplash';
import Category from '../components/category';

class Collections extends React.Component {

  state = { photos: [] };

  async componentWillMount() {
    const photos = await Api.getCollections();
    this.setState({ photos });
  }

  keyExtractor = item => item.id.toString();

  renderItem = ({ item }) => (
    <Category
      { ...item } 
      onPress={ () => this.goToPhotos(item) }
    />
  );

  goToPhotos = ({ id, title }) => this.props.navigation.navigate({
    routeName: 'PhotosCollection',
    params: { id, title }
  });

  render() {
    return (
      <React.Fragment>
        <Header navigation={this.props.navigation} />
        <FlatList
          data={this.state.photos}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
        {/* <Galery photos={ this.state.photos } /> */}
      </React.Fragment>
    );
  }
}

export default Collections;