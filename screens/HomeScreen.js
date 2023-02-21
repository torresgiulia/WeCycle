//import * as React from "react";
import { Text, View, SafeAreaView} from "react-native";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const HomeScreen = () => {
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.background}>homeeeeeeeeee</Text>
        </SafeAreaView>
    )
};

export default HomeScreen;
const styles = StyleSheet.create({
    background:{
        backgroundColor: "rgb(120, 202, 78)",
    },
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',   
        backgroundColor: "rgb(225, 243, 216)",
    }
})