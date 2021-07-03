import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, TouchableHighlight } from 'react-native';
import Nav from "./Nav.js";

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
      margin: 5,
    },
    txt: {
      fontSize: 15,
      paddingTop: 20,
      textAlign: 'center',
    },
    txtTitle: {
      fontSize: 20,
      margin: 20,
    },
    viewList: {
      backgroundColor: '#7CDCC1',
      height: 70,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 30,
      textAlign: 'center',
      marginLeft: 10,
      marginRight: 10,
    },
  });
  return (
    <View style={style.conteiner}>
      <View style={{ marginn: 30, height: 60, marginTop: 30 }}>
        <Nav title='Momentos' />
      </View>
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
        data={[{ title: 'Mi primer dia', key: 'item1' }, { title: 'Dias con papas', key: 'item2' }, { title: 'Mi primer mes', key: 'item3' }, { title: 'Los mejores Momentos', key: 'item4' }, { title: 'Mi primer año', key: 'item5' }]}
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
