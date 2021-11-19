import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { useFirestore } from "react-redux-firebase";

const Categorias = () => {
  const [text, setText] = useState("");
  const [user, setUser] = useState();

  firebase.auth().onAuthStateChanged((user) => {
    setUser(user);
  });

  useFirestoreConnect([{ collection: "Category" }]);

  const category = useSelector(
    ({ firestore: { ordered } }) => ordered.Category
  );

  const navigation = useNavigation();
  const firestore = useFirestore();

  const AddCategory = () => {
    if (text) {
      let islike = 0;
      category.map((element) => {
        if (element.title == text) {
          console.log(element.title + "==" + text);
          islike++;
        }
      });

      if (islike == 0) {
        const newCategory = { uid: user.uid, title: text, dataMoment: [] };
        setText("");
        navigation.navigate("Momentos");
        return firestore.collection("Category").add(newCategory);
      } else {
        alert("Esta categoria ya existe");
        setText("");
      }
    }
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.nav}>
        <Nav title="Agregar Categoria" />
      </View>
      <View style={Styles.container}>
        <View>
          <Text style={Styles.textTitle}>Nueva categoria</Text>
        </View>
        <View>
          <TextInput
            style={Styles.input}
            placeholder="Escribir nueva categoria"
            onChangeText={(text) => {
              setText(text);
            }}
            value={text}
          />
        </View>
        <TouchableOpacity
          onPress={() => AddCategory()}
          style={Styles.BtnAgregar}
        >
          <Text style={{ textAlign: "center" }}>Agregar</Text>
        </TouchableOpacity>

        <Text style={Styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  nav: {
    marginBottom: 30,
    height: 60,
    width: "100%",
  },
  textTitle: {
    fontSize: 20,
    margin: 20,
  },
  BtnAgregar: {
    width: "80%",
    height: 50,
    paddingTop: 10,
    margin: 20,
    backgroundColor: "#7CDCC1",
    alignSelf: "flex-end",
    color: "white",
    borderRadius: 10,
    textAlign: "center",
  },
  input: {
    height: 40,
    padding: 10,
    margin: 20,
    width: "80%",
    height: 50,
  },
  text: {
    padding: 10,
    fontSize: 42,
  },
});

export default Categorias;
