import React from "react";
import { Image, Text, View } from 'react-native';

const Nav = ({title}) => {
    return (
      <View style={{flex: 1, flexDirection: 'row', height: 100, justifyContent:'space-between', backgroundColor: "#7CDCC1"}}>
      <Image
        style={{ width: 50, height: 50 }}
        source={require('../assets/icon.png')}
      />
      <Text style={{fontSize:20, fontWeight: 'bold'}}>{title}</Text>
      <Image
        style={{ width: 50, height: 50 }}
        source={require('../assets/icon.png')} 
      />
      </View>
    );
}

export default Nav;