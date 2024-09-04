import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {markersGeoJSON, linesGeoJSON} from '../data/data';

type SearchFilterProps = {
  search: string;
};

export default function SearchFilter(props: SearchFilterProps) {
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
              <>
                <Text>{feature.properties.route_name}</Text>
              </>
            );
        })}
        {markersGeoJSON.features.map(feature => {
          if (
            feature.properties.stop_name
              .toLowerCase()
              .includes(props.search.toLowerCase())
          )
            return (
              <>
                <Text>
                  {feature.properties.stop_name} {feature.properties.route_ids}
                </Text>
              </>
            );
        })}
      </ScrollView>
      <View style={styles.mapScroll}></View>
    </>
  );
}

const styles = StyleSheet.create({
  searchAutoComplete: {
    overflow: 'hidden',
    backgroundColor: 'white',
    height: 300,
    width: '100%',
    position: 'absolute',
    top: 50,
    zIndex: 10,
  },
  mapScroll: {
    display: 'none',
    height: 1000,
    width: 1000,
    left: -100,
    top: -100,
    backgroundColor: 'yellow',
  },
});
