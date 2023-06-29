import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BarcodeScreen from "../screens/BarcodeScreen";
import ProductScreen from "../screens/ProductScreen";
import SearchScreen from "../screens/SearchScreen";

const Stack = createNativeStackNavigator();

function ProductNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Barcode"
        component={BarcodeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default ProductNavigation;
