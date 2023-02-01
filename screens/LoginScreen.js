import React, { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';


const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = () => {
        createUserWithEmailAndPassword(auth, email, password);
    };
  
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}/>
                <TextInput 
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry/>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                onPress={()=> {}}
                style={styles.buttonText}>
                    <Text style={[styles.button, styles.buttonOutline]}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                onPress={handleSubmit}
                style={[styles.button, styles.buttonOutline] }>
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
    }

    export default LoginScreen;

    const styles = StyleSheet.create({
        container:{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center'

        },
        inputContainer:{
            width:'80%'
        },
        input:{
            backgroundColor:'white',
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 10,
            marginTop:5
        },
        buttonContainer:{
            width: '60%',
            justifyContent: 'center',
            alignItems:'center',
            marginTop:40
        },
        button:{
            width:'100%',
            backgroundColor:'#0782F9',
            padding:15,
            borderRadius:10,
            alignItems: 'center'
        },
        buttonOutline:{
            borderColor: 'white',
            marginTop: 5,
            borderColor: '#0782F9',
            borderWidth:2
        },
        buttonOutlineText:{
            color: 'white',
            fontWeight: '700',
            fontSize: 16
        },
        buttonText:{
            color: '#0782F9',
            fontWeight: '700',
            fontSize: 16
        },
});