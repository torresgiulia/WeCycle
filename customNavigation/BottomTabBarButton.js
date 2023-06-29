import React from "react";
import { StyleSheet, View } from "react-native";
import { BottomTabBar } from "@react-navigation/bottom-tabs";

const BottomTabBarButton = (props) => {
  return (
    <View>
      <View style={styles.tabBar} />
      <BottomTabBar {...props} />
    </View>
  );
};

export default BottomTabBarButton;
const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    right: 10,
    left: 10,
    bottom: 25,
    height: 25,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
  },
});
