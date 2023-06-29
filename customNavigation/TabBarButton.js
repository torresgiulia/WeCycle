import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Svg, Path } from "react-native-svg";

const TabBarButton = (props) => {
  const { route, children, accessibilityState, onPress } = props;
  if (accessibilityState.selected) {
    return (
      <View style={styles.btnContainer}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={[
              styles.svgGapFiller,
              { borderTopLeftRadius: route === "Home" ? 10 : 0 },
            ]}
          />
          <Svg width={71} height={58} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={"white"}
            />
          </Svg>
          <View
            style={[
              styles.svgGapFiller,
              { borderTopRightRadius: route === "settings" ? 10 : 0 },
            ]}
          />
        </View>
        <TouchableOpacity
          onPress={onPress}
          style={styles.btnActive}
          activeOpacity={1}
        >
          <Text>{children}</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={[
          styles.btnInactive,
          {
            borderTopLeftRadius: route === "home" ? 10 : 0,
            borderTopRightRadius: route === "settings" ? 10 : 0,
          },
        ]}
      >
        <Text>{children}</Text>
      </TouchableOpacity>
    );
  }
};

export default TabBarButton;
const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    alignItems: "center",
  },
  btnActive: {
    flex: 1,
    position: "absolute",
    width: 50,
    height: 50,
    top: -22,
    borderRadius: 50 / 2,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
  },
  btnInactive: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    height: 70,
  },
  svgGapFiller: {
    flex: 1,
    backgroundColor: "white",
  },
});
