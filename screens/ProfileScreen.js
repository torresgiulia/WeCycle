//REACT
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useEffect, useState } from "react";
import { NavigationContainer, TabActions } from "@react-navigation/native";

//FIREBASE
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  
} from "firebase/firestore";

export default function ProfileScreen({ route, navigation }) {
  const email = route.params.userEmail;

  const [nome, setNome] = useState([]);
  const [username, setUsername] = useState([]);
  const [id, setId] = useState([]);

  const usersRef = collection(db, "users");
  const [users, setUser] = useState([]);
  const [picRef, setPicRef] = useState([]);

  const profilePicRef = collection(db, "profilePics");
  const [pics, setPics] = useState([]);
  const [src, setSrc] = useState([]);

  //Load user Info
  const getUser = async () => {
    const userContainer = await getDocs(usersRef);
    setUser(userContainer.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    userContainer.docs.forEach((doc) => {
      const user = { ...doc.data(), id: doc.id };
      if (user.email === email) {
        setNome(user.nome);
        setUsername(user.username);
        setId(doc.id);
      }
    });
  };
  useEffect(() => {
    getUser();
  },[]);



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

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "users", id));
      
      const user = auth.currentUser;
      if (user) {
        user
          .delete()
          .then(() => {
            console.log('User deleted successfully');
            navigation.navigate('Login');
          })
          .catch((error) => console.log(error.message));
      } else {
        console.log('No user is currently signed in');
      }
    }
    catch (error) {
      console.log("Error deleting account", error.message);
    }
  }

  return (
    <View style={styles.container} styles={styles.img}>
      <View>
        {/* <Image source={{ uri: src }} /> */}
      </View>
      <View>
        <Text>Olá, {username}</Text>
      </View>
      <View>
        <Text>Email: {email}</Text>
      </View>
      <View>
        <Text>Nome: {nome}</Text>
      </View>
      <TouchableOpacity >
        <Text>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete()}>
        <Text>Apagar conta</Text>
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
  img:{
    width: 70,
    height:70
  }
});
