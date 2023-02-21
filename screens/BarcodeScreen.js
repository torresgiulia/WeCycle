import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer, TabActions } from "@react-navigation/native";

const BarcodeScreen = () => {
    return(
        <View style={styles.container}>
            <Text>Barcode Screen</Text>
        </View>
    ) 
};

export default BarcodeScreen;
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',   
        backgroundColor: "rgb(225, 243, 216)",
    }
})