//REACT
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput, Button } from "react-native";
import { useEffect, useState } from "react";

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

import { updateEmail } from "firebase/auth";

export default function ProfileScreen({ route, navigation }) {
  const email = route.params.userEmail;

  const [nome, setNome] = useState('');
  const [username, setUsername] = useState('');
  const [id, setId] = useState('');

  const usersRef = collection(db, "users");
  const [users, setUser] = useState([]);
  const [picRef, setPicRef] = useState([]);

  const [updatedUsername, setUpdatedUsername] = useState('');
  const [updatedNome, setUpdatedNome] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');


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
  },[email]);
  useEffect(() => {
    setUpdatedUsername(username);
    setUpdatedNome(nome);
    setUpdatedEmail(email);
  }, [username, nome, email]);


  //Updating TextInput
  const handleUsernameUpdate = (newUsername) => {
    setUpdatedUsername(newUsername);
  };
  const handleNameUpdate = (newName) => {
    setUpdatedNome(newName);
  };
  const handleEmailUpdate = (newEmail) => {
    setUpdatedEmail(newEmail);
  } 

  //Save changes
  const handleSaveUsername = async () => {
    try {
      const updatedUser = {
        username: updatedUsername,
        nome: updatedNome,
        email: updatedEmail
      };

      await Promise.all([
        updateEmail(auth.currentUser, updatedEmail),
        updateDoc(doc(usersRef, id), updatedUser)
      ]);

      console.log("Update successful");
    } 
    catch (error) {
      console.error('Error updating username:', error);
    }
  };

  //Delete user account
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
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
        style={styles.img}
        source={{uri: 'https://firebasestorage.googleapis.com/v0/b/wecycle-db.appspot.com/o/ProfilePics%2Fprofile1.png?alt=media&token=ab6b5c86-bbf4-43d9-bda9-1b262e8219a2'}}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Olá, </Text>
        <TextInput style={styles.inputBox} value={updatedUsername} onChangeText={handleUsernameUpdate} />        
      </View>
      <View style={styles.inputContainer}>
        <Text>Email: </Text>
        <TextInput style={styles.inputBox}  value={updatedEmail} onChangeText={handleEmailUpdate}/>
      </View>
      <View style={styles.inputContainer}>
        <Text>Nome: </Text>
        <TextInput style={styles.inputBox} value={updatedNome} onChangeText={handleNameUpdate} />
      </View>
      <View style={styles.inputContainer}>
        <Button onPress={handleSaveUsername} title="Save" />
        <TouchableOpacity onPress={() => handleDelete()}>
          <Text>Apagar conta </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
  },
  imgContainer:{
    backgroundColor: 'blue'
  },
  img:{
    backgroundColor: 'red',
    width: '100%'
  },
  inputContainer:{
    flexDirection: 'row'
  },
  inputBox:{
    borderBottomWidth: 1,
    borderColor: 'rgb(88, 150, 54)',
    backgroundColor: 'rgb(226, 241, 218)',
    padding: 0
  }
});
