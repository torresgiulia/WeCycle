import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();
function HomePostNavigator({ route }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        initialParams={route.params}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default HomePostNavigator;
