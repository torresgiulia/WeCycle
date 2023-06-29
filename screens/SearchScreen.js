//REACT
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useEffect, useState } from "react";

//FIREBASE
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function SearchScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    console.log("search");
    const productRef = collection(db, "products");
    const productData = await getDocs(productRef);
    setProducts(productData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleItems = (text) => {
    const filteredItems = products.filter((prod) =>
      prod.nome.toLowerCase().includes(text.toLowerCase())
    );
    setItems(filteredItems);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <View style={styles.textBoxContainer}>
          <TextInput
            placeholder="  Pesquisar produtos... "
            onChangeText={(text) => {
              handleItems(text);
            }}
            placeholderTextColor="rgb(38, 38, 38)"
          />
        </View>
      </View>
      {items.map((item) => (
        <View key={item.id} style={styles.productsContainer}>
          <TouchableOpacity
            style={styles.productBox}
            onPress={() => navigation.navigate("Product", { itemId: item.id })}
          >
            <View style={styles.image}>
              <Image source={{ uri: item.img }} style={styles.prodImage} />
            </View>
            <View style={styles.textBoxWrapper}>
              <Text>{item.nome}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textBox: {
    width: "80%",
    height: 60,
    backgroundColor: "rgb(245, 253, 242)",
    borderRadius: 20,
    justifyContent: "center",
    marginTop: "10%",
    marginHorizontal: "10%",
  },
  textBoxContainer: {
    width: "80%",
    height: "40%",
    backgroundColor: "rgb(230, 230, 230)",
    borderRadius: 15,
    borderColor: "rgb(84, 156, 48)",
    borderWidth: 0.5,
    justifyContent: "center",
    marginHorizontal: "10%",
  },
  searchBar: {
    marginTop: "5%",
    height: "20%",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  productsContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  productBox: {
    width: "80%",
    height: 70,
    backgroundColor: "rgb(230, 230, 230)",
    justifyContent: "left",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
  image: {
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
    height: "120%",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 13,
  },
  prodImage: {
    width: 50,
    height: 50,
  },
  textBoxWrapper: {
    padding: 10,
  },
});
