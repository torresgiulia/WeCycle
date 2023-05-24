//REACT
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import {
  NavigationContainer,
  TabActions,
  useIsFocused,
} from "@react-navigation/native";
import { useEffect, useState } from "react";

//FIREBASE
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

// ...

export default function SearchScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productRef = collection(db, "products");
    const getProducts = async () => {
      const productData = await getDocs(productRef);
      setProducts(productData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProducts();
  }, []);

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
            placeholder=" Pesquisar produtos... "
            onChangeText={(text) => {
              handleItems(text);
            }}
          />
        </View>
      </View>
      {items.map((item) => (
        <View key={item.id} style={styles.productsContainer}>
          <TouchableOpacity
            style={styles.productBox}
            onPress={() => navigation.navigate("Product", { itemId: item.id })}
          >
            <View style={styles.image} />
            <View style={styles.textBoxWrapper}>
              <Text>{item.nome}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

// ...


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
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
    height: 60,
    backgroundColor: "rgb(245, 253, 242)",
    borderRadius: 5,
    borderColor: "rgb(52, 99, 28)",
    borderWidth: 1,
    justifyContent: "center",
    marginTop: "13%",
    marginHorizontal: "10%",
  },
  searchBar: {
    backgroundColor: "rgb(84, 156, 48)",
    height: "20%",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  productsContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  productBox: {
    width: "80%",
    height: 70,
    backgroundColor: "rgb(230, 255, 230)",
    justifyContent: "left",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
  image: {
    backgroundColor: "rgb(120, 202, 78)",
    width: 50,
    height: 50,
    padding: 10,
  },
  textBoxWrapper: {
    padding: 10,
  },
});
