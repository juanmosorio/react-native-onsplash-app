import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const titleApp = 'Onsplash';

class HeaderComponent extends React.Component {

  // onPressMenu = () => this.props.navigation.toggleDrawer();

  // onPressSearch = () => null;

  render = () => 
    <View style={styles.container}>

      <View style={styles.contenTitle}>
        {/* <TouchableOpacity 
          onPress={this.onPressMenu} 
          style={styles.containerIcon}
        >
          <View style={styles.icon}>
            <Icon name="menu" size={24} color="#000" />
          </View>
        </TouchableOpacity> */}
        <View style={styles.headerText}>
          <Text style={styles.text}>{titleApp}</Text>
        </View>   
      </View>

      {/* <TouchableOpacity 
        onPress={this.onPressSearch} 
        style={styles.containerIcon}
      >
        <View style={styles.icon}>
          <Icon name="search" size={24} color="#000" />
        </View>
      </TouchableOpacity> */}
    </View>;

}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#FFF', 
    elevation: 5,
    paddingHorizontal: 10,
    justifyContent: 'center'
  },
  headerText: {
    justifyContent: 'center',
    paddingLeft: 10
  },
  text: {
    fontSize: 22, 
    color: '#000', 
    fontWeight: 'bold'
  },
  contenTitle: {
    flex: 1, 
    flexDirection: 'row'
  },
  containerIcon: {
    borderRadius: 24, 
    justifyContent: 'center'
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

export default HeaderComponent;