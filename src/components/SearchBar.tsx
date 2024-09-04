import {View, Text, StyleSheet, TextInput, BackHandler} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchFilter from './SearchFilter';
import {ServerContainerRef} from '@react-navigation/native';

type SearchBarProps = {
  setMapScrollable: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchBar({setMapScrollable}: SearchBarProps) {
  const [search, setSearch] = useState('');
  const [showAutoComplete, setShowAutoComplete] = useState(false);

  useEffect(() => {
    const onBackPress = () => {
      if (showAutoComplete === true) {
        setMapScrollable(true);
        setShowAutoComplete(false);
        return true;
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [showAutoComplete]);

  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.input}
        placeholder="Trazite stanice i linije"
        value={search}
        onChangeText={text => {
          if (text === '') {
            setMapScrollable(true);
            setShowAutoComplete(false);
          } else {
            setMapScrollable(false);
            setShowAutoComplete(true);
          }

          setSearch(text);
        }}
        clearButtonMode="always"
        onBlur={() => {
          setMapScrollable(true);
          setShowAutoComplete(false);
        }}
      />
      {showAutoComplete && <SearchFilter search={search} />}
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
    position: 'relative',
  },
  searchAutoComplete: {
    backgroundColor: 'red',
    height: 300,
    width: '100%',
    position: 'absolute',
    top: 50,
  },
  searchIcon: {},
  input: {
    flex: 1,
  },
});
