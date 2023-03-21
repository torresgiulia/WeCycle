//import * as React from "react";
import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView} from "react-native";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { StyleSheet } from "react-native";

import { auth, db } from '../firebase';
import { collection } from "firebase/firestore";
//import { getUserByEmail } from 'firebase/auth';


const HomeScreen = ({route}) => {

    const [email, setEmail] = useState([]);
    const userRef = collection(db, "user");
    const [user, setUser] = useState([]);

    useEffect(()=> {
        setEmail(route.params.userEmail);
        getUser();
        //Criar tabela de user para adicionar e buscar a infomação necessária

        
    }, [email]);

    const getUser = async () => {                                              //container
        const userContainer = await getDocs(userRef);
        setUser(userContainer.docs.map((doc)=> ({...doc.data(), id: doc.id})));
    }


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