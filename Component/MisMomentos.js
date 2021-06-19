import React,{useState} from "react";
import { Image, Text, View, TextInput } from 'react-native';
import Nav from './Nav';

const MisMomentos = () => {
  const [text, setText] = useState('');
    return (
      <>
      <View>
        <Nav title='Mi Momentos' />
      </View>
      <View style={{flex: 1, flexDirection: 'column', justifyContent:'space-between'}}>
      <TextInput
        style={{height: 40,padding: 10, margin: 20}}
        placeholder="Descrie tu momento!"
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      <Text style={{padding: 10, fontSize: 42}}>
        {text}
      </Text>
      </View>
      </>
    );
}

export default MisMomentos;