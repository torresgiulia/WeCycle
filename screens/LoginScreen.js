//REACT
import React, { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Image, Touchable, Button } from 'react-native';
//Firebase
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Login: email e password
    function handleLogin(){
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            navigation.navigate('HomeNavigator');
        })
        .catch((error) => console.log(error.message))
    }
  
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.logoContainer}>
                <Image source={require('../assets/logo_correto.png')} style={styles.logo}></Image>
            </View>
                      
            <View style={styles.inputContainer}>
                {/* Email */}
                <TextInput 
                    placeholder='Email'
                    value={email}
                    autoCapitalize='none'
                    onChangeText={text => setEmail(text)}
                    style={styles.inputBox}/>
                {/* Password */}
                <TextInput 
                    placeholder='Password'
                    value={password}
                    secureTextEntry
                    onChangeText={text => setPassword(text)}
                    style={styles.inputBox}/>
            </View>
            <View style={styles.buttonsContainer}>
                <View >
                    {/* Login */}
                    <Button title='Login' onPress={handleLogin}></Button>
                </View>

                <View style={styles.buttonContainer}> 
                    {/* Create account */}    
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => {
                            navigation.navigate('Criar conta');}}>
                        <Text style={styles.buttonText}>Criar conta</Text>
                    </TouchableOpacity>     
                </View>
            </View>
            
        </KeyboardAvoidingView>
    );
}

export default LoginScreen;
    const styles = StyleSheet.create({
        container:{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        inputContainer:{
            width:'80%',
            alignItems: 'center',
        },
        buttonContainer:{
            width: '60%',
            justifyContent: 'center',
            alignItems:'center',
            marginTop:40,
        },
        inputBox: {
            margin: 5,
            width: "90%",
            fontSize: 18,
            color: "white",
            padding: 12, 
            backgroundColor: "rgb(197, 228, 180)", //rgb(162, 212, 133)
            borderWidth: 0.5,
            borderRadius: 10,
        },
        logo:{
            width: 250,
            height: 230,               
        },
        logoContainer:{
            //flex: 2,
            alignItems: 'center',
            justifyContent: 'center' 
        },
        button:{
            color: "rgb(0, 153, 51)",

        },
        buttonText:{
            color: "rgb(0, 153, 51)",
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: 15,
            fontSize: 20,
        },
        buttonsContainer:{
            //flex: 1,
        }
});