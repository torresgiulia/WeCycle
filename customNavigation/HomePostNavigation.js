import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewPostScreen from "../screens/NewPostScreen";
import HomeScreen from "../screens/HomeScreen";
import { useEffect } from "react";

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
      <Stack.Screen
        name="New"
        component={NewPostScreen}
        initialParams={route.params.userEmail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default HomePostNavigator;
