import { Text, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {doc,db , updateDoc, deleteDoc} from "../app/services/firebaseConfig";

export default function LojaItem({ title, isChecked, id, getItem()}) {
  const [isCheckedItem, setIsCheckedItem] = useState(isChecked);

  const updateIsChecked = async () => {
    try {
      const docRef = doc(db, "produtos", id);
      await updateDoc(docRef, {
        isChecked: isCheckedItem,
      });
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }


  const deleteItem = async()=>{
    await deleteDoc(doc(db, "produtos", id));
    getItem()
  }


  useEffect(() => {
    updateIsChecked();
  }, [isCheckedItem]);

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      backgroundColor: "#afb2b4",
      padding: 10,
      alignItems: "center",
      width: "90%",
      alignSelf: "center",
      borderRadius: 10,
    },
    txt: {
      flex: 1,
      marginLeft: 10,
      fontWeight: "400",
      fontSize: 20,
    },
  });
  
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Pressable onPress={() => {
          setIsCheckedItem(!isCheckedItem)
          }}>
          {isCheckedItem ? (
            <AntDesign name="checkcircle" size={24} color="green" />
          ) : (
            <AntDesign name="checkcircleo" size={24} color="black" />
          )}
        </Pressable>

        <Text style={styles.txt}>{title}</Text>
        <AntDesign name="delete" size={24} color="black" onPress={deleteItem} />
      </View>
    </SafeAreaView>
  );

  
}

