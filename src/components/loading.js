import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const Loading = () => 
  <View style={styles.container}>
    <Text style={styles.logo}>¡Onsplash!</Text>
    <ActivityIndicator size={50} color={'#FFF'} />
  </View>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    fontSize: 35,
    color: '#FFF',
    marginBottom: 20,
    fontWeight: 'bold'
  }
});

export default Loading;
