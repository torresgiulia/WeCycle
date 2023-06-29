import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();
function ProfileNavigator({ route }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        initialParams={route.params}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default ProfileNavigator;
