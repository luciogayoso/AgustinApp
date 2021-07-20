import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import Nav from "./Nav.js";

const Momentos = () => {
  useFirestoreConnect([{ collection: "Category" }]);

  const category = useSelector(
    ({ firestore: { ordered } }) => ordered.Category
  );

  return (
    <View style={style.conteiner}>
      <View style={{ marginBottom: 30, height: 60 }}>
        <Nav title="Momentos" />
      </View>

      <Text style={style.txtTitle}>Selecciona tus Momentos</Text>
      <FlatList
        ItemSeparatorComponent={
          "android" &&
          (({ highlighted }) => (
            <View style={[style.separator, highlighted && { marginLeft: 0 }]} />
          ))
        }
        contentContainerStyle={{
          height: 450,
        }}
        data={category}
        renderItem={({ item }) => (
          <TouchableHighlight
            key={item.id}
            onPress={() => alert("Soy un boton")}
          >
            <View style={style.viewList}>
              <Text style={style.txt}>{item.title}</Text>
            </View>
          </TouchableHighlight>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  separator: {
    margin: 5,
  },
  txt: {
    fontSize: 15,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: "center",
  },
  txtTitle: {
    fontSize: 20,
    margin: 20,
  },
  viewList: {
    backgroundColor: "#7CDCC1",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 30,
    textAlign: "center",
    marginLeft: 10,
    marginRight: 10,
  },
});

export default Momentos;
