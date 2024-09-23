import {StyleSheet, Text, View, Animated} from 'react-native';
import React, {useRef, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {UnivesalSeleceted} from '../assets/types';

import {getLaneColor} from '../functions/getLaneColor';

export default function MapLegend() {
  const [legendShown, setLegendShown] = useState(true);
  const legendPosition = useRef(new Animated.Value(0)).current;

  const handleLegendPress = () => {
    if (!legendShown) {
      setLegendShown(true);
      Animated.timing(legendPosition, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      setLegendShown(false);
      Animated.timing(legendPosition, {
        toValue: -110,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <Animated.View
      style={[
        styles.legendContianer,
        {transform: [{translateX: legendPosition}]},
      ]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          handleLegendPress();
        }}>
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
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  legendContianer: {
    width: 100,
    height: 195,
    backgroundColor: 'white',
    position: 'absolute',
    left: 20,
    top: 90,
    zIndex: 0,
    borderRadius: 20,
    paddingLeft: 10,
    paddingTop: 10,
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
