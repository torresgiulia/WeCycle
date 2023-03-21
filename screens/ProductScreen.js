//NAVIGATION
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//REACT
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useEffect, useState, Component } from 'react';

//FIREBASE
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { async } from '@firebase/util';

export default function ProductScreen({route, navigation}){
    //Id(barcode) do produto
    const itemId = route.params;
    const prodId = JSON.stringify(itemId).replace(/\D/g, "");

    //Product
    const productRef = collection(db, "products");
    const [products, setProducts] = useState([]); 
    const [productAttributes, setProductAttributes] = useState([]);

    //Composition and container
    const compositionRef = collection(db, "composition");   
    const [materialComposition, setMaterialComposition] = useState([]);
    const [productComposition, setProductComposition] = useState([]);

    const [materialContainer, setMaterialContainer] = useState([]);
    const containerRef = collection(db, "container");

    //Use hook and store products
    useEffect(() => {     
        getProduct();
        getComposition();
        getContainer
    }, []);

    const getProduct = async () => {                                                //product
        const productData = await getDocs(productRef);
        setProducts(productData.docs.map((doc)=> ({...doc.data(), id: doc.id})));    
    }; 
    const getComposition = async () => {                                            //composition
        const compositionData = await getDocs(compositionRef);
        setMaterialComposition(compositionData.docs.map((doc)=>({...doc.data(), id: doc.id})))
    }; 
    const getContainer = async () => {                                              //container
        const containerData = await getDocs(containerRef);
        setMaterialContainer(containerData.docs.map((doc)=> ({...doc.data(), id: doc.id})))
    }



    //Hook after object render and specify product
    useEffect(() => {  
        products.forEach((product) => {
            if(product.id == prodId){
                setProductAttributes(product);
                materialComposition.forEach((material) => {
                    if(material.codigo_barras == prodId){

                        //não sei porque não funciona !!!!!!!!!!!
                        //ver: react native usestate add new element
                        setProductComposition(material);
                        //console.log(productComposition);
                        
                        // if(productComposition && Object.keys(productComposition).length === 0)
                        // {
                        //     console.log("oi");
                        //     setProductComposition(material);
                        //     console.log(productComposition);
                        // }
                        // else{
                        //     const materiais = productComposition + " ," + material;
                        //     console.log(materiais);
                        //     setProductComposition(materiais);
    
                        // }
                    }
                })
                
            }
        })
    }, [products, materialComposition, productComposition]);
    


    return(
        <View style={styles.container}>
            <View>
                <Text>Nome: {productAttributes ? JSON.stringify(productAttributes.nome) : 'A carregar'}</Text>
                <Text>Instruções de descarte: {productAttributes.instrucoes}</Text>
                <Text>Link para mais informações: {productAttributes.link}</Text>
                <Text>Fabricante: {productAttributes.fabricante}</Text>
                <Text>Material: </Text>
                <Text>Parte: </Text>
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