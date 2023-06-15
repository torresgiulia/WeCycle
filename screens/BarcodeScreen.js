//REACT
import React, { useState, useEffect, Fragment, useRef } from 'react';
import { Text, View, StyleSheet, Button, TextInput, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

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
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/logo_correto.png')} style={styles.logo}></Image>
                </View>
                
                <View style={styles.textBoxContainer}>         
                    <TextInput placeholderTextColor="rgb(38, 38, 38)"  placeholder='  Pesquisar produtos...' ref={input} onFocus={() => handleInputText()}></TextInput>                                  
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
        height: '40%',
        backgroundColor: 'rgb(230, 230, 230)',
        borderRadius: 15,
        borderColor: 'rgb(84, 156, 48)',
        borderWidth: 0.5,
        justifyContent: 'center', 
        marginHorizontal: '10%',
    },
    searchBar:{
        marginTop: '13%',
        height: '20%',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
    },
    logoContainer: {
        width: '40%',
        height: '50%', 
        alignSelf: 'center',
                    
    },
    logo:{
        padding: 1,
        width: '100%',
        height: '100%',
        
    },

});

