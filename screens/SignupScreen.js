// REACT
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView , Button, KeyboardAvoidingView } from "react-native";
import { NavigationContainer, TabActions } from "@react-navigation/native";
//Firebase
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';



const SignupScreen = () => {
    const [nome, setNome] = useState("");
    const [utilizador, setUtilizador] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [vPass, setvPass] = useState("");

    //Handle Register com:
    //name, email, password
    function handleRegister(){
        //not null
        if(nome=='' || utilizador=='' || email=='' || pass=='' || vPass==''){
            console.log("Por favor preencha todos os campos obrigatórios");
        }
        //Mesma password
        else if(pass != vPass){
            console.log("Passwords não combinam");
        }
        else{
            //Criar conta com email e passe
            createUserWithEmailAndPassword(auth, email, pass) 
            .then((userCredential) => {
                const user = userCredential.user;     //object user         
                //atualizar para adicionar nome
                updateProfile(auth.currentUser, {
                    displayName: nome + " " + utilizador,
                })
                //APENAS PARA TESTE
                .then(()=> {
                    const array = auth.currentUser.displayName.split(" ");
                    console.log("username: " + array[array.length -1]);
                } )
                .catch((error) => console.log(error.message))
            })
            .catch((error) => console.log(error.message) )
            
        }
    }

    return(
    <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.sumaryContainer}>
            <Text>Olá, seja bem-vindo(a)</Text>
            <Text>Antes de começarmos a reciclar pedimos apenas para preencher este pequeno questionário:</Text>
        </View>
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.inputBox} 
                placeholder="Nome Completo" 
                value={nome} 
                autoCapitalize='words'
                onChangeText={text => setNome(text)}/>
            <TextInput 
                style={styles.inputBox} 
                placeholder="Utilizador" 
                value={utilizador} 
                autoCapitalize='none'
                onChangeText={text => setUtilizador(text)}/>
            <TextInput 
                style={styles.inputBox} 
                placeholder="Email" 
                value={email} 
                autoCapitalize='none'
                onChangeText={text => setEmail(text)}/>
            <TextInput 
                style={styles.inputBox} 
                placeholder="Palavra-passe" 
                secureTextEntry
                value={pass} onChangeText={text => setPass(text)}/>
            <TextInput 
                style={styles.inputBox} 
                placeholder="Confirmação de palavra-passe" 
                secureTextEntry
                value={vPass} onChangeText={text => setvPass(text)}/>          
        </View>   
        <View style={styles.submitContainer}>
            <Button title='Submeter' onPress={handleRegister}></Button>
        </View>    
    </KeyboardAvoidingView>
    )
};

export default SignupScreen;
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
    },
    inputBox:{
        margin: 5,
        width: "90%",
        fontSize: 18,
        color: "white",
        padding: 12, 
        backgroundColor: "rgb(197, 228, 180)", 
        borderWidth: 0.5,
        borderRadius: 10,
    },
    inputContainer:{
        //flex: 2,
        alignItems: 'center',
    },
    submitContainer:{
        //flex: 1
    },
    sumaryContainer:{
        alignItems: 'center'
    }
});