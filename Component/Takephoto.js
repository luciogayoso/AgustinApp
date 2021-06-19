import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Button, TextInput, Picker, Text, View, TouchableOpacity, Image, Modal, TouchableHighlight } from 'react-native';
import Nav from './Nav';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Camera } from 'expo-camera';

const Takephoto = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [uri, setUri] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState();
    const [text, onChangeText] = useState();

    const cam = useRef();

    const _takePicture = async () => {
      if (cam.current) {
        const option = {quality: 0.5, base64: true, skipProcessing: true};
        const picture = await cam.current.takePictureAsync(option);
        const source = picture.uri;
        setUri(source);
        if (source) {
         cam.current.resumePreview();
        }
      }
    }
  
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <>
      <View>
        <Nav title='Capturar Momento'/>
      </View>
      {modalVisible?
      <View style={styles.centeredView}>
        <View>
      
        <TouchableHighlight
            style={styles.closeButton}
            onPress={() => {
              setModalVisible(false);
            }}>
            <Icon name="close" color="#7CDCC1" size={40} />
          </TouchableHighlight>
          </View>
          
          <Picker
           selectedValue={selectedValue}
           style={styles.Picker}
           onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="Mi primer dia" value="Mi primer dia" />
            <Picker.Item label="Dias con mis papis" value="Dias con mis papis" />
            <Picker.Item label="Mi primer mes" value="Mi primer mes" />
            <Picker.Item label="Los mejores Momentos" value="Los mejores Momentos" />
            <Picker.Item label="Mi primer año" value="Mi primer año" />
         </Picker>
          <Image
          style={styles.image} 
          source={{uri}}
          />
          <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Escriba una descripcion"
          />
          <View style={styles.buttonSave}>
          <Button
          onPress={() => alert('funciono')}
          title="Guardar"
          color="#4489EB"
          accessibilityLabel="Guardar el momento capturado"
          />
          </View>
        </View>
    :
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
              }}>
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>
          </View>

            <View style={styles.buttonTake}>
            <TouchableOpacity
              onPress={() => _takePicture()}>
              <Icon name="camera" color="#7CDCC1" size={60} />
            </TouchableOpacity>
            </View>

            <View style={styles.buttonTake}>
              {
              uri?
              <TouchableOpacity 
              onPress={() =>{
               setModalVisible(true);}}>
                <Image
                style={{width:'40px',height:'40px'}} 
                source={{uri:uri}}
                />
              </TouchableOpacity >
              :null
              }
            </View>

          </View>
        </Camera>
      </View>
    }
      </>
    )
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
      flexDirection: 'row',
      margin: 20,
    },
    button: {
      flex: 0.1,
      alignSelf: 'flex-end',
      alignItems: 'flex-start',
    },
    buttonTake: {
      flex: 0.1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
    centeredView: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-around",
      marginTop: 22
    },
    closeButton:{
      backgroundColor: 'red',
      width:'40px',
      height: '40px',
      alignSelf: 'flex-end',
      alignItems: 'flex-start',
    },
    image:{
      width:'80%',
      height:'300px',
      alignSelf: 'center',
    },
    Picker:{
      width:'80%',
      height:'40px',
      alignSelf: 'center',
    },
    input:{
      width:'80%',
      height:'40px',
      paddingLeft: '10px',
      alignSelf: 'center',
    },
    buttonSave:{
      width:'100px',
      height:'40px',
      paddingLeft: '10px',
      alignSelf: 'flex-end',
      margin: '20px',
    },
    modalView: {
      width:'100%',
      margin: '20px',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });

export default Takephoto;