import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';

export default function SearchBar() {
  return (
    <View style={styles.searchBar}>
      <TextInput style={styles.input} placeholder="Trazite stanice i linije" />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    flexDirection: 'row',
  },
  searchIcon: {},
  input: {
    flex: 1,
  },
});
