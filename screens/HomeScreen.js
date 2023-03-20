//import * as React from "react";
import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView} from "react-native";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { StyleSheet } from "react-native";

import { auth } from '../firebase';
//import { getUserByEmail } from 'firebase/auth';


const HomeScreen = ({route}) => {
    //Adicionar posts e passar info do login
    const [email, setEmail] = useState([]);

    useEffect(()=> {
        setEmail(route.params.userEmail);
        // auth.get
        // getUserByEmail(auth, email)
        // .then((data) => {console.log(data)})

        
        //Criar tabela de user para adicionar e buscar a infomação necessária
    }, [email]);

    return(
        <SafeAreaView style={styles.container}>
            <Text>Home Screen</Text>
            <Text>{email}</Text>
        </SafeAreaView>
    )
};

export default HomeScreen;
const styles = StyleSheet.create({

    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',   
        backgroundColor: "rgb(225, 243, 216)",
    }
})