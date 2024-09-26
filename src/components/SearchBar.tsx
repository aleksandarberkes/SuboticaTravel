import {
  View,
  Text,
  StyleSheet,
  TextInput,
  BackHandler,
  Image,
  Touchable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchFilter from './SearchFilter';
import {MarkerType, LaneType, UnivesalSeleceted} from '../assets/types';
import {markersGeoJSON} from '../data/data';
import {getMarkerLanes} from '../functions/getMarkerLanes';
import {TouchableOpacity} from 'react-native-gesture-handler';

type SearchBarProps = {
  setMapScrollable: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItem: UnivesalSeleceted;
  setSelectedItem: React.Dispatch<React.SetStateAction<UnivesalSeleceted>>;
  goToLocation: (lat: number, lng: number) => void;
};

export default function SearchBar({
  setMapScrollable,
  selectedItem,
  setSelectedItem,
  goToLocation,
}: SearchBarProps) {
  const [search, setSearch] = useState('');
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [showClear, setShowClear] = useState(false);

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

  const handleSubmit = (text: string) => {
    markersGeoJSON.features.forEach(element => {
      if (text === element.properties.stop_name) {
        setSelectedItem({
          selection_case: 'filter-marker',
          lane_info: getMarkerLanes(element),
          marker_info: element,
        });
        goToLocation(
          element.geometry.coordinates[1],
          element.geometry.coordinates[0],
        );
      }
    });
  };

  return (
    <View style={styles.searchBar}>
      <Image
        source={require('../assets/images/search.png')}
        style={[
          styles.searchIcon,
          {
            marginLeft: 10,
            marginRight: 5,
          },
        ]}
      />
      <TextInput
        style={styles.input}
        placeholder="Trazite stanice i linije"
        placeholderTextColor={'gray'}
        value={search}
        onChangeText={text => {
          if (text === '') {
            setMapScrollable(true);
            setShowAutoComplete(false);
            setShowClear(false);
          } else {
            setMapScrollable(false);
            setShowAutoComplete(true);
            setShowClear(true);
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
        onSubmitEditing={() => {
          handleSubmit(search);
        }}
      />
      {showClear && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setSearch('');
            setShowClear(false);
          }}>
          <Image
            source={require('../assets/images/cancel.png')}
            style={[
              styles.searchIcon,
              {
                marginLeft: 5,
                marginRight: 10,
              },
            ]}
          />
        </TouchableOpacity>
      )}
      {showAutoComplete && (
        <SearchFilter
          search={search}
          setSelectedItem={setSelectedItem}
          setSearch={setSearch}
          goToLocation={goToLocation}
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
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'lightgray',
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
  },
  searchAutoComplete: {
    backgroundColor: 'red',
    height: 300,
    width: '100%',
    position: 'absolute',
    top: 50,
  },
  searchIcon: {
    height: 25,
    width: 25,
  },
  input: {
    flex: 1,
    color: 'gray',
    borderRadius: 30,
  },
});
