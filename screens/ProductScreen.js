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
    //detalhes do produto
    const itemId = route.params;
    const produto = {
        nome: '',
        fabricante: '',
        instrucoes: '',
        link: '',
    }

    //products call
    const [products, setProducts] = useState([]);
    const productRef = collection(db, "products");

    useEffect(() => {     
        getProduct();
    }, [])

    //Todos os produtos
    const getProduct = async () => {
        const data = await getDocs(productRef);
        setProducts(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
        handleProduct();
        
    };  

    //Produto lido
    function handleProduct() {
        console.log("hadleProduct");
        products.map((product) =>{
            console.log("map");
            // console.log(product.id);
            // console.log(itemId);
            if(product.id == itemId.toString()){
                console.log("entrou");
                produto.nome= product.nome;
                produto.fabricante= product.fabricante;
                produto.instrucoes= product.instrucoes;
                produto.link= product.link;
            }
            else{
                console.log("nadaa");
            }
        })
    } 


    return(
        <View style={styles.container}>
            <View>
                <Text>ID: {JSON.stringify(itemId)}</Text>
                <View>{products.map((product) => {return(<Text>{product.nome}</Text>)})}</View>
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