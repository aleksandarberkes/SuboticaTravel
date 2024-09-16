import {Image, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import React, {useRef, useState} from 'react';

export default function OptionPicker() {
  const [pickerOpen, setPickerOpen] = useState(false);
  const marginTopOne = useRef(new Animated.Value(45)).current;
  const marginTopTwo = useRef(new Animated.Value(45)).current;
  const marginTopThree = useRef(new Animated.Value(45)).current;
  const marginTopFour = useRef(new Animated.Value(45)).current;
  const rotatePicker = useRef(new Animated.Value(0)).current;

  const rotateInterpolation = rotatePicker.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const handlePickerPress = () => {
    const animDuration = 200;
    Animated.parallel([
      Animated.timing(rotatePicker, {
        toValue: pickerOpen ? 0 : 1,
        useNativeDriver: true,
        duration: animDuration,
      }),
      Animated.timing(marginTopOne, {
        toValue: pickerOpen ? 45 : 90,
        useNativeDriver: true,
        delay: pickerOpen ? 0 : 120,
        duration: animDuration,
      }),
      Animated.timing(marginTopTwo, {
        toValue: pickerOpen ? 45 : 130,
        useNativeDriver: true,
        delay: pickerOpen ? 40 : 80,
        duration: animDuration,
      }),
      Animated.timing(marginTopThree, {
        toValue: pickerOpen ? 45 : 170,
        useNativeDriver: true,
        delay: pickerOpen ? 80 : 40,
        duration: animDuration,
      }),
      Animated.timing(marginTopFour, {
        toValue: pickerOpen ? 45 : 210,
        useNativeDriver: true,
        delay: pickerOpen ? 120 : 0,
        duration: animDuration,
      }),
    ]).start();
    if (!pickerOpen) setPickerOpen(true);
    else setPickerOpen(false);
  };

  return (
    <>
      <Animated.View
        style={[
          styles.picker,
          {
            transform: [{rotate: rotateInterpolation}],
          },
        ]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handlePickerPress()}>
          <Image
            source={require('../assets/images/down-arrow.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={[
          styles.pickerOption,
          {transform: [{translateY: marginTopOne}]},
        ]}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
          <Image
            source={require('../assets/images/setting.png')}
            style={styles.smallIcon}
          />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={[
          styles.pickerOption,
          {transform: [{translateY: marginTopTwo}]},
        ]}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
          <Image
            source={require('../assets/images/info.png')}
            style={styles.smallIcon}
          />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={[
          styles.pickerOption,
          {transform: [{translateY: marginTopThree}]},
        ]}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
          <Image
            source={require('../assets/images/calculator.png')}
            style={styles.smallIcon}
          />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={[
          styles.pickerOption,
          {transform: [{translateY: marginTopFour}]},
        ]}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
          <Image
            source={require('../assets/images/navigation.png')}
            style={styles.smallIcon}
          />
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  picker: {
    height: 60,
    aspectRatio: 1 / 1,
    backgroundColor: 'white',
    borderRadius: 50,
    position: 'absolute',
    right: 7,
    top: 25,
    zIndex: 0,
    borderWidth: 1,
    borderColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerOption: {
    backgroundColor: 'white',
    height: 35,
    aspectRatio: 1 / 1,
    position: 'absolute',
    right: 20,
    zIndex: -1,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  smallIcon: {
    width: 15,
    height: 15,
  },
});
