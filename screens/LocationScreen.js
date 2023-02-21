import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer, TabActions } from "@react-navigation/native";

const LocationScreen = () => {
    return(
        <View style={styles.container}>
            <Text>Location Screen</Text>
        </View>
    )
};

export default LocationScreen;
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',   
        backgroundColor: "rgb(225, 243, 216)",
    }
})