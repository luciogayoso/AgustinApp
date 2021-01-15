import React from "react";
import { Image, Text, View } from 'react-native';

const LogoTitle = ({title}) => {
    return (
      <View style={{flex: 1, flexDirection: 'row', height: '30px', justifyContent:'space-between', backgroundColor: "#7CDCC1"}}>
      <Image
        style={{ width: 50, height: 50 }}
        source={require('../../assets/icon.png')}
      />
      <Text style={{fontSize:'25px', fontWeight: 'bold'}}>{title}</Text>
      <Image
        style={{ width: 50, height: 50 }}
        source={require('../../assets/icon.png')} 
      />
      </View>
    );
}

export default LogoTitle;