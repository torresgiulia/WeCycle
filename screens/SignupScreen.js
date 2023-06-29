// REACT
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
//Firebase
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const SignupScreen = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [utilizador, setUtilizador] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [vPass, setvPass] = useState("");

  //Handle Register com: name, email, password
  function handleRegister() {
    //not null
    if (
      nome == "" ||
      utilizador == "" ||
      email == "" ||
      pass == "" ||
      vPass == ""
    ) {
      console.log("Por favor preencha todos os campos obrigatórios");
    }
    //Mesma password
    else if (pass != vPass) {
      console.log("Passwords não combinam");
    } else {
      //Criar conta com email e passe
      createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          addUser();
        })
        .then(() => {
          navigation.navigate("HomeNavigator", { userEmail: email });
        })
        .catch((error) => console.log(error.message));
    }
  }

  //Add User
  const addUser = async () => {
    try {
      const usersRef = await addDoc(collection(db, "users"), {
        username: utilizador,
        nome: nome,
        email: email,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.sumaryContainer}>
        <Text>Olá, seja bem-vindo(a)</Text>
        <Text>
          Antes de começarmos a reciclar pedimos apenas para preencher este
          pequeno formulário:
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputBox}
          placeholder="Nome Completo"
          value={nome}
          autoCapitalize="words"
          onChangeText={(text) => setNome(text)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Nome de utilizador"
          value={utilizador}
          autoCapitalize="none"
          onChangeText={(text) => setUtilizador(text)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Email"
          value={email}
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Palavra-passe"
          secureTextEntry
          value={pass}
          onChangeText={(text) => setPass(text)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Confirmação de palavra-passe"
          secureTextEntry
          value={vPass}
          onChangeText={(text) => setvPass(text)}
        />
      </View>
      <View style={styles.submitContainer}>
        <TouchableOpacity onPress={handleRegister} style={styles.btnSubmit}>
          <Text style={styles.btnSubmitText}>Submeter</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(245, 253, 242)",
  },
  inputBox: {
    borderWidth: 1,
    borderColor: "rgb(88, 150, 54)",
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    height: 55,
    width: "80%",
    paddingVertical: 0,
  },
  inputContainer: {
    width: "80%",
    alignItems: "center",
  },
  submitContainer: {
    margin: 10,
    backgroundColor: "rgb(99, 169, 61)",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "40%",
  },
  btnSubmit: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 30,
  },
  btnSubmitText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  sumaryContainer: {
    alignItems: "center",
  },
});
