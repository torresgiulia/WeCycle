import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { async } from '@firebase/util';
import * as Font from 'expo-font';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeNavigator from './HomeNavigator';
import { useEffect, useState } from 'react';

const Auth = createNativeStackNavigator();

export default function App() {
  const [isFontLoaded, setIsThisFontLoaded] = useState(false)

  const componentDidAmount = async () =>{
    await Font.loadAsync({
      'Bold':require('./assets/fonts/Montserrat-ExtraBold.otf'),
      'Medium':require('./assets/fonts/Montserrat-Medium.otf'),
      'Regular':require('./assets/fonts/Montserrat-Regular.otf'),
    });
    setIsThisFontLoaded(true);
  }

  useEffect(()=> {
    componentDidAmount();
  })

  return (
    <NavigationContainer>
      <Auth.Navigator 
      initialRouteName="Login"
      screenOptions={{
        headerTintColor: "white",
        headerStyle:{
          backgroundColor: "rgb(120, 202, 78)"},
        headerBackTitleVisible: false
      }}>
        <Auth.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Auth.Screen name="Criar conta" component={SignupScreen}/>
        <Auth.Screen name="HomeNavigator" component={HomeNavigator} options={{headerShown: false}}/>
      </Auth.Navigator>
    </NavigationContainer>
  );
}

