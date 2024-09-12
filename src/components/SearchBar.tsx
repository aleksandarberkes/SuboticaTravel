import {View, Text, StyleSheet, TextInput, BackHandler} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchFilter from './SearchFilter';
import {MarkerType, LaneType, UnivesalSeleceted} from '../assets/types';

type SearchBarProps = {
  setMapScrollable: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItem: UnivesalSeleceted;
  setSelectedItem: React.Dispatch<React.SetStateAction<UnivesalSeleceted>>;
};

export default function SearchBar({
  setMapScrollable,
  selectedItem,
  setSelectedItem,
}: SearchBarProps) {
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

  useEffect(() => {
    if (selectedItem.selection_case === 'none') setSearch('');
  }, [selectedItem]);

  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.input}
        placeholder="Trazite stanice i linije"
        placeholderTextColor={'gray'}
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
        onFocus={() => {
          setMapScrollable(false);
          setShowAutoComplete(true);
        }}
        onBlur={() => {
          setMapScrollable(true);
          setShowAutoComplete(false);
        }}
      />
      {showAutoComplete && (
        <SearchFilter
          search={search}
          setSelectedItem={setSelectedItem}
          setSearch={setSearch}
        />
      )}
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
    color: 'gray',
  },
});
