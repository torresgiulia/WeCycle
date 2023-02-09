//import * as React from "react";
import { Text, View, TextInput } from "react-native";
//import { NavigationContainer, TabActions } from "@react-navigation/native";
//import React, { useState } from 'react';


const SignupScreen = () => {
    const [nome, setNome] = useState("");
    const [apelido, setApelido] = useState("");
    const [utilizador, setUtilizador] = useState("");
    const [telemovel, setTelemovel] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [vPass, setvPass] = useState("");

    <View>
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
    </View>
};

export default SignupScreen;