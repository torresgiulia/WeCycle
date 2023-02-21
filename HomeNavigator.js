import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet} from 'react-native';


//Screens
import HomeScreen from './screens/HomeScreen';
import BarcodeScreen from './screens/BarcodeScreen'
import LocationScreen from './screens/LocationScreen';
import ProfileScreen from './screens/ProfileScreen'

//Custom navigation style
import TabBarButton from './customNavigation/TabBarButton';
import BottomTabBarButton from './customNavigation/BottomTabBarButton'

const Tab = createBottomTabNavigator();

//Drawer navigator: 42 min *navegação aberta do lado esquerdo

function HomeNavigator() {
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
              icon = focused ? 'ios-home-sharp' : 'ios-home-outline'; 
              break;
            case 'Barcode': 
              icon = focused ? 'ios-barcode' : 'ios-barcode-outline';
              break;
            case 'Location': 
              icon = focused ? 'ios-location-sharp' : 'ios-location-outline';
              break;
            case 'Profile': 
              icon = focused ? 'ios-person' : 'ios-person-outline';
              break;
          };
          return <Icon name={icon} size={26} color={color}/>;
        }
        })}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{tabBarButton: props => <TabBarButton {... props}/>}}
      />
      <Tab.Screen 
        name="Barcode" 
        component={BarcodeScreen} 
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

export default HomeNavigator;
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
