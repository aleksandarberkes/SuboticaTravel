import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function OptionPicker() {
  return <View style={styles.picker}></View>;
}

const styles = StyleSheet.create({
  picker: {
    height: 60,
    aspectRatio: 1 / 1,
    backgroundColor: 'white',
    borderRadius: 50,
    position: 'absolute',
    right: 7,
    top: 25,
    zIndex: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  icon: {
    width: 60,
    height: 60,
  },
});
