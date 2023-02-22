//import * as React from "react";
import React from "react";
import { Text, View, SafeAreaView} from "react-native";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const HomeScreen = () => {
    return(
        <SafeAreaView style={styles.container}>
            <Text>Home Screen</Text>
        </SafeAreaView>
    )
};

export default HomeScreen;
const styles = StyleSheet.create({

    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',   
        //backgroundColor: "rgb(225, 243, 216)",
    }
})