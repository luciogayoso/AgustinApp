import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

const Momentos = ({ evento }) => {
  const [Email, onChangeEmail] = useState();
  const [Clave, onChangeClave] = useState();
  const [Error, setError] = useState();

  const SingUp = () => {
    if (
      Email !== undefined &&
      Clave !== undefined &&
      Nombre !== undefined &&
      Telefono !== undefined
    ) {
      if (Clave.length > 6) {
        alert("La clave debe tener mas de 6 caracteres");
        firebase
          .auth()
          .createUserWithEmailAndPassword(Email, Clave)
          .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(user);
            // ...
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            // ..
          });
      }
    } else {
      setError("No puede dejar ningun campo vacio");
      console.log("funciona");
    }
  };

  return (
    <View style={style.conteiner}>
      <View style={style.registro}>
        <Text style={style.textRegistro}>Registrese</Text>
        <TextInput
          style={style.input}
          onChangeText={(Ema) => onChangeEmail(Ema)}
          textContentType="emailAddress"
          placeholder="Escriba una Email"
        />
        <TextInput
          style={style.input}
          onChangeText={(cla) => onChangeClave(cla)}
          textContentType="password"
          placeholder="Escriba una Clave"
        />
        <View style={{ flex: 1, flexDirection: "row-reverse" }}>
          <TouchableOpacity
            onPress={() => SingUp()}
            style={{
              width: 100,
              height: 40,
              paddingTop: 10,
              margin: 20,
              backgroundColor: "#7CDCC1",
              color: "white",
              borderRadius: 10,
            }}
          >
            <Text>Registrarse</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => evento(false)}
            style={{
              width: 100,
              height: 40,
              paddingTop: 10,
              margin: 20,
              color: "black",
            }}
          >
            <Text>Atras</Text>
          </TouchableOpacity>
        </View>

        <Text>{Error}</Text>
      </View>
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
  input: {
    width: "80%",
    height: 40,
    paddingLeft: 10,
    alignSelf: "center",
    marginTop: 20,
  },
  registro: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
  },
  textRegistro: {
    marginTop: 10,
    fontSize: 20,
  },
});

export default Momentos;
