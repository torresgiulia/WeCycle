// import { Text, View, StyleSheet, Button } from "react-native";
// import { BarCodeScanner } from 'expo-barcode-scanner';
// import React, { useState, useEffect } from 'react';

// export default function BarcodeScreen() {
//     const [hasPermission, setHasPermission] = useState(null);
//     const [scanned, setScanned] = useState(false);
//     const [id, setId] = useState('Not yet scanned');

//     const askForCameraPermission = () => {
//         (async () => {
//             console.log("entrouuu");
//             const { status } = await BarCodeScanner.requestPermissionsAsync();
//             setHasPermission(status == 'granted');
//         })()
//     }
    
//     //Permissão da camera
//     useEffect(() => {
//         askForCameraPermission();
//     }, []);

//     //Código-de-barra escaneado
//     const handleBarCodeScanned = ({ type, data}) => {
//         setScanned(true);
//         setId(data);
//         console.log("Tipo: " + type + "\nID: " + data);
//     }

//     //A PEDIR PERMISSÃO 
//     if(hasPermission === null){
//         return(
//             <View style={styles.container}>
//                 <Text>A pedir permissão</Text>
//             </View>
//         ); 
//     }

//     //PERMISSÃO NEGADA 
//     if(hasPermission === false){
//         return(
//             <View style={styles.container}>
//                 <Text>Sem acesso à camera</Text>
//                 <Button title={'Permitir acesso'} onPress={() => askForCameraPermission()}></Button>
//             </View>
//         ); 
//     }

//     //PERMISSÃO CONCEDIDA
//     return(
//         <View style={styles.container}>
//             <View style={styles.barcodeContainer}>
//                 <BarCodeScanner 
//                 onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//                 style={{height: 400, height:400}}/>
//             </View>
//             <Text>{id}</Text>
//         </View>
//     ); 
// };


// const styles = StyleSheet.create({
//     container:{
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',   
//         //backgroundColor: "rgb(225, 243, 216)",
//     },
//     barcodeContainer:{
//         alignItems: 'center',
//         height: 300,
//         width: 300,
//         overflow: "hidden",
//         borderRadius: 30,
//         backgroundColor: 'tomato'
//     }
// })
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function BarcodeScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [id, setId] = useState('Produto não escaneado');

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);


  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setId(data)
    console.log('Type: ' + type + '\nData: ' + data)
  };

  // Check permissions and return the screens
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

  // Return the View
  return (
    <View style={styles.container}>
      <View style={styles.barcodeContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />
      </View>
      <Text style={styles.maintext}>{id}</Text>

      {scanned && <Button title={'Escanear novamente'} onPress={() => setScanned(false)} color='tomato' />}
    </View>
  );
}

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

