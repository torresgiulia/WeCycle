import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LocationScreen from '../screens/LocationScreen'

const Stack = createNativeStackNavigator();
function LocationNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Location"
        component={LocationScreen}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}

export default LocationNavigator;