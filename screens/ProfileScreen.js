//REACT
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
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
  const [picRef, setPicRef] = useState([]);

  const profilePicRef = collection(db, "profilePics");
  const [pics, setPics] = useState([]);
  const [src, setSrc] = useState([]);

  //Set username
  // useEffect(() => {
  //   getUser();
    
  // }, []);
  // useEffect(() => {
  //   users.forEach((user) => {
  //     if (user.email == email) {
  //       setUsername(user.username);
  //       setNome(user.nome);
  //       setId(user.id);
  //       setPicRef(user.img);
  //     }
  //   });
  // }, [users]);
  // const getUser = async () => {
  //   console.log("profile");
  //   const userContainer = await getDocs(usersRef);
  //   setUser(userContainer.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  // };

  // //Set ProfilePics
  // useEffect(()=> {
  //   getPics();
  //   pics.forEach((pictures) => {
  //     if(pictures.id == picRef){
  //       console.log(pictures.id);
  //       setSrc(pictures.src);
  //     }
  //   });
  // }, [users, pics]);
  // const getPics = async () => {
  //   const picsContainer = await getDocs(profilePicRef);
  //   setPics(picsContainer.docs.map((doc) => ({...doc.data(), id: doc.id})));
  // }



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
  img:{
    width: 70,
    height:70
  }
});
