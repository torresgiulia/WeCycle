//REACT
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity } from "react-native";
import { NavigationContainer, TabActions, useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";

//FIREBASE
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function SearchScreen({navigation}) {

    const [items, setItems] = useState([]);

    //product View
    //const [list, setList] = useState([]);
    const list = [];

    //Buscar produtos
    const productRef = collection(db, "products");
    const [products, setProducts] = useState([]);
    const getProduct = async () => {
        const productData = await getDocs(productRef);
        setProducts(productData.docs.map((doc)=> ({...doc.data(), id: doc.id})));
    }

    useEffect(() => {
        getProduct();
    }, [])
    
    //Cada tecla
    const handleItems = (prod) => {
        // list = [];
        // products.forEach((product) => {
        //     let i = products.length;
        //     if(product.nome.toLowerCase().includes(prod.toLowerCase())){
        //         console.log(product.nome);
        //         //Touchable opacity que leva a "product"  ----> params = navigation.navigate('Product', {itemId: data});
        //         list.push(
                    
        //             <View key ={i} style={styles.productsContainer}>
        //                 <TouchableOpacity>
        //                 <View style={styles.productBox}>
        //                     <View style={styles.image}/>
        //                     <View style={styles.textBoxWrapper}>
        //                         <Text>{product.nome}</Text>
        //                     </View>
        //                 </View>
        //                 </TouchableOpacity>
        //             </View>
                                                  
        //         )
        //         i--;
        //     }
        // })
    }

    //Inicializar produtos
    if (products != null) {
        let i = products.length;
        products.forEach((product) =>{ 

            //COMO fazer isso com useSate para poder atualizar (entra em loop infinito?)
            list.push(
                
                <View key ={i} style={styles.productsContainer}>                   
                        <TouchableOpacity style={styles.productBox} onPress={() => navigation.navigate('Product', {itemId: product.id})}>
                            <View style={styles.image}/>
                            <View style={styles.textBoxWrapper}>
                                <Text>{product.nome}</Text>
                            </View>
                        </TouchableOpacity>
                </View>
                
            )
            i--;
        })
    }



    return(
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <View style={styles.textBoxContainer}>
                    <TextInput placeholder=" Pesquisar produtos... " onEndEditing={() => {}} onChangeText={(text) => {handleItems(text)}}></TextInput>
                </View>
            </View>
            {list}
            
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',   
    },
    textBox:{
        width: '80%',
        height: 60,
        backgroundColor: 'rgb(245, 253, 242)',
        borderRadius: 20,
        justifyContent: 'center', 
        marginTop: '10%',  
        marginHorizontal: '10%',
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
    },
    productsContainer:{
        alignItems: 'center',
        marginTop: 10,
    },
    productBox:{
        width: '80%',
        height:70,
        backgroundColor: 'rgb(230, 255, 230)',
        justifyContent: 'left',
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row'
    },
    image:{
        backgroundColor: 'rgb(120, 202, 78)',
        width: 50,
        height: 50,
        padding: 10,
    },
    textBoxWrapper:{
        padding: 10,
    },
})