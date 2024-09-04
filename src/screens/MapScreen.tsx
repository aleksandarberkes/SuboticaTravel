import {View, StyleSheet, Text, useAnimatedValue, Button} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import SearchBar from '../components/SearchBar';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import Map from '../components/Map';
import {TextInput} from 'react-native-gesture-handler';

type MarkerType = {
  stop_id: string;
  stop_name: string;
  route_ids: string[];
  geometry: {
    type: string;
    coordinates: number[];
  };
};

type LaneType = {
  type: string;
  properties: {
    route_id: string;
    route_name: string;
  };
  geometry: {
    type: string;
    coordinates: number[][][];
  };
};

export default function MapScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['10%', '50%', '80%'], []);
  const [selectedStop, setSelectedStop] = useState<MarkerType | null>(null);
  const [selectedLane, setSelectedLane] = useState<LaneType | null>(null);
  const [lastSelected, setLastSelected] = useState('');
  const [mapScrollable, setMapScrollable] = useState(true);

  //TODO: marker back handler

  const renderInfo = () => {
    if (lastSelected === 'marker' && selectedStop)
      return (
        <View>
          <Text>Stop Name: {selectedStop.stop_name}</Text>
          <Text>Stop ID: {selectedStop.stop_id}</Text>
          <Text>Route IDs: {selectedStop.route_ids.join(', ')}</Text>
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
      );
  };

  return (
    <View>
      <View style={styles.floating}>
        <SearchBar setMapScrollable={setMapScrollable} />
      </View>

      <Map
        bottomSheet={bottomSheetRef}
        setSelectedStop={setSelectedStop}
        setSelectedLane={setSelectedLane}
        setLastSelected={setLastSelected}
        mapScrollable={mapScrollable}
      />

      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
        <BottomSheetView style={styles.contentContainer}>
          {renderInfo()}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  floating: {
    flex: 1,
    alignItems: 'center',
    width: '100%',

    position: 'absolute',
    top: 30,

    zIndex: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    overflow: 'visible',
    position: 'relative',
  },
});
