import {View, Text, StyleSheet, BackHandler} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker, Polyline} from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import mapStyle from '../assets/mapStyle.json';
import {markersGeoJSON, linesGeoJSON} from '../data/data';

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

type MapProps = {
  bottomSheet: React.RefObject<BottomSheet>;
  setSelectedStop: React.Dispatch<React.SetStateAction<MarkerType | null>>;
  setSelectedLane: React.Dispatch<React.SetStateAction<LaneType | null>>;
  setLastSelected: React.Dispatch<React.SetStateAction<string>>;
  mapScrollable: boolean;
};

export default function Map({
  bottomSheet,
  setSelectedStop,
  setSelectedLane,
  setLastSelected,
  mapScrollable,
}: MapProps) {
  const [displayLane, setDisplayLane] = useState('none');

  const laneColors = [
    'red',
    'green',
    'blue',
    'yellow',
    'purple',
    'pink',
    'lime',
    'white',
  ];

  const getLaneColor = (lane: string, index: number) => {
    switch (lane) {
      case '3':
        return 'blue';
      case '1A':
        return 'gray';
      case '16':
        return 'yellow';
      default:
        return laneColors[index % laneColors.length];
    }
  };

  //back button behavior when selected lane
  useEffect(() => {
    const onBackPress = () => {
      if (displayLane !== 'none') {
        setDisplayLane('none');
        bottomSheet.current?.collapse();
        return true; // Prevent default behavior (e.g., closing the app)
      }
      return false; // Allow default behavior if displayLane is 'none'
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [displayLane]);

  const handleRoutePress = (marker: MarkerType) => {
    bottomSheet.current?.snapToIndex(1);
    setSelectedStop(marker);
    setLastSelected('marker');
  };

  const handleLanePress = (lane: LaneType) => {
    setDisplayLane(lane.properties.route_name);
    bottomSheet.current?.snapToIndex(1);
    setSelectedLane(lane);
    setLastSelected('lane');
  };

  const renderLanes = () => {
    return linesGeoJSON.features.map((feature, index) =>
      feature.geometry.coordinates.map((line, lineIndex) => {
        if (
          displayLane === feature.properties.route_name ||
          displayLane === 'none'
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
                strokeColor={getLaneColor(feature.properties.route_name, index)}
                strokeWidth={5}
                onPress={() => handleLanePress(feature)}
              />
              {markersGeoJSON.features.map((markerFeature, index) => {
                if (
                  markerFeature.properties.route_ids.includes(
                    feature.properties.route_id,
                  ) &&
                  displayLane !== 'none'
                )
                  return (
                    <Marker
                      pinColor={getLaneColor(
                        feature.properties.route_name,
                        index,
                      )}
                      key={index}
                      coordinate={{
                        latitude: markerFeature.geometry.coordinates[1],
                        longitude: markerFeature.geometry.coordinates[0],
                      }}
                      title={markerFeature.properties.stop_name}
                      description={`Stop ID: ${feature}`}
                      onPress={() =>
                        handleRoutePress({
                          stop_id: markerFeature.properties.stop_id,
                          stop_name: markerFeature.properties.stop_name,
                          route_ids: markerFeature.properties.route_ids,
                          geometry: markerFeature.geometry,
                        })
                      }
                    />
                  );
              })}
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
  },
});
