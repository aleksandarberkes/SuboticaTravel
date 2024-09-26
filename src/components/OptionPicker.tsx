import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  PermissionsAndroid,
  Platform,
  BackHandler,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {OptionPickerNavigationProps} from '../assets/types';
import GetLocation from 'react-native-get-location';

type OptionPickerProps = {
  setLocation: React.Dispatch<React.SetStateAction<number[]>>;
  goToLocation: () => void;
};

export default function OptionPicker({
  setLocation,
  goToLocation,
}: OptionPickerProps) {
  const navigation = useNavigation<OptionPickerNavigationProps>();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [permissionGranded, setPermissionGranted] = useState(false);
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
        toValue: pickerOpen ? 35 : 90,
        useNativeDriver: true,
        delay: pickerOpen ? 0 : 120,
        duration: animDuration,
      }),
      Animated.timing(marginTopTwo, {
        toValue: pickerOpen ? 35 : 140,
        useNativeDriver: true,
        delay: pickerOpen ? 40 : 80,
        duration: animDuration,
      }),
      Animated.timing(marginTopThree, {
        toValue: pickerOpen ? 35 : 190,
        useNativeDriver: true,
        delay: pickerOpen ? 80 : 40,
        duration: animDuration,
      }),
      Animated.timing(marginTopFour, {
        toValue: pickerOpen ? 35 : 240,
        useNativeDriver: true,
        delay: pickerOpen ? 120 : 0,
        duration: animDuration,
      }),
    ]).start();
    if (!pickerOpen) setPickerOpen(true);
    else setPickerOpen(false);
  };

  const handleLocationPress = () => {
    goToLocation();
  };

  useEffect(() => {
    const permission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Subotica Travel needs acces to you locatoin',
              message:
                'To allow us to help you find the most optimal routes ' +
                'we need acces to your current location.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log(
              'PermissionsAndroid (permission result) = Locatoin permission granted',
            );
            GetLocation.getCurrentPosition({
              enableHighAccuracy: true,
              timeout: 60000,
            })
              .then(location => {
                setLocation([location.latitude, location.longitude]);
              })
              .catch(error => {
                const {code, message} = error;
                console.warn(code, message);
              });
          } else {
            console.log(
              'PermissionsAndroid (permission result) = Locatoin permission granted denied',
            );
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    permission();
  }, []);

  //TODO: should add view for when the permission is not granted
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
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('Settings');
          }}>
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
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('Info');
          }}>
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
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            handleLocationPress();
          }}>
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
    height: 45,
    aspectRatio: 1 / 1,
    position: 'absolute',
    right: 15,
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
    width: 17,
    height: 17,
  },
});
