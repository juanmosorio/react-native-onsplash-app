import React from 'react';
import  {
  StyleSheet,
  Dimensions,
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNFetchBlob from 'rn-fetch-blob';

import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

const { width } = Dimensions.get('window');

class Galery extends React.Component {

  _goToProfile = username => { 
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Profile',
        params: { username }
      })
    );
  }

  downloadImage(url){
    let date = new Date();
    let ext = this.extention(url);
    ext = "."+ext[0];
    const { config, fs } = RNFetchBlob
    let PictureDir = fs.dirs.PictureDir
    let options = {
      fileCache: true,
      addAndroidDownloads : {
        useDownloadManager : true,
        notification : true,
        path:  PictureDir + "/onsplash/image_"+Math.floor(date.getTime() + date.getSeconds() / 2)+ext,
        description : 'Image'
      }
    }
    config(options).fetch('GET', url).then((res) => {
      Alert.alert("¡Descarga exitosa!");
    });
  }

  extention(filename){
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
  }

  _renderProfile = ({ username, profile_image, name }) => (
    <TouchableOpacity
      onPress={() => setTimeout(() => this._goToProfile(username), 0)}
    >
      <View style={styles.containerInfoProfile}>
        <View style={styles.flexDirectionRow}>
          <View style={styles.justifyContentCenter}>
            <Image 
              source={{ uri: profile_image.medium }} 
              style={styles.imageProfile}
            />
          </View>
          <View style={styles.bodyInfoProfile}>
            <View style={styles.textProfile}>
              <Text style={styles.text}>{ name }</Text>
            </View>
            <View style={styles.buttonToProfile}>
              <Icon 
                name="keyboard-arrow-right"
                color="#000" 
                size={24} 
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  render() {

    const { urls, user, likes } = this.props;

    return (
      <View style={{flex: 1}}>
        { this._renderProfile(user) }
        <AutoHeightImage
          source={{ uri: urls.small }}
          width={width}
        />
        <View style={{ flexDirection: 'row', height: 48, justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 15 }}>
          <View style={{ justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon 
                name="favorite-border"
                color="#000" 
                size={30} 
              />
              <Text 
                style={{ paddingLeft: 5, marginTop: 3, fontSize: 18 }}
              >{ likes }</Text>

              {/* <View style={{ justifyContent: 'center', marginLeft: 14 }}>
                <Icon 
                  name="add"
                  color="#000" 
                  size={30}
                />
              </View> */}

            </View>
          </View>
          <TouchableOpacity
            style={{ justifyContent: 'center' }}
            onPress={() => this.downloadImage(urls.full)}
          >
            <Icon 
              name="arrow-downward"
              color="#000" 
              size={30} 
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  containerInfoProfile: {
    height: 50, 
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  bodyInfoProfile: {
    flex: 1,
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  justifyContentCenter: {
    justifyContent: 'center'
  },
  imageProfile: {
      borderRadius: 18,
      width: 36,
      height: 36
  },
  buttonToProfile: {
    height: 48, 
    justifyContent: 'center'
  },
  textProfile: {
      justifyContent: 'center', 
      marginHorizontal: 10
  },
  flexDirectionRow: {
    flexDirection: 'row'
  },
  text: {
      color: '#212121', 
      fontWeight: 'bold', 
      fontSize: 14
  }
});

export default connect(null)(Galery);