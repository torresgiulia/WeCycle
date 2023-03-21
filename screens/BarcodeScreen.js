//Pedir permissão e ler código de barra

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const BarcodeScreen = ({navigation}) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

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
        <View style={styles.container}>
        <View style={styles.barcodeContainer}>
            <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }} />
        </View>

        {scanned && <Button title={'Escanear novamente'} onPress={() => setScanned(false)} color='tomato' />}
        </View>
    );
}
export default BarcodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  }
});

