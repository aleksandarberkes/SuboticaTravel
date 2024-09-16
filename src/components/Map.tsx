import {View, Text, StyleSheet, BackHandler} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker, Polyline} from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import mapStyle from '../assets/mapStyle.json';
import {markersGeoJSON, linesGeoJSON} from '../data/data';
import {UnivesalSeleceted, MarkerType, LaneType} from '../assets/types';

type MapProps = {
  bottomSheet: React.RefObject<BottomSheet>;
  mapScrollable: boolean;
  selectedItem: UnivesalSeleceted;
  setSelectedItem: React.Dispatch<React.SetStateAction<UnivesalSeleceted>>;
};

export default function Map({
  bottomSheet,
  mapScrollable,
  selectedItem,
  setSelectedItem,
}: MapProps) {
  //geting the particular lanes color
  const getLaneColor = (lane: string) => {
    switch (lane) {
      case '1A':
        return 'gray';
      case '2':
        return 'darkred';
      case '3':
        return 'blue';
      case '4':
        return 'yellow';
      case '6':
        return 'green';
      case '7':
        return 'black';
      case '8':
        return 'burlywood';
      case '8A':
        return 'pink';
      case '9':
        return 'darkcyan';
      case '10':
        return 'darkslateblue';
      case '16':
        return 'darkgoldenrod';
      default:
        return 'black';
    }
  };

  //back button behavior when selected lane
  useEffect(() => {
    const onBackPress = () => {
      if (selectedItem.selection_case !== 'none') {
        bottomSheet.current?.collapse();
        setSelectedItem({
          selection_case: 'none',
          lane_info: undefined,
          marker_info: undefined,
        });
        return true;
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [selectedItem]);

  const handleStopPress = (lane: LaneType, marker: MarkerType) => {
    bottomSheet.current?.snapToIndex(1);
    if (selectedItem.selection_case !== 'filter-marker')
      setSelectedItem({
        selection_case: 'map-marker',
        lane_info: [lane],
        marker_info: marker,
      });
  };

  const handleLanePress = (lane: LaneType) => {
    bottomSheet.current?.snapToIndex(1);
    setSelectedItem({selection_case: 'map-lane', lane_info: [lane]});
  };

  const renderMarkers = (feature: LaneType) => {
    if (
      selectedItem.selection_case === 'map-lane' ||
      selectedItem.selection_case === 'map-marker' ||
      selectedItem.selection_case === 'filter-lane'
    ) {
      return markersGeoJSON.features.map((markerFeature, index) => {
        if (
          selectedItem.selection_case !== 'none' &&
          markerFeature.properties.route_ids.includes(
            feature.properties.route_id,
          )
        ) {
          return (
            <Marker
              pinColor={getLaneColor(feature.properties.route_id)}
              key={index}
              coordinate={{
                latitude: markerFeature.geometry.coordinates[1],
                longitude: markerFeature.geometry.coordinates[0],
              }}
              title={markerFeature.properties.stop_name}
              description={`Routes: ${markerFeature.properties.route_ids}`}
              onPress={() => handleStopPress(feature, markerFeature)}
            />
          );
        }
      });
    } else if (selectedItem.marker_info && selectedItem.lane_info) {
      return (
        <Marker
          pinColor={getLaneColor(selectedItem.lane_info[0].properties.route_id)}
          key={0}
          coordinate={{
            latitude: selectedItem.marker_info.geometry.coordinates[1],
            longitude: selectedItem.marker_info.geometry.coordinates[0],
          }}
          title={selectedItem.marker_info.properties.stop_name}
          description={`Routes: ${selectedItem.marker_info.properties.route_ids}`}
          onPress={() => {
            selectedItem.marker_info &&
              handleStopPress(feature, selectedItem.marker_info);
          }}
        />
      );
    }
  };

  const renderLanes = () => {
    return linesGeoJSON.features.map((feature, index) =>
      feature.geometry.coordinates.map((line, lineIndex) => {
        const isRouteNameIncluded = selectedItem.lane_info?.some(
          (lane: LaneType) =>
            lane.properties.route_name === feature.properties.route_name,
        );
        if (
          selectedItem.selection_case === 'none' ||
          (selectedItem.lane_info && isRouteNameIncluded)
        )
          return (
            <>
              <Polyline
                tappable={true}
                key={`${index}-${lineIndex}`}
                coordinates={line.map(coord => ({
                  latitude: coord[1],
                  longitude: coord[0],
                }))}
                strokeColor={getLaneColor(feature.properties.route_name)}
                strokeWidth={5}
                onPress={() => handleLanePress(feature)}
              />
              {renderMarkers(feature)}
            </>
          );
      }),
    );
  };

  return (
    <MapView
      style={styles.map}
      customMapStyle={mapStyle}
      initialRegion={{
        latitude: 46.099777,
        longitude: 19.664681,
        latitudeDelta: 0.085,
        longitudeDelta: 0.085,
      }}
      scrollEnabled={mapScrollable}>
      {renderLanes()}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    zIndex: -2,
  },
});
