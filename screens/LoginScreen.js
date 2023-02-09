import React, { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Image, Touchable, Button } from 'react-native';
//Firebase
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
//React Navigator
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import SignupScreen from './SignupScreen';
import HomeScreen from './HomeScreen';

const Stack = createNativeStackNavigator();

 function SignupStack({ navigation }) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
      </Stack.Navigator>
    );
  }

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    //Navigate to SignupScreen

    //Problema está em não conseguir direcionar na função, apenas no return da página

    //navigation.navigate("SignupScreen");
    const handleButtonPresss = () => {
        console.log("in");
        <Stack.Navigator>
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
        </Stack.Navigator>
    };

        const handleButtonPress = () => {
          console.log('Button pressed');
          navigation.navigate('SignupScreen');
        };

  
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Image source={require('../assets/logo_correto.png')} style={styles.logo}></Image>
            
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.inputBox}/>
                <TextInput 
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.inputBox}
                    secureTextEntry/>
            </View>

            <View >
                <TouchableOpacity 
                onPress={()=> {}}>
                    <Text style={styles.buttonContainer}>Login</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}> 
                <Button onPress={handleButtonPress} title="Criar conta"></Button>
                <Text>Não tem conta? 
                    <TouchableOpacity onPress={() => {}}> 
                        <Text style={styles.link}>Criar uma!</Text>
                    </TouchableOpacity>
                </Text>              
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
            backgroundColor: "rgb(162, 212, 133)",
            borderWidth: 0.5,
            borderRadius: 10,
        },
        link:{
            color: "rgb(0, 153, 51)",
        },
        logo:{
            width: 250,
            height: 230     
        }
});