//REACT
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
  StyleSheet,
} from "react-native";

//HTTP Request
import axios from "axios";

//FIREBASE
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const HomeScreen = ({ route, navigation }) => {
  const userRef = collection(db, "users");
  const [email, setEmail] = useState([]);
  const [users, setUser] = useState([]);
  const [username, setUsername] = useState([]);
  const [news, setNews] = useState([]);
  const [newsList, setNewsList] = useState([]);

  const getUser = async () => {
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
        "http://servicodados.ibge.gov.br/api/v3/noticias/?qtd=15"
      );
      const newsArticles = response.data;
      setNews(newsArticles);

      const baseUrl = "http://agenciadenoticias.ibge.gov.br";
      const updatedNewsList = newsArticles.items.map((article, index) => {
        const images = JSON.parse(article.imagens);
        const imageUrl = `${baseUrl}/${images.image_intro}`;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleLink(article.link)}
            style={styles.newsWrapper}
          >
            <View style={styles.imageContainer}>
              <Image source={{ uri: imageUrl }} style={styles.image} />
              <View style={styles.textWrapper}>
                <Text style={styles.text}>{article.titulo}</Text>
                <Text style={styles.newsIntro}>{article.introducao}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      });

      setNewsList(updatedNewsList);
    } catch (error) {
      console.error("Error fetching news articles:", error);
    }
  };

  const handleLink = async (url) => {
    await Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.noticiaText}>Notícias do momento...</Text>
        </View>
        {newsList.length > 0 ? newsList : null}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  scroll: {
    marginBottom: "26%",
  },
  container: {
    height: "100%",
    position: "relative",
  },
  wrapper: {
    position: "relative",
    height: 100,
    marginBottom: "4%",
    paddingHorizontal: 35,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "rgb(84, 156, 48)",
  },
  noticiaText: {
    fontFamily: "Bold",
    fontSize: 25,
    color: "#FFF",
    justifySelf: "center",
  },
  newFont: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
  newsWrapper: {
    marginHorizontal: "5%",
    // height: "10%",
  },
  image: {
    height: 150,
    width: 130,
    borderRadius: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
    alignContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    paddingLeft: "5%",
  },
  textWrapper: {
    flexDirection: "column",
    flexShrink: 6,
    alignSelf: "flex-start",
  },
  newsIntro: {
    fontSize: 12,
    paddingLeft: "7%",
    paddingTop: "2%",
  },
});
