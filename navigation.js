import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeScreen from './screens/HomeScreen'
import BarcodeScreen from './screens/BarcodeScreen'
import ProfileScreen from './screens/ProfileScreen'
import { ScreenStackHeaderLeftView } from "react-native-screens";

const Navigator = () => {
    const Stack = createNativeStackNavigator();
    return (
    // <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false}}/>
          <Stack.Screen name="Barcode" component={BarcodeScreen}/>
          <Stack.Screen name="Profile" component={ProfileScreen}/>
        </Stack.Navigator>
    //</NavigationContainer>
    )
      
};

export default Navigator;






