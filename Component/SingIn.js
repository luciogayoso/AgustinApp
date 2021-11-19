import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import Nav from "./Nav.js";
import Icon from "react-native-vector-icons/AntDesign";
import SingUp from "./SingUp";

const Momentos = () => {
  const [Email, onChangeEmail] = useState();
  const [Clave, onChangeClave] = useState();
  const [Error, setError] = useState();
  const [registro, setRegistro] = useState(false);

  const SingIn = () => {
    if (Email !== undefined && Clave !== undefined) {
      if (Clave.length > 6) {
        alert("La clave debe tener mas de 6 caracteres");
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log("usuraio logeado");
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

  const SingInGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /**  */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  const SingInFacebok = () => {
    var provider = new firebase.auth.FacebookAuthProvider();

    provider.setCustomParameters({
      display: "popup",
    });

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** */
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;
        console.log("funciono");
        console.log(user);

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        // ...
      });
  };

  const cerrarRegistro = (apagar) => {
    setRegistro(apagar);
  };

  return (
    <View style={style.conteiner}>
      <View style={{ marginn: 30, height: 60 }}>
        <Nav title="Momentos" />
      </View>
      {registro ? (
        <SingUp evento={cerrarRegistro} />
      ) : (
        <View style={style.registro}>
          <Text style={style.textRegistro}>Iniciar Sesion</Text>
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

          <TouchableOpacity
            onPress={() => SingIn()}
            style={{
              width: "80%",
              height: 40,
              paddingTop: 10,
              margin: 20,
              backgroundColor: "#7CDCC1",
              alignSelf: "flex-end",
              color: "white",
              borderRadius: 10,
            }}
          >
            <Text>Iniciar Sesion</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => SingInGoogle()}
            style={{
              width: "80%",
              height: 40,
              paddingTop: 10,
              margin: 20,
              backgroundColor: "#7CDCC1",
              alignSelf: "flex-end",
              color: "white",
              borderRadius: 10,
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Icon name="google" color="white" size={24} />
            <Text>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => SingInFacebok()}
            style={{
              width: "80%",
              height: 40,
              paddingTop: 10,
              margin: 20,
              backgroundColor: "#7CDCC1",
              alignSelf: "flex-end",
              color: "white",
              borderRadius: 10,
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Icon name="facebook-square" color="white" size={24} />
            <Text>Facebok</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setRegistro(true)}
            style={{
              width: 100,
              height: 40,
              paddingTop: 10,
              margin: 20,
            }}
          >
            <Text style={{ color: "blue" }}>Crear cuenta</Text>
          </TouchableOpacity>

          <Text>{Error}</Text>
        </View>
      )}
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
