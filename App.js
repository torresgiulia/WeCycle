import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
//import HomeScreen from './screens/HomeScreen';
import Navigator from './navigation';


const Auth = createNativeStackNavigator();
//const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Auth.Navigator initialRouteName="Login">
        <Auth.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Auth.Screen name="SignupScreen" component={SignupScreen}/>
        <Auth.Screen name="Navigator" component={Navigator}/>
        {/* <Auth.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/> */}
      </Auth.Navigator>
    </NavigationContainer>
  );
}

export default App;
