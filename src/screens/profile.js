import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  BackHandler,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';

import Api from '../utils/api-unsplash';

import Navbar from '../components/navbar';
import Galery from '../components/galery';
import Category from '../components/category';

const { height } = Dimensions.get('window');

class Profile extends React.Component {

  state = { data: {}, photos: [], activeIndex: 0, userLikes: [], userCollections: [] };

  onBackPress = () => this.props.navigation.goBack();

  async componentDidMount() {
    const { username } = this.props.navigation.state.params;

    const data = await Api.getUserProfile(username);
    const photos = await Api.getUserPhotos(username);
    const userLikes = await Api.getUserLikes(username);
    const userCollections = await Api.getUserCollections(username);

    this.setState({ data, photos, userLikes, userCollections });

    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount = () => BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);

  _keyExtractor = item => item.title.toString();

  _renderItem = ({ item }) => <Text style={styles.interests}>{ item.title }</Text>;


  segmentSelected = activeIndex => this.setState({ activeIndex });

  headerComponent = () => {

    const { profile_image, name, location, 
      portfolio_url, bio, tags, total_photos, 
      total_likes, total_collections 
    } = this.state.data;

    return(
      <View>
        <View style={styles.contentImageProfile}>
          <Image 
            source={{ uri: profile_image&& profile_image.large }}
            style={styles.imageProfile} 
          />
          <Text style={styles.textUsername}>{ name }</Text>
        </View>

        <View style={{paddingHorizontal: 10}}>
          <View style={styles.infoUser}>
            { location&& <Text style={{marginRight: 20}}>{ location }</Text> }
            { portfolio_url&& <Text>{ portfolio_url }</Text>}
          </View>

          <Text style={styles.textUserBio}>
            { bio }
          </Text>

          <Text>Interests</Text>

            { tags&&
              <FlatList
                horizontal
                data={tags.custom}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                showsHorizontalScrollIndicator={false}
              />
            }
        </View>


        <View style={styles.menuOptions}>
          <View style={styles.contentMenuOptions}>
            <TouchableWithoutFeedback 
              onPress={() => this.segmentSelected(0)}
            >
              <View style={{flex: 1}}>
                <Text style={[
                  styles.textMenuOptions, 
                  this.state.activeIndex == 0
                  ? { color: "#000" }
                  : { }
                ]}>{ total_photos }</Text>
                <Text style={[
                  styles.textMenuOptions, 
                  this.state.activeIndex == 0
                  ? { color: "#000" }
                  : { }
                ]}>Photos</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => this.segmentSelected(1)}
            >
             <View style={{flex: 1}}>
              <Text style={[
                  styles.textMenuOptions, 
                  this.state.activeIndex == 1
                  ? { color: "#000" }
                  : { }
                ]}>{ total_likes }</Text>
              <Text style={[
                styles.textMenuOptions, 
                this.state.activeIndex == 1
                ? { color: "#000" }
                : { }
              ]}>Liked</Text>
            </View>
            </TouchableWithoutFeedback>
             <TouchableWithoutFeedback
              onPress={() => this.segmentSelected(2)}
            >
               <View style={{flex: 1}}>
                 <Text style={[
                    styles.textMenuOptions, 
                    this.state.activeIndex == 2
                    ? { color: "#000" }
                    : { }
                  ]}>{ total_collections }</Text>
                <Text style={[
                  styles.textMenuOptions, 
                  this.state.activeIndex == 2
                  ? { color: "#000" }
                  : { }
                ]}>Collections</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

        </View>

      </View>
    );
  }

  renderSection = () => {
    if (this.state.activeIndex == 0) {
      return this._renderGaleryList();
    } else if (this.state.activeIndex == 1) {
      return this._renderLikeList();
    } else if (this.state.activeIndex == 2) {
      return this._renderCollectionList();
    }
  }

  render() {

    const { name } = this.state.data;

    return(
      <View style={styles.container}>

        <Navbar title={name} buttonBack onPress={this.onBackPress}/>

          <FlatList 
            ListHeaderComponent={this.headerComponent}
            data={[1]}
            renderItem={this.renderSection}
            keyExtractor = {(index) => index.toString()}
          />
        
      </View>
    );
  }

  goToPhotos = ({ id, title }) => this.props.navigation.navigate({
    routeName: 'Photos',
    params: { id, title }
  });

  _renderGalery = ({ item }) => <Galery { ...item } />;

  _renderCollection = ({ item }) => (
    <Category
      { ...item } 
      onPress={ () => this.goToPhotos(item) }
    />
  );

  _renderGaleryList = () => (
    <FlatList 
      data={this.state.photos}
      renderItem={this._renderGalery}
      keyExtractor = {(index) => index.toString()}
    />    
  );

  _renderLikeList = () => (
    <FlatList 
      data={this.state.userLikes}
      renderItem={this._renderGalery}
      keyExtractor = {(index) => index.toString()}
    />    
  );

  _renderCollectionList = () => (
    <FlatList 
      data={this.state.userCollections}
      renderItem={this._renderCollection}
      keyExtractor = {(index) => index.toString()}
    />    
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  imageProfile: {
    height: 150, 
    width: 150, 
    borderRadius: 75, 
    marginBottom: 20
  },
  contentImageProfile: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center'
  },
  textUsername: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000'
  },
  infoUser: {
    flexDirection: 'row', 
    marginBottom: 10
  },
  textUserBio: {
    textAlign: 'justify',
    fontSize: 15,
    color: '#000',
    marginBottom: 10
  },
  interests: {
    marginRight: 10,
    marginVertical: 10,
    padding: 3,
    backgroundColor: '#F1F1F1',
    borderRadius: 5
  },
  textMenuOptions: {
    fontWeight: 'bold', 
    fontSize: 16
  },
  menuOptions: {
    borderTopWidth: 1,
    borderTopColor: '#eae5e5',
    marginTop: 15,
    height: 48,
    justifyContent: 'center'
  },
  contentMenuOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  }
});

export default Profile;