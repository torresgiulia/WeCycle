//REACT
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Button,
  Touchable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
// import Icon from 'react-native-vector-icons/Entypo' ;
import Icon from "react-native-vector-icons/Ionicons";
import LoginScreen from './LoginScreen';

import { StyleSheet } from "react-native";

//FIREBASE
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { async } from "@firebase/util";

const HomeScreen = ({ route, navigation }) => {
  //user db ref
  const userRef = collection(db, "users");
  const [email, setEmail] = useState([]);
  const [users, setUser] = useState([]);
  const [username, setUsername] = useState([]);
    

  //Get user info
  useEffect(() => {
    console.log(route.params.userEmail);
    setEmail(route.params.userEmail);
    getUser();
  }, []);
  //Set username
  useEffect(() => {
    users.forEach((user) => {
      if (user.email == email) {
        setUsername(user.username);
      }
    });
  }, [users]);
  const getUser = async () => {
    const userContainer = await getDocs(userRef);
    setUser(userContainer.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // const postsRef = collection(db, "posts");
  // const [posts, setPosts] = useState([]);
  // const postsList = [];
  // //Load posts
  // useEffect(() => {
  //   getPosts();
  // }, [posts]);
  // const getPosts = async () => {
  //   const postContainer = await getDocs(postsRef);
  //   setPosts(postContainer.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  // };

  // const [like, setLike] = useState(false);
  // const [icon, setIcon] = useState("heart-outline");
  // //Push Posts
  // if (posts != null) {
  //   let i = posts.length;
  //   // let icon = "heart-outline";
  //   posts.forEach((post) => {
  //     postsList.push(
  //       <View key={i} style={styles.post}>
  //         <View>
  //           <Text>{post.username}</Text>
  //         </View>
  //         <View>
  //           <Text>{post.texto}</Text>
  //         </View>
  //         <View>
  //           <Text>{post.link}</Text>
  //         </View>
  //         <View style={styles.likes}>
  //           <TouchableOpacity onPress={() => handleLike()}>
  //             <Icon
  //               ios={icon}
  //               android={"md-add"}
  //               name={icon}
  //               size={26}
  //               color={"rgb(84, 156, 48)"}
  //               onPress={() => {}}
  //             />
  //           </TouchableOpacity>
  //           <Text>{post.loves}</Text>
  //         </View>
  //       </View>
  //     );
  //     i--;
  //   });
  // }

  // const handleLike = () => {
  //   // setLike(!like);
  //   if (like == true) {
  //     setLike(false);
  //     setIcon("heart-outline");
  //   } else {
  //     setLike(true);
  //     setIcon("heart");
  //   }
  // };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.wrapper}>
          {/* <Icon name = "dots-two-vertical" size={22} color="rgb(255, 255, 255)" style={{marginRight:-7, marginTop:7}}></Icon> */}
          <Text
            style={{
              fontFamily: "Bold",
              fontSize: 25,
              color: "#FFF",
              paddingVertical: 25,
            }}
          >
            Veja o que estão todos a dizer...
          </Text>
        </View>

        {/* {postsList}
        {postsList}
        {postsList} */}
      </ScrollView>

      <TouchableOpacity
        style={styles.newPost}
        onPress={() => navigation.navigate("New", { userEmail: email })}
      >
        <Text style={styles.newFont}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    height: "100%",
    position: "relative",
  },
  wrapper: {
    position: "relative",
    height: 150,
    width: "100%",
    paddingHorizontal: 35,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "rgb(84, 156, 48)",
  },
  post: {
    paddingTop: "2%",
    marginHorizontal: "5%",
    borderBottomWidth: 2,
    borderBottomColor: "rgb(198, 226, 182)",
    flexDirection: "column",
  },
  likes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  newPost: {
    width: 50,
    height: 50,
    right: 30,
    bottom: 140,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgb(198, 226, 182)",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(84, 156, 48)",
  },
  newFont: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
});
