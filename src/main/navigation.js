import React from 'react';
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

// SCREENS ****
import HomeScreen from '../screens/home';
import CollectionsScreen from '../screens/collections';
import CuratedScreen from '../screens/curated';

import ProfileScreen from '../screens/profile';
import PhotosCollection from '../screens/photos-collection';
import Loading from '../components/loading';

// TEXTS ****
const screenTitleHome = 'Home';
const screenTitleCollections = 'Collections';
const screenTitleCurated = 'Curated';

const TabBarAppNavigator = createAppContainer(
  createBottomTabNavigator(
    {
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          title: screenTitleHome
        },
      },
      Collections: {
        screen: CollectionsScreen,
        navigationOptions: {
          title: screenTitleCollections
        }
      },
      Curated: {
        screen: CuratedScreen,
        navigationOptions: {
          title: screenTitleCurated
        }
      }
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Home') {
              iconName = `home${focused ? '' : ''}`;
          } else if (routeName === 'Collections') {
              iconName = `collections${focused ? '' : ''}`;
          } else if (routeName === 'Curated') {
              iconName = `star${focused ? '' : ''}`;
          }
          return <Icon name={iconName} size={24} color={tintColor} />;
        },
      }),
      tabBarOptions: {
        activeTintColor: '#000',
        inactiveTintColor: '#BDBDBD',
        style: {
          backgroundColor: '#FFF',
          elevation: 10,
          borderTopWidth: 0
        }
      },
      animationEnabled: false,
      swipeEnabled: false,
      backBehavior: 'none',
      backToInitial: false,
      lazy: true  
    }
  )
);

const RootStack =  createStackNavigator(
  {
    Main: TabBarAppNavigator,
    Profile: ProfileScreen,
    PhotosCollection: PhotosCollection
  },
  {
    initialRouteName: 'Main',
    headerMode: 'none'
  }
);


// const SwitchNavigator = createSwitchNavigator(
//   {
//     App: RootStack,
//     Loading: Loading,
//   },
//   {
//     initialRouteName: 'Loading',
//     headerMode: 'none'
//   }
// )

export default createAppContainer(RootStack);
