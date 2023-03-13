import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet} from 'react-native';


//Screens
import HomeScreen from './screens/HomeScreen';
import BarcodeScreen from './screens/BarcodeScreen'
import LocationScreen from './screens/LocationScreen';
import ProfileScreen from './screens/ProfileScreen';

import ProductNavigation from './customNavigation/ProductNavigation';

//Custom navigation style
import TabBarButton from './customNavigation/TabBarButton';
import BottomTabBarButton from './customNavigation/BottomTabBarButton'

const Tab = createBottomTabNavigator();

export default function HomeNavigator({route}) {
  const email = route.params.userEmail;

  return (
    <Tab.Navigator 
      tabBar={props => <BottomTabBarButton {... props} />}
      screenOptions={({route}) => ({ 
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "rgb(120, 202, 78)",
        tabBarInactiveTintColor: "rgb(51, 51, 51)",
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({color, size, focused}) => {
          let icon;
          switch(route.name){
            case 'Home':
              icon = focused ? 'home-sharp' : 'home-outline'; 
              break;
            case 'ProductNavigation': 
              icon = focused ? 'barcode' : 'barcode-outline';
              break;
            case 'Location': 
              icon = focused ? 'location-sharp' : 'location-outline';
              break;
            case 'Profile': 
              icon = focused ? 'person' : 'person-outline';
              break;
          };
          return <Icon ios={icon} android={'md-add'} name={icon} size={26} color={color}/>;
        }
        })}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        initialParams={{userEmail: email}}
        options={{tabBarButton: props => <TabBarButton {... props}/>}}
      />
      <Tab.Screen 
        name="ProductNavigation" 
        component={ProductNavigation} 
        options={{tabBarButton: props => <TabBarButton {... props}/>}}
        />
      <Tab.Screen 
        name="Location" 
        component={LocationScreen} 
        options={{tabBarButton: props => <TabBarButton {... props}/>}}
        />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{tabBarButton: props => <TabBarButton {... props}/>}}
        />
    </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
  tabBar:{
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    bottom: 15,
    right: 10,
    left: 10,
    height: 92,
  }
})
