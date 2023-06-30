//NAVIGATION
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//REACT
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Linking,
} from "react-native";
import { useEffect, useState, Component } from "react";

//FIREBASE
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { async } from "@firebase/util";

export default function ProductScreen({ route, navigation }) {
  //Id(barcode) do produto
  const itemId = route.params;
  const prodId = JSON.stringify(itemId).replace(/\D/g, "");

  //Product
  const productRef = collection(db, "products");
  const [products, setProducts] = useState([]);
  const [productAttributes, setProductAttributes] = useState([]);

  //Composition
  const compositionRef = collection(db, "composition");
  const [materialComposition, setMaterialComposition] = useState([]);

  //Parts of product
  const [productPart, setProductPart] = useState([]);
  const [productMaterial, setProductMaterial] = useState([]);

  //Container(lixo)
  const containerRef = collection(db, "container");
  const [materialContainer, setMaterialContainer] = useState([]);
  const [productContainer, setProductContainer] = useState([]);

  //Use hook and store products
  useEffect(() => {
    getProduct();
    getComposition();
    getContainer();
  }, []);

  const getProduct = async () => {
    //product
    const productData = await getDocs(productRef);
    setProducts(productData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const getComposition = async () => {
    //composition
    const compositionData = await getDocs(compositionRef);
    setMaterialComposition(
      compositionData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };
  const getContainer = async () => {
    //container
    const containerData = await getDocs(containerRef);
    setMaterialContainer(
      containerData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  //Hook after object render and specify product
  useEffect(() => {
    products.forEach((product) => {
      //Código de barras = código lido
      if (product.id == prodId) {
        setProductAttributes(product);
        materialComposition.forEach((composition) => {
          //encontrar composição do produto
          if (composition.codigo_barras == prodId) {
            setProductMaterial((oldArray) => [
              ...oldArray,
              composition.material + ", ",
            ]);
            setProductPart((oldArray) => [
              ...oldArray,
              composition.parte + ", ",
            ]);

            // //Dividir nos lixos
            if (product.separar == false) {
              materialContainer.forEach((container) => {
                if (container.material == product.material_principal) {
                  setProductContainer(
                    container.cor + " (" + container.material + ")"
                  );
                }
              });
            } else {
              materialContainer.forEach((container) => {
                if (container.material == composition.material) {
                  setProductContainer((oldArray) => [
                    ...oldArray,
                    container.cor + " (" + container.material + "), ",
                  ]);
                }
              });
            }
          }
        });
      }
    });
  }, [products, materialComposition, materialContainer]);

  const handleLink = async (url) => {
    await Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{ uri: productAttributes.img }}
          style={styles.img}
        ></Image>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.headText}>Nome</Text>
            <Text style={styles.infoText}>
              {productAttributes
                ? JSON.stringify(productAttributes.nome)
                : "A carregar"}
            </Text>
          </View>
          <View>
            <Text style={styles.headText}>Instruções de descarte</Text>
            <Text style={styles.infoText}>{productAttributes.instrucoes}</Text>
          </View>
          <TouchableOpacity onPress={() => handleLink(productAttributes.link)}>
            <Text style={styles.headText}>Link para mais informações</Text>
            <Text style={styles.infoTextLink}>
              {productAttributes.link
                ? JSON.stringify(productAttributes.link)
                : "link não disponível"}
            </Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.headText}>Fabricante</Text>
            <Text style={styles.infoText}>{productAttributes.fabricante}</Text>
          </View>
          <View>
            <Text style={styles.headText}>Material</Text>
            <Text style={styles.infoText}>{productMaterial}</Text>
          </View>
          <View>
            <Text style={styles.headText}>Parte</Text>
            <Text style={styles.infoText}>{productPart}</Text>
          </View>
          <View>
            <Text style={styles.headText}>Lixo</Text>
            <Text style={styles.infoText}>{productContainer}</Text>
          </View>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnVoltar}>
          <Text
            style={styles.btnVoltarText}
            onPress={() => navigation.navigate("Barcode")}
          >
            Voltar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: "10%",
    left: "10%",
    bottom: "25%",
    height: "60%",
    width: "80%",
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
  img: {
    marginVertical: "5%",
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  textContainer: {
    padding: "5%",
  },
  headText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  infoText: {
    marginBottom: "1%",
  },
  infoTextLink: {
    marginBottom: "1%",
    color: "blue",
  },
  btnVoltar: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 15,
  },
  btnVoltarText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  btnContainer: {
    margin: 10,
    backgroundColor: "rgb(99, 169, 61)",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "20%",
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});
