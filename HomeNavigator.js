import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { StyleSheet } from "react-native";

//Navigators
import ProductNavigation from "./customNavigation/ProductNavigation";
import HomePostNavigator from "./customNavigation/HomePostNavigation";
import ProfileNavigator from "./customNavigation/ProfileNavigation";
import LocationNavigator from "./customNavigation/LocationNavigation";

//Custom navigation style
import TabBarButton from "./customNavigation/TabBarButton";
import BottomTabBarButton from "./customNavigation/BottomTabBarButton";

const Tab = createBottomTabNavigator();

export default function HomeNavigator({ route }) {
  const email = route.params.userEmail;

  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBarButton {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "rgb(120, 202, 78)",
        tabBarInactiveTintColor: "rgb(51, 51, 51)",
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ color, size, focused }) => {
          let icon;
          switch (route.name) {
            case "HomePostNavigator":
              icon = focused ? "home-sharp" : "home-outline";
              break;
            case "ProductNavigation":
              icon = focused ? "barcode" : "barcode-outline";
              break;
            case "LocationNavigator":
              icon = focused ? "location-sharp" : "location-outline";
              break;
            case "ProfileNavigator":
              icon = focused ? "person" : "person-outline";
              break;
          }
          return (
            <Icon
              ios={icon}
              android={"md-add"}
              name={icon}
              size={26}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="HomePostNavigator"
        component={HomePostNavigator}
        initialParams={{ userEmail: email }}
        options={{ tabBarButton: (props) => <TabBarButton {...props} /> }}
      />
      <Tab.Screen
        name="ProductNavigation"
        component={ProductNavigation}
        options={{ tabBarButton: (props) => <TabBarButton {...props} /> }}
      />
      <Tab.Screen
        name="LocationNavigator"
        component={LocationNavigator}
        options={{ tabBarButton: (props) => <TabBarButton {...props} /> }}
      />
      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        initialParams={{ userEmail: email }}
        options={{ tabBarButton: (props) => <TabBarButton {...props} /> }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    backgroundColor: "transparent",
    borderTopWidth: 0,
    bottom: 15,
    right: 10,
    left: 10,
    height: 92,
  },
});
