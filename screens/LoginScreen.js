//REACT
import React, { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Image,ImageBackground, Touchable, Button, SafeAreaView } from 'react-native';
//Firebase
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

//Style
//import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Login: email e password
    function handleLogin(){
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            navigation.navigate('HomeNavigator', {userEmail: email});
        })
        .catch((error) => console.log(error.message))
    }
  
    return (  
        <ImageBackground source={require('../assets/Background.png')} resizeMode="cover" style={styles.backImage}>
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
                <View style={styles.btnContainer}>
                    {/* Login */}
                    <TouchableOpacity 
                            onPress={handleLogin}
                            activeOpacity={0.7}
                            style={styles.btnLogin}>
                        <Text style={styles.btnLoginText}>Login</Text>
                    </TouchableOpacity>
                </View>        
                <View style={styles.signupContainer}> 
                    {/* Create account */}   
                    <Text style={styles.textSignup}>Não tem conta? </Text> 
                    <TouchableOpacity 
                        onPress={() => {
                            navigation.navigate('Criar conta');}}>
                        <Text style={styles.btnSignup}>Criar!</Text>
                    </TouchableOpacity>     
                </View>             
            </KeyboardAvoidingView>
        </ImageBackground>
       
        
    );
}

export default LoginScreen;
    const styles = StyleSheet.create({
        backImage:{
            flex: 1,
            justifyContent: 'center',
        },
        container:{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        inputContainer:{
            width: '80%',
            alignItems: 'center'
        },
        inputBox: {
            borderWidth: 1,
            borderColor: 'rgb(88, 150, 54)',
            padding: 15,
            marginVertical: 10,
            borderRadius: 5,
            height: 55,
            width: '80%',
            paddingVertical: 0,
        },
        logo:{
            width: 260,
            height: 230,               
        },
        logoContainer:{
            alignItems: 'center',
            justifyContent: 'center' 
        },
        btnContainer:{
            margin: 10,
            backgroundColor: "rgb(99, 169, 61)",
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 10,
            width: '40%'
        },
        btnLogin:{
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 30,
        },
        btnLoginText:{
            fontSize: 18,
            color: "#fff",
            fontWeight: "bold",
            alignSelf: "center",
            textTransform: "uppercase"
        },
        signupContainer:{
            flexDirection: 'row',
            margin: 10
        },
        btnSignup:{
            color: 'rgb(88, 150, 54)',
            fontWeight: "bold",
            fontSize: 18
        },
        textSignup:{
            fontSize: 16
        }
        
});