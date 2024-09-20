import {View, StyleSheet, Text, useAnimatedValue, Button} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import SearchBar from '../components/SearchBar';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import Map from '../components/Map';
import {UnivesalSeleceted, MarkerType, LaneType} from '../assets/types';
import BottomSheetComponent from '../components/BottomSheetComponent';
import MapLegend from '../components/MapLegend';
import OptionPicker from '../components/OptionPicker';
import MapView from 'react-native-maps';

export default function MapScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [mapScrollable, setMapScrollable] = useState(true);
  const [currentLocation, setCurrentLocation] = useState([
    46.099777, 19.664681,
  ]);

  const [selectedItem, setSelectedItem] = useState<UnivesalSeleceted>({
    selection_case: 'none',
  });

  const mapRef = useRef<MapView | null>(null);
  const goToLocation = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: currentLocation[0],
        longitude: currentLocation[1],
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  return (
    <View>
      <View style={styles.floating}>
        <SearchBar
          setMapScrollable={setMapScrollable}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </View>

      <MapLegend />
      <OptionPicker
        setLocation={setCurrentLocation}
        goToLocation={goToLocation}
      />
      <Map
        bottomSheet={bottomSheetRef}
        mapScrollable={mapScrollable}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        location={currentLocation}
        mapRef={mapRef}
      />

      <BottomSheetComponent
        bottomSheetRef={bottomSheetRef}
        selectedItem={selectedItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  floating: {
    flex: 1,
    alignItems: 'center',
    width: '85%',
    position: 'absolute',
    top: 30,
    zIndex: 1,
  },
});
