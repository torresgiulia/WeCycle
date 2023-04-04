//Pedir permissão e ler código de barra

import React, { useState, useEffect, Fragment } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import SearchBar from './SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';

const BarcodeScreen = ({navigation}) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [id, setId] = useState([]);

    const askForCameraPermission = () => {
        (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })()
    }

    // Permissão da camera
    useEffect(() => {
        askForCameraPermission();
    }, []);



    // Código escaneado
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setId(data)
        navigation.navigate('Product', {itemId: data});
    };

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
        <SafeAreaView style={styles.page}>
            <View styles={styles.inputBoxContainer}>
                <SearchBar></SearchBar>
                {/* onTextChange abrir tela de itens correspondentes a pesquisa */}
            </View>

            <View style={styles.container}>
                <View style={styles.barcodeContainer}>
                    <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 400, width: 400 }} />
                </View>

            {scanned && <Button title={'Escanear novamente'} onPress={() => setScanned(false)} color='tomato' />}
            </View>
        </SafeAreaView>
        
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
    marginBottom: '70%'
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

});

