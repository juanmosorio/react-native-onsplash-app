import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ImageBackground, 
  TouchableHighlight
} from 'react-native';

const Category = ({ cover_photo, title, total_photos, onPress }) => (
  <TouchableHighlight 
    underlayColor = "rgba(0, 0, 0, 0.1)"
    onPress={onPress} 
  >
    <ImageBackground 
      style={styles.container}
      source = {{uri: cover_photo.urls.small}} 
    >
    <View style={styles.category}>
      <Text style={styles.textCategory}>{ title }</Text>
      <Text style={{ textAlign: 'center', color: '#F8F8F8', fontWeight: 'bold' }}>{ total_photos } Photos</Text>
    </View>
    </ImageBackground>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 200,
    marginBottom: 2
  },
  category: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  textCategory: {
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#F8F8F8',
    fontSize: 25
  }
});

export default Category;