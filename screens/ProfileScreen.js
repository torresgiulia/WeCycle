//import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer, TabActions } from "@react-navigation/native";

export default function ProfileScreen() {
    return(
        <View style={styles.container}>
            <Text>Profile Screen</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',   
        //backgroundColor: "rgb(225, 243, 216)",
    }
})