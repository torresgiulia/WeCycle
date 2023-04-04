import { Text, View, StyleSheet, TextInput } from "react-native";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { useEffect, useState } from 'react';

//FIREBASE
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';


const SearchBar = () => {
    const [searchText, setSearchText] = useState([]);

    const productRef = collection(db, "products");
    const [products, setProducts] = useState([]);

    const getProduct = async () => {
        const productData = await getDocs(productRef);
        setProducts(productData.docs.map((doc)=> ({...doc.data(), id: doc.id})));
    }
    
    useEffect(()=>{
        getProduct();
    }, []);

    return(
        <View style={styles.container}>
            <TextInput placeholder="Pesquisar produtos..." style={styles.textBox} onChangeText={(text) => {
                //Olhar todos os produtos e fazer a query
                products.forEach((product) => {
                    if(product.nome.toLowerCase().includes(text.toLowerCase())){
                        console.log(product.nome);
                    }
                })
            }}></TextInput>
        </View>
    )
};

export default SearchBar;
const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center', 
        marginTop: '10%',  
        marginHorizontal: '10%',
        backgroundColor: 'rgb(245, 253, 242)',
        height: '25%',
        borderRadius: 20,
    },
    textBox:{
        //backgroundColor: 'tomato',
        width: '95%',
        height: '95%'
        
    }
})