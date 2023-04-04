//import * as React from "react";
import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView} from "react-native";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { StyleSheet } from "react-native";

import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';



const HomeScreen = ({route}) => {

    //user db ref
    const userRef = collection(db, "users");

    const [email, setEmail] = useState([]);
    const [users, setUser] = useState([]);
    const [username, setUsername] = useState([]);

    //Get user info
    useEffect(()=> {
        setEmail(route.params.userEmail);
        getUser();
    }, []);

    //Set username
    useEffect(() => {
        users.forEach((user) => {
            if(user.email == email){
                setUsername(user.username);
            }
        });
    }, [users])

    const getUser = async () => {                                              //container
        const userContainer = await getDocs(userRef);
        setUser(userContainer.docs.map((doc)=> ({...doc.data(), id: doc.id})));
    }


    return(
        <SafeAreaView style={styles.container}>
            <Text>Olá, {username}</Text>
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