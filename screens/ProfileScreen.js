//REACT
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { NavigationContainer, TabActions } from "@react-navigation/native";

//FIREBASE
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function ProfileScreen({ route, navigation }) {
  const email = route.params.userEmail;

  const [nome, setNome] = useState([]);
  const [id, setId] = useState([]);

  const usersRef = collection(db, "users");
  const [users, setUser] = useState([]);
  const [username, setUsername] = useState([]);
  //Set username
  useEffect(() => {
    getUser();
    users.forEach((user) => {
      if (user.email == email) {
        setUsername(user.username);
        setNome(user.nome);
        setId(user.id);
      }
    });
  }, [users]);
  const getUser = async () => {
    const userContainer = await getDocs(usersRef);
    setUser(userContainer.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleEmailUpdate = async () => {
    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, {
        nome: "teeeeeeeees",
      });

      console.log("Document updated successfully");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Olá, {username}</Text>
      </View>
      <View>
        <Text>Email: {email}</Text>
      </View>
      <View>
        <Text>Nome: {nome}</Text>
      </View>
      <TouchableOpacity onPress={() => handleEmailUpdate()}>
        <Text>Editar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
