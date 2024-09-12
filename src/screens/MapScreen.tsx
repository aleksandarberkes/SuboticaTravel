import {View, StyleSheet, Text, useAnimatedValue, Button} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import SearchBar from '../components/SearchBar';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import Map from '../components/Map';
import {UnivesalSeleceted, MarkerType, LaneType} from '../assets/types';
import BottomSheetComponent from '../components/BottomSheetComponent';
import MapLegend from '../components/MapLegend';
import OptionPicker from '../components/OptionPicker';

export default function MapScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [mapScrollable, setMapScrollable] = useState(true);

  const [selectedItem, setSelectedItem] = useState<UnivesalSeleceted>({
    selection_case: 'none',
  });

  //TODO: marker back handler

  const renderInfo = () => {
    return (
      <View>
        <Text>
          {selectedItem.marker_info !== undefined
            ? selectedItem.marker_info?.properties.stop_name
            : selectedItem.lane_info &&
              selectedItem.lane_info[0].properties.route_name}
        </Text>
      </View>
    );

    /*if (lastSelected === 'marker' && selectedStop)
      return (
        <View>
          <Text>Stop Name: {selectedItem.}</Text>
          <Text>Stop ID: {selectedStop.properties.stop_id}</Text>
          <Text>Route IDs: {selectedStop.properties.route_ids.join(', ')}</Text>
          <Text>Latitude: {selectedStop.geometry.coordinates[1]}</Text>
          <Text>Longitude: {selectedStop.geometry.coordinates[0]}</Text>
        </View>
      );
    else if (lastSelected === 'lane' && selectedLane)
      return (
        <View>
          <Text>Lane Name: {selectedLane.properties.route_name}</Text>
          <Text>Lane ID: {selectedLane.properties.route_id}</Text>
        </View>
      );*/
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

      {selectedItem.selection_case === 'none' && <MapLegend />}
      <OptionPicker />
      <Map
        bottomSheet={bottomSheetRef}
        mapScrollable={mapScrollable}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
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
    zIndex: 11,
  },
});
