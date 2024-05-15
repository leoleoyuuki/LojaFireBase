import {
  Image,
  StyleSheet,
  Platform,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator
} from "react-native";
import LojaItem from "@/components/LojaItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import {
  app,
  db,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  
} from "../services/firebaseConfig";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const [title, setTitle] = useState("");
  const [produtosList, setProdutosList] = useState([]);

  const addItem = async () => {
    try {
      const docRef = await addDoc(collection(db, "produtos"), {
        title: title,
        isChecked: false,
      });
      console.log("Document written with ID: ", docRef.id);
      alert("Produto Cadastrado");
      getItem()
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getItem = async () => {
    let d = [];
    const querySnapshot = await getDocs(collection(db, "produtos"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
      const produtos = {
        id: doc.id,
        title: doc.data().title,
        isChecked: doc.data().isChecked,
      };
      d.push(produtos);
    });
    setProdutosList(d);
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Lista de Produtos</Text>
        <Text style={styles.numItem}>3</Text>
        <AntDesign name="delete" size={24} color={"#000"} />
      </View>

      {produtosList.length > 0 ? (
        <FlatList
          data={produtosList}
          renderItem={({ item }) => {
            return (
              <View>
                <LojaItem title={item.title} isChecked={item.isChecked} getItem={getItem}  id={item.id} />
              </View>
            );
          }}
        />
      ) : <ActivityIndicator style={{marginTop: 150}} size="large" color="#2a78b0" /> }

      <TextInput
        placeholder="Digite o nome do produto"
        style={styles.input}
        value={title}
        onChangeText={(value) => setTitle(value)}
        onSubmitEditing={addItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#7438a5",
    flexDirection: "row",
    width: "95%",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    alignItems: "center",
  },
  heading: {
    flex: 1,
    fontSize: 20,
  },
  numItem: {
    fontSize: 20,
    marginRight: 10,
  },
  input: {
    backgroundColor: "#d9d9d9",
    padding: 10,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: "auto",
    marginBottom: 10,
  },
});
