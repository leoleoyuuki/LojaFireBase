import {
  Image,
  StyleSheet,
  Platform,
  Text,
  View,
  TextInput,
  Button
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
} from "../services/firebaseConfig";
import { useState } from "react";
import { getDocs } from "firebase/firestore";

export default function HomeScreen() {
  const [title, setTitle] = useState("");

  const addItem = async () => {
    try {
      const docRef = await addDoc(collection(db, "produtos"), {
        title: title,
        isChecked: false,
      });
      console.log("Document written with ID: ", docRef.id);
      alert("Produto Cadastrado");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getItem = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      console.log(doc)
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Lista de Produtos</Text>
        <Text style={styles.numItem}>3</Text>
        <AntDesign name="delete" size={24} color={"#000"} />
      </View>
      <LojaItem />
      <LojaItem />
      <LojaItem />
      <TextInput
        placeholder="Digite o nome do produto"
        style={styles.input}
        value={title}
        onChangeText={(value) => setTitle(value)}
        onSubmitEditing={addItem}
      />
      <Button title="get" onPress={getItem}/>
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
