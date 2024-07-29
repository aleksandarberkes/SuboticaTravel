import {View, StyleSheet, Text, useAnimatedValue, Button} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import SearchBar from '../components/SearchBar';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import Map from '../components/Map';
import RNFS from 'react-native-fs';
import * as data from '../data/subotica-gtfs-stops-tac.geojson';

type MarkerType = {
  lat: number;
  long: number;
  title: string;
};

export default function MapScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['10%', '50%', '80%'], []);
  const [selectedStop, setSelectedStop] = useState<MarkerType | null>(null);

  useEffect(() => {
    const getData = async () => {
      // const filePath =
      //   RNFS.DocumentDirectoryPath + 'src/data/subotica-gtfs-stops-tac.geojson';
      console.log(data);
    };
    getData();
  }, []);

  return (
    <View>
      <View style={styles.floating}>
        <SearchBar />
      </View>

      <Map bottomSheet={bottomSheetRef} setSelectedStop={setSelectedStop} />

      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
        <BottomSheetView style={styles.contentContainer}>
          {selectedStop && <Text>{selectedStop.title}</Text>}
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
