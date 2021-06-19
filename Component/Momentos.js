import React,{useState, useEffect} from "react";
import {Text, View, StyleSheet, FlatList, TouchableHighlight} from 'react-native';
import Nav from "./Nav";

const Momentos = () => {

  const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      width: '80%',
      },
      separator: {
        margin: "5px",
      },
      txt: {
        fontSize: "25px",
        paddingTop: '20px',
      },
      txtTitle: {
        fontSize: "25px",
        margin: '20px',
      },
      viewList: {
        backgroundColor: '#7CDCC1', 
        height: '70px',
        border: '1px solid black',
        borderRadius: 30,
        textAlign: 'center',
        marginLeft: '10px',
        marginRight: '10px',
      },
  });
  return (
    <View style={style.conteiner}>
      <Nav title='Momentos'/>
  <Text style={style.txtTitle}>Selecciona tus Momentos</Text>
  <FlatList
  ItemSeparatorComponent={
    'android' &&
    (({ highlighted }) => (
      <View
        style={[
          style.separator,
          highlighted && { marginLeft: 0 }
        ]}
      />
    ))
  }
  data={[{ title: 'Mi primer dia', key: 'item1' },{ title: 'Dias con papas', key: 'item1' },{ title: 'Mi primer mes', key: 'item1' },{ title: 'Los mejores Momentos', key: 'item1' },{ title: 'Mi primer año', key: 'item1' }]}
  renderItem={({ item, index, separators }) => (
    <TouchableHighlight
      key={item.key}
      onPress={() => this._onPress(item)}
      onShowUnderlay={separators.highlight}
      onHideUnderlay={separators.unhighlight}>
      <View style={style.viewList}>
        <Text style={style.txt}>{item.title}</Text>
      </View>
    </TouchableHighlight>
  )}
/>
</View>
  )
};

export default Momentos;
