import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Nav from './Nav';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Camera } from 'expo-camera';

const Takephoto = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    const cam = useRef();

    const _takePicture = async () => {
      if (cam.current) {
        const option = {quality: 0.5, base64: true, skipProcessing: false};

        const picture = await cam.current.takePictureAsync(option);

        console.log(cam.current.getSupportedRatiosAsync());
        const source = picture.uri;

        if (source) {
          cam.current.resumePreview();

          console.log("Picture source ", source);
        }
      }else {
        console.log(cam);
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
              onPress={() => _takePicture}>
              <Icon name="camera" color="#7CDCC1" size={60} />
            </TouchableOpacity>
            </View>

            <View style={styles.buttonTake}>
            
            </View>

          </View>
        </Camera>
      </View>
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
  });

export default Takephoto;