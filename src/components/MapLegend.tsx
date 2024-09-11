import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function MapLegend() {
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

  return (
    <View style={styles.legendContianer}>
      <View style={styles.laneContiner}>
        <View
          style={[
            styles.laneColorCircle,
            {backgroundColor: getLaneColor('1A')},
          ]}></View>
        <Text style={styles.laneText}>Linija 1A</Text>
      </View>
      <View style={styles.laneContiner}>
        <View
          style={[
            styles.laneColorCircle,
            {backgroundColor: getLaneColor('2')},
          ]}></View>
        <Text style={styles.laneText}>Linija 2</Text>
      </View>
      <View style={styles.laneContiner}>
        <View
          style={[
            styles.laneColorCircle,
            {backgroundColor: getLaneColor('3')},
          ]}></View>
        <Text style={styles.laneText}>Linija 3</Text>
      </View>
      <View style={styles.laneContiner}>
        <View
          style={[
            styles.laneColorCircle,
            {backgroundColor: getLaneColor('4')},
          ]}></View>
        <Text style={styles.laneText}>Linija 4</Text>
      </View>
      <View style={styles.laneContiner}>
        <View
          style={[
            styles.laneColorCircle,
            {backgroundColor: getLaneColor('6')},
          ]}></View>
        <Text style={styles.laneText}>Linija 6</Text>
      </View>
      <View style={styles.laneContiner}>
        <View
          style={[
            styles.laneColorCircle,
            {backgroundColor: getLaneColor('7')},
          ]}></View>
        <Text style={styles.laneText}>Linija 7</Text>
      </View>
      <View style={styles.laneContiner}>
        <View
          style={[
            styles.laneColorCircle,
            {backgroundColor: getLaneColor('8')},
          ]}></View>
        <Text style={styles.laneText}>Linija 8</Text>
      </View>
      <View style={styles.laneContiner}>
        <View
          style={[
            styles.laneColorCircle,
            {backgroundColor: getLaneColor('8A')},
          ]}></View>
        <Text style={styles.laneText}>Linija 8A</Text>
      </View>
      <View style={styles.laneContiner}>
        <View
          style={[
            styles.laneColorCircle,
            {backgroundColor: getLaneColor('9')},
          ]}></View>
        <Text style={styles.laneText}>Linija 9</Text>
      </View>
      <View style={styles.laneContiner}>
        <View
          style={[
            styles.laneColorCircle,
            {backgroundColor: getLaneColor('10')},
          ]}></View>
        <Text style={styles.laneText}>Linija 10</Text>
      </View>
      <View style={styles.laneContiner}>
        <View
          style={[
            styles.laneColorCircle,
            {backgroundColor: getLaneColor('16')},
          ]}></View>
        <Text style={styles.laneText}>Linija 16</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  legendContianer: {
    width: 100,
    height: 195,
    backgroundColor: 'white',
    position: 'absolute',
    right: 25,
    top: 90,
    zIndex: 10,
    borderRadius: 20,
    padding: 10,
  },
  laneContiner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  laneColorCircle: {
    width: 12,
    height: 12,
    borderRadius: 12,
  },
  laneText: {
    fontSize: 12,
    color: 'gray',
  },
});
