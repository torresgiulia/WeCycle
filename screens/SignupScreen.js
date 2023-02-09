// import * as React from "react";
import React, { useState } from 'react';
import { Text, View, TextInput, SafeAreaView } from "react-native";
import { NavigationContainer, TabActions } from "@react-navigation/native";


const SignupScreen = () => {
    const [nome, setNome] = useState("");
    const [apelido, setApelido] = useState("");
    const [utilizador, setUtilizador] = useState("");
    const [telemovel, setTelemovel] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [vPass, setvPass] = useState("");

    return(
    <SafeAreaView>
        <Text>SignupScreen</Text>
        <View>
            <TextInput placeholder="Nome" value={nome} onChangeText={text => setNome(text)}></TextInput>
            <TextInput placeholder="Apelido" value={apelido} onChangeText={text => setApelido(text)}></TextInput>
            <TextInput placeholder="Utilizador" value={utilizador} onChangeText={text => setUtilizador(text)}></TextInput>
            <TextInput placeholder="Telemóvel" value={telemovel} onChangeText={text => setTelemovel(text)}></TextInput>
            <TextInput placeholder="Email" value={email} onChangeText={text => setEmail(text)}></TextInput>
            <TextInput placeholder="Palavra-passe" value={pass} onChangeText={text => setPass(text)}></TextInput>
            <TextInput placeholder="Confirmação de palavra-passe" value={vPass} onChangeText={text => setvPass(text)}></TextInput>
        </View>
    </SafeAreaView>
    )
};

export default SignupScreen;