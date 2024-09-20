import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {markersGeoJSON, linesGeoJSON} from '../data/data';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {MarkerType, LaneType, UnivesalSeleceted} from '../assets/types';

type SearchFilterProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<UnivesalSeleceted>>;
  goToLocation: (lat: number, lng: number) => void;
};

export default function SearchFilter(props: SearchFilterProps) {
  const getMarkerLanes = (marker: MarkerType): LaneType[] => {
    let lanesArry: LaneType[] = [];
    linesGeoJSON.features.forEach(value => {
      if (marker.properties.route_ids.includes(value.properties.route_id)) {
        lanesArry.push(value);
      }
    });
    return lanesArry;
  };

  const handleMarkerPress = (feature: MarkerType) => {
    getMarkerLanes(feature);
    props.setSelectedItem({
      selection_case: 'filter-marker',
      lane_info: getMarkerLanes(feature),
      marker_info: feature,
    });
    props.setSearch(feature.properties.stop_name);
    props.goToLocation(
      feature.geometry.coordinates[1],
      feature.geometry.coordinates[0],
    );
  };

  const handleLanePress = (feature: LaneType) => {
    props.setSelectedItem({
      selection_case: 'filter-lane',
      lane_info: [feature],
    });
    props.setSearch(feature.properties.route_name);
  };

  return (
    <>
      <ScrollView style={styles.searchAutoComplete}>
        {linesGeoJSON.features.map(feature => {
          if (
            feature.properties.route_name
              .toLowerCase()
              .includes(props.search.toLowerCase())
          )
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => handleLanePress(feature)}
                style={styles.searchOption}>
                <Text style={styles.displayText}>
                  {feature.properties.route_name}
                </Text>
              </TouchableOpacity>
            );
        })}
        {markersGeoJSON.features.map(feature => {
          if (
            feature.properties.stop_name
              .toLowerCase()
              .includes(props.search.toLowerCase())
          )
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => handleMarkerPress(feature)}
                style={styles.searchOption}>
                <Text style={styles.displayText}>
                  {feature.properties.stop_name}
                </Text>
              </TouchableOpacity>
            );
        })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  searchAutoComplete: {
    overflow: 'hidden',
    backgroundColor: 'white',
    height: 200,
    width: '100%',
    position: 'absolute',
    top: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  searchOption: {
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  displayText: {
    color: 'gray',
  },
});
