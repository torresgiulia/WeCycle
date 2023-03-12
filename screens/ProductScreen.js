//NAVIGATION
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//REACT
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useEffect, useState, Component } from 'react';

//FIREBASE
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function ProductScreen({route, navigation}){
    //Id(barcode) do produto
    const itemId = route.params;
    const prodId = JSON.stringify(itemId).replace(/\D/g, "");

    const [products, setProducts] = useState([]);
    const productRef = collection(db, "products");
    const [productAttributes, setProductAttributes] = useState([]);

    //teste
    const [readProduct, setReadProduct] = useState([]);

    //Use hook and store products
    useEffect(() => {     
        getProduct();
    }, []);
    const getProduct = async () => {
        const data = await getDocs(productRef);
        setProducts(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
           
    };  

    //Hook after object render and specify product
    useEffect(() => {     
        products.forEach((product) => {
            if(product.id == prodId){
                setProductAttributes(product)
            }
        })
    }, [products]);
    


    return(
        <View style={styles.container}>
            <View>
                {/* <Text>ID: {prodId}</Text> */}
                <Text>Nome: {productAttributes ? JSON.stringify(productAttributes.nome) : 'A carregar'}</Text>
                <Text>Instruções de descarte: {productAttributes.instrucoes}</Text>
                <Text>Link para mais informações: {productAttributes.link}</Text>
                <Text>Fabricante: {productAttributes.fabricante}</Text>
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