import React from "react";
import { Image, Text, View, TouchableHighlight } from 'react-native';

const NavFooter = ({ navigation }) => {

console.dir(navigation);

    return (
      <View style={{flex: 1,
      flexDirection: 'row',
      justifyContent:'center',
      position:'fixed',
      left:'0px',
      bottom:'0px',
      height:'70px',
      width:'100%',
      background:'#7CDCC1',}}>
        <TouchableHighlight style={{flex: 1,
          flexDirection: 'column',
          justifyContent:'center',
          alignItems: 'center'}}
        onPress={() => navigation.navigate('TomarMomentos')}>
        <View>
          <Image
            style={{ width: 30,
            height: 30,
            marginTop: 10 }}
            source={require('../../assets/captura.png')}
            />
          <Text>Capturar</Text>
        </View>
        </TouchableHighlight>
        <TouchableHighlight 
        onPress={() => navigation.navigate('TomarMomentos')}
        style={{flex: 1,
          flexDirection: 'column',
          justifyContent:'center',
          alignItems: 'center'}}>
        <View>
            <Image
            style={{ width: 30,
            height: 30,
            marginTop: 10 }}
            source={require('../../assets/libro.png')} 
          />
          <Text>Historial</Text>
        </View>
        </TouchableHighlight>
      </View>
    );
}

export default NavFooter;