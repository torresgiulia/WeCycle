import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { useEffect, useState } from "react";

//FIREBASE
import { db } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default function NewPostScreen({ route, navigation }) {
  const userEmail = route.params.userEmail;

  const [texto, setTexto] = useState([]);
  const [link, setLink] = useState([]);

  const userRef = collection(db, "users");
  const [users, setUser] = useState([]);
  const [username, setUsername] = useState([]);
  //Set username
  // useEffect(() => {
  //   getUser();
  //   users.forEach((user) => {
  //     if (user.email == userEmail) {
  //       setUsername(user.username);
  //     }
  //   });
  // }, [users]);
  const getUser = async () => {
    const userContainer = await getDocs(userRef);
    setUser(userContainer.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  //Add post
  const handlePost = async () => {
    try {
      const postsRef = await addDoc(collection(db, "posts"), {
        username: username,
        loves: 0,
        texto: texto,
        link: link,
      });
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.new}>
        <Text>Novo post</Text>
        <TextInput
          placeholder="Texto"
          value={texto}
          onChangeText={(text) => setTexto(text)}
        ></TextInput>
        <TextInput
          placeholder="Link"
          value={link}
          onChangeText={(text) => setLink(text)}
        ></TextInput>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => handlePost()}>
            <Text>Postar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
            <Text>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  new: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    height: "50%",
    width: "70%",
    backgroundColor: "rgb(245, 253, 242)",
    borderColor: "rgb(120, 202, 78)",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
});
