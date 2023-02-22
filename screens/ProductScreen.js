import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

export default function ProductScreen({route, navigation}){
    const itemId = route.params;
    return(
        <View style={styles.container}>
            <View>
                <Text>ID: {JSON.stringify(itemId)}</Text>
            </View>
            <TouchableOpacity>
                <Text onPress={() => navigation.navigate('Barcode')}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        right: '10%',
        left: '10%',
        bottom: '25%',
        height: '60%',
        width: '80%',
        backgroundColor: 'rgb(245, 253, 242)',
        borderColor: 'rgb(120, 202, 78)',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 3,
    
    }
})