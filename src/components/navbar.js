import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Navbar = ({ title, buttonBack, onPress }) => 
  <View style={styles.toolbar}>
    <View style={styles.contentToolbar}>
      <View style={styles.containerIcon}>
        {buttonBack && 
          <TouchableOpacity 
            style={styles.buttonBack}
            onPress={onPress}  
          >
            <Icon name="arrow-back" size={24} color="#000"/>
          </TouchableOpacity>
        }
      </View>
      <Text style={styles.textToolbar}>{title}</Text>
    </View>
  </View>;

const styles = StyleSheet.create({
  toolbar: {
    height: 50, 
    backgroundColor: '#FFF', 
    elevation: 5,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  textToolbar: {
    fontSize: 22,
    color: '#000',
    fontWeight: 'bold'
  },
  contentToolbar: {
    flexDirection: 'row'
  },
  buttonBack: {
    justifyContent: 'center',
    height: 24,
    width: 24,
    marginRight: 14
  },
  containerIcon: {
    justifyContent: 'center'
  }
});

export default Navbar;