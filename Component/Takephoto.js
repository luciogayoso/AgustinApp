import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  Picker,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  TouchableHighlight,
} from "react-native";
import firebase from "./firebaseconfig/Firebase";
import "firebase/auth";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import Nav from "./Nav";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Camera } from "expo-camera";
import { useFirestore } from "react-redux-firebase";

const Takephoto = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [uri, setUri] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const [text, onChangeText] = useState();

  //firebase.auth().onAuthStateChanged((user) => {});

  useFirestoreConnect([{ collection: "Category" }]);

  const category = useSelector(
    ({ firestore: { ordered } }) => ordered.Category
  );

  const firestore = useFirestore();

  const cam = useRef();

  const _takePicture = async () => {
    if (cam.current) {
      const option = { quality: 0.5, base64: true, skipProcessing: true };
      const picture = await cam.current.takePictureAsync(option);
      console.dir(picture);
      const source = picture.uri;
      setUri(source);
      if (source) {
        cam.current.resumePreview();
      }
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const addMoment = () => {
    alert("funciono");
  };

  return (
    <>
      <View style={{ height: 60 }}>
        <Nav title="Capturar Momento" />
      </View>
      {modalVisible ? (
        <SafeAreaView style={styles.centeredView}>
          <ScrollView style={styles.scrollView}>
            <Text
              style={{ fontSize: 18, marginBottom: 20, textAlign: "center" }}
            >
              Seleccione un tipo de momento
            </Text>
            <Picker
              selectedValue={selectedValue}
              style={styles.Picker}
              enabled={true}
              prompt="Selecciona el tipo de momentos"
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }
            >
              {category.map((item) => {
                return (
                  <Picker.Item
                    label={item.title}
                    value={item.title}
                    key={item.id}
                  />
                );
              })}
            </Picker>
            <Image style={styles.image} source={{ uri }} />
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="Escriba una descripcion"
            />
            <View style={styles.buttonSave}>
              <TouchableHighlight
                style={styles.closeButton}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Icon name="delete" color="#848484" size={40} />
              </TouchableHighlight>
              <Button
                onPress={() => addMoment()}
                title="Guardar"
                color="#4489EB"
                accessibilityLabel="Guardar el momento capturado"
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <View style={styles.container}>
          <Camera ref={cam} style={styles.camera} type={type}>
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                  }}
                >
                  <Icon name="rotate-left" color="white" size={50} />
                </TouchableOpacity>
              </View>

              <View style={styles.buttonTake}>
                <TouchableOpacity onPress={() => _takePicture()}>
                  <Icon name="camera" color="#7CDCC1" size={80} />
                </TouchableOpacity>
              </View>

              <View style={styles.buttonTakePhoto}>
                {uri ? (
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(true);
                    }}
                  >
                    <Image
                      style={{ width: 100, height: 100 }}
                      source={{ uri: uri }}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </Camera>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    margin: 20,
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "flex-start",
  },
  buttonTake: {
    alignSelf: "flex-end",
    alignItems: "center",
  },
  buttonTakePhoto: {
    alignSelf: "flex-end",
    alignItems: "center",
    width: 70,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  centeredView: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: 10,
  },
  closeButton: {
    width: 40,
    height: 40,
    marginRight: 30,
    alignSelf: "flex-end",
    alignItems: "flex-start",
  },
  image: {
    width: "100%",
    height: 500,
    alignSelf: "center",
  },
  Picker: {
    width: "80%",
    height: 40,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "black",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    paddingLeft: 10,
    alignSelf: "center",
    marginTop: 20,
  },
  buttonSave: {
    display: "flex",
    flexDirection: "row",
    width: 200,
    height: 40,
    paddingLeft: 10,
    alignSelf: "flex-end",
    margin: 20,
  },
  modalView: {
    width: "100%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Takephoto;
