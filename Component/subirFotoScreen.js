import React, { useState, useCallback } from "react";
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
/* import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { useFirestore } from "react-redux-firebase"; */
import DocumentPicker from "react-native-document-picker";

const subirFoto = () => {
  const [singleFile, setSingleFile] = useState("");
  const [fileResponse, setFileResponse] = useState([]);

  const [text, setText] = useState("");
  const [user, setUser] = useState();

  firebase.auth().onAuthStateChanged((user) => {
    setUser(user);
  });

  /* useFirestoreConnect([{ collection: "Category" }]); */

  /*  const category = useSelector(
    ({ firestore: { ordered } }) => ordered.Category
  ); */

  /* const navigation = useNavigation();
  const firestore = useFirestore(); */

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        presentationStyle: "fullScreen",
      });
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const openGallery = async () => {
    let result = await DocumentPicker.pickSingle({});
    console.log(result);
    if (!result.cancelled) {
      setState({ selectedImage: result.uri, imageDetails: result });
    }
  };

  /*   const selectOneFile = async () => {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      //Printing the log realted to the file
      console.log("res : " + JSON.stringify(res));
      console.log("URI : " + res.uri);
      console.log("Type : " + res.type);
      console.log("File Name : " + res.name);
      console.log("File Size : " + res.size);
      //Setting the state to show single file attributes
      setSingleFile(res);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert("Canceled from single doc picker");
      } else {
        //For Unknown Error
        alert("Unknown Error: " + JSON.stringify(err));
        throw err;
      }
    }
  }; */

  return (
    <View style={Styles.container}>
      <View style={Styles.nav}>
        <Nav title="Subir Momento" />
      </View>
      <View style={Styles.container}>
        <View>
          <Text style={Styles.textTitle}>Seleccione archivo a subir</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={Styles.BtnAgregar}
          onPress={openGallery}
        >
          {/*Single file selection button*/}
          <Text style={{ marginRight: 10, fontSize: 19 }}>
            Click here to pick one file
          </Text>
          <Image
            source={{
              uri: "https://img.icons8.com/offices/40/000000/attach.png",
            }}
            style={Styles.imageIconStyle}
          />
        </TouchableOpacity>
        {/*Showing the data of selected Single file*/}
        <Text style={Styles.textStyle}>
          File Name: {singleFile.name ? singleFile.name : ""}
          {"\n"}
          Type: {singleFile.type ? singleFile.type : ""}
          {"\n"}
          File Size: {singleFile.size ? singleFile.size : ""}
          {"\n"}
          URI: {singleFile.uri ? singleFile.uri : ""}
          {"\n"}
        </Text>
        <View
          style={{
            backgroundColor: "grey",
            height: 2,
            margin: 10,
          }}
        />

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
  imageIconStyle: {
    height: 20,
    width: 20,
    resizeMode: "stretch",
  },
  textStyle: {
    backgroundColor: "#fff",
    fontSize: 15,
    marginTop: 16,
    color: "black",
  },
});

export default subirFoto;
