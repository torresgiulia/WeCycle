//REACT
import React, { useState, useEffect, Fragment, useRef } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { SafeAreaView } from 'react-native-safe-area-context';

const BarcodeScreen = ({navigation}) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [id, setId] = useState([]);

    //Inicializar InputText sem .focus
    const input = useRef(null);
    const handleInputText = () => {
        input.current.blur();
        navigation.navigate('Search');
    }


    const askForCameraPermission = () => {
        (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })()
    }


    // Código escaneado
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setId(data)
        navigation.navigate('Product', {itemId: data});
    };

    useEffect(() => {
        askForCameraPermission();
    }, []);

    // Checar permissões
    if (hasPermission === null) {
        return (
        <View style={styles.container}>
            <Text>Requesting for camera permission</Text>
        </View>)
    }
    if (hasPermission === false) {
        return (
        <View style={styles.container}>
            <Text style={{ margin: 10 }}>Sem acesso a camera garantido, por favor aceder as configurações do dispositivo e garantir acesso da camera a aplicação</Text>
        </View>)
    }

    

    
    

    // Permissão concedida  
    return (
        <View style={styles.page}>
            <View style={styles.searchBar}>
                <View style={styles.textBoxContainer}>         
                    <TextInput placeholder=' Pesquisar produtos...' ref={input} onFocus={() => handleInputText()}></TextInput>                                  
                </View>
            </View>

            <View style={styles.container}>
                <View style={styles.barcodeContainer}>
                    <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 400, width: 400 }} />
                </View>

            {scanned && <Button title={'Escanear novamente'} onPress={() => setScanned(false)} color='tomato' />}
            </View>
        </View>
        
    );
}
export default BarcodeScreen;

const styles = StyleSheet.create({
    page:{
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '30%',
    },
    maintext: {
        fontSize: 16,
        margin: 20,
    },
    barcodeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'tomato'
    },
    textBoxContainer:{
        width: '80%',
        height: 60,
        backgroundColor: 'rgb(245, 253, 242)',
        borderRadius: 5,
        borderColor: 'rgb(52, 99, 28)',
        borderWidth: 1,
        justifyContent: 'center', 
        marginTop: '13%',  
        marginHorizontal: '10%',
    },
    searchBar:{
        backgroundColor: 'rgb(120, 202, 78)',
        height: '20%',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
    }

});

