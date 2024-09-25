import {BackHandler, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

export default function SettingsScreen() {
  useEffect(() => {
    console.log('a');
    BackHandler.addEventListener('hardwareBackPress', () => {
      return false;
    });
  }, []);

  return (
    <View>
      <Text>SettingsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
