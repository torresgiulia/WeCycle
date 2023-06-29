//REACT
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import { useEffect, useState } from "react";

//Icon
import Icon from "react-native-vector-icons/Ionicons";

//FIREBASE
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { updateEmail } from "firebase/auth";

export default function ProfileScreen({ route, navigation }) {
  const email = route.params.userEmail;

  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");

  const usersRef = collection(db, "users");
  const [users, setUser] = useState([]);

  const [updatedUsername, setUpdatedUsername] = useState("");
  const [updatedNome, setUpdatedNome] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");

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
  }, [email]);

  //Add info to textInput
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
  };

  //Save changes
  const handleSaveUsername = async () => {
    try {
      const updatedUser = {
        username: updatedUsername,
        nome: updatedNome,
        email: updatedEmail,
      };

      await Promise.all([
        updateEmail(auth.currentUser, updatedEmail),
        updateDoc(doc(usersRef, id), updatedUser),
      ]);

      console.log("Update successful");
    } catch (error) {
      console.error("Error updating username:", error);
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
            console.log("User deleted successfully");
            navigation.navigate("Login");
          })
          .catch((error) => console.log(error.message));
      } else {
        console.log("No user is currently signed in");
      }
    } catch (error) {
      console.log("Error deleting account", error.message);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/Background.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.flx}>
        <View style={styles.imgContainer}>
          <Icon
            ios={"person-outline"}
            android={"md-add"}
            name={"person-outline"}
            size={40}
            color={"black"}
          />
        </View>
        <View style={styles.inputBoxUser}>
          <TextInput
            style={styles.inputBox}
            value={updatedUsername}
            onChangeText={handleUsernameUpdate}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.headText}>Email: </Text>
        <TextInput
          style={styles.inputBox}
          value={updatedEmail}
          onChangeText={handleEmailUpdate}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.headText}>Nome: </Text>
        <TextInput
          style={styles.inputBox}
          value={updatedNome}
          onChangeText={handleNameUpdate}
        />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => handleSaveUsername()}
          style={[styles.btn, { backgroundColor: "rgb(113, 182, 73)" }]}
        >
          <Text style={styles.btnText}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete()}
          style={[styles.btn, { backgroundColor: "red" }]}
        >
          <Text style={styles.btnText}>Apagar conta </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={[styles.btn, { backgroundColor: "black" }]}
        >
          <Text style={styles.btnText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  flx: {
    flexDirection: "row",
    alignItems: "center",
    bottom: "35%",
    left: "20%",
  },
  imgContainer: {
    backgroundColor: "rgb(198, 226, 182)",
    padding: "2%",
    borderRadius: 25,
  },
  img: {
    backgroundColor: "red",
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    left: "15%",
    bottom: "15%",
    marginBottom: "4%",
  },
  inputBox: {
    borderBottomWidth: 1,
    borderColor: "rgb(88, 150, 54)",
    padding: 0,
    fontSize: 17,
  },
  inputBoxUser: {
    marginLeft: "2%",
    fontSize: 17,
  },
  headText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  btnContainer: {
    left: "10%",
    flexDirection: "row",
  },
  btn: {
    marginHorizontal: "4%",
    padding: "2%",
    borderRadius: 7,
  },
  btnText: {
    color: "white",
  },
});
