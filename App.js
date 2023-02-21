import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeNavigator from './HomeNavigator';

const Auth = createNativeStackNavigator();

//minuto: 19
//Para passar informação de uma página para a outra: navigation.navigate("Página", {valor1 = xxx, valor2= xxx})
//na Stack.Screen: options={({rota}) => { title: rota.params.valor1, title: rota.params.valor2}}
//useRoute?? 
function App() {

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

export default App;
