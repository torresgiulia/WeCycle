//REACT
import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Button,
  Touchable,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking
} from "react-native";
// import Icon from 'react-native-vector-icons/Entypo' ;
import Icon from "react-native-vector-icons/Ionicons";
import LoginScreen from './LoginScreen';
import axios from 'axios';

import { StyleSheet } from "react-native";

//FIREBASE
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { async } from "@firebase/util";

const HomeScreen = ({ route, navigation }) => {
  const userRef = collection(db, "users");
  const [email, setEmail] = useState([]);
  const [users, setUser] = useState([]);
  const [username, setUsername] = useState([]);
  const [news, setNews] = useState([]);
  const [newsList, setNewsList] = useState([]);

  const getUser = async () => {
    console.log("home");
    const userContainer = await getDocs(userRef);
    setUser(userContainer.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    userContainer.docs.forEach((doc) => {
      const user = { ...doc.data(), id: doc.id };
      if (user.email === email) {
        setUsername(user.username);
      }
    });
  };

  useEffect(() => {
    console.log(route.params.userEmail);
    setEmail(route.params.userEmail);
    getUser();
  }, []);

  useEffect(() => {
    getAPI();
  }, []);


  //get API and load to the page
  const getAPI = async () => {
    try {
      const response = await axios.get(
        "http://servicodados.ibge.gov.br/api/v3/noticias/?qtd=10"
      );
      const newsArticles = response.data;
      setNews(newsArticles);

      const baseUrl = "http://agenciadenoticias.ibge.gov.br";
      const updatedNewsList = newsArticles.items.map((article, index) => {
        const images = JSON.parse(article.imagens);
        const imageUrl = `${baseUrl}/${images.image_intro}`;
        // setLink(article.link);
        return (
          <TouchableOpacity key={index} onPress={() => handleLink(article.link)}>
            <View style={styles.imageContainer}>
            <Text style={styles.text}>{article.titulo}</Text>
              <Image
                source={{ uri: imageUrl }}
                style={styles.image}
              />            
            </View>
          </TouchableOpacity>
        );
      });

      setNewsList(updatedNewsList);
    } catch (error) {
      console.error("Error fetching news articles:", error);
    }
  }
  
  const handleLink = async (url) => {
    await Linking.openURL(url);
  }



  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>  
        <View style={styles.wrapper}>
          <Text
            style={{
              fontFamily: "Bold",
              fontSize: 25,
              color: "#FFF",
              paddingVertical: 25,
            }}
          >
            Notícias do momento...
          </Text>
        </View>
        {newsList.length > 0 ? newsList : null}     
      </View>
    </ScrollView>
  );
};



export default HomeScreen;
const styles = StyleSheet.create({
  scroll:{
    marginBottom: '26%',
  },
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
  image: {
    height: 200, 
    width: 350,
    borderRadius: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 30,
  },
  text:{
    fontSize: 20
  }
});