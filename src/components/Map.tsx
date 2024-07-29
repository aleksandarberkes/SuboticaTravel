import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import MapView, {Marker, Polyline} from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';

type MarkerType = {
  lat: number;
  long: number;
  title: string;
};

type MapProps = {
  bottomSheet: React.RefObject<BottomSheet>;
  setSelectedStop: React.Dispatch<React.SetStateAction<MarkerType | null>>;
};

export default function Map({bottomSheet, setSelectedStop}: MapProps) {
  const markers = [
    {lat: 46.1, long: 19.64, title: '1'},
    {lat: 46.13, long: 19.65, title: '2'},
    {lat: 46.12, long: 19.67, title: '3'},
    {lat: 46.16, long: 19.66, title: '4'},
  ];

  const route = markers.map((marker, index) => ({
    latitude: marker.lat,
    longitude: marker.long,
  }));

  const handleRoutePress = (marker: MarkerType) => {
    bottomSheet.current?.snapToIndex(1);
    setSelectedStop(marker);
  };

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 46.099777,
          longitude: 19.664681,
          latitudeDelta: 0.085,
          longitudeDelta: 0.085,
        }}>
        {markers.map((marker, index) => (
          <Marker
            title={marker.title}
            coordinate={{latitude: marker.lat, longitude: marker.long}}
            onPress={() => handleRoutePress(marker)}
          />
        ))}
        <Polyline coordinates={route} />
      </MapView>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
