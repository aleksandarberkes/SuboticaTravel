import {
  View,
  Text,
  StyleSheet,
  Touchable,
  Dimensions,
  Image,
} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {UnivesalSeleceted} from '../assets/types';
import stopTimes from '../data/txt/stopTimes';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getLaneColor} from '../functions/getLaneColor';
import {getRouteIdDisplay} from '../functions/getRouteIdDisplay';

type BottomSheetComponentProps = {
  bottomSheetRef: React.RefObject<BottomSheet>;
  selectedItem: UnivesalSeleceted;
};

export default function BottomSheetComponent({
  bottomSheetRef,
  selectedItem,
}: BottomSheetComponentProps) {
  const snapPoints = useMemo(() => ['10%', '50%', '80%'], []);
  const [selectedDireciton, setSelectedDireciton] = useState('odlazak');

  const groupedData = stopTimes.split('\n');
  let busArivalData: string[][] = [];

  groupedData.forEach((value, index) => {
    busArivalData[index] = value.split(',');
  });

  /**
   *
   * @param day weather you want a work day of a week day
   * @returns matrixs with times and trip descriptions
   */
  const getDepartureTimesAndDescriptions = (
    day: 'radni' | 'vikend',
  ): string[][] => {
    let arivalTimesAndInfo: string[][] = [];
    let tripRepeat: string = '';

    busArivalData.forEach((elm, index) => {
      const busArivalSplit = busArivalData[index][0].split('_');
      const tripId = busArivalData[index][0];

      if (
        selectedItem.lane_info && //check if there is a selected lane
        ((selectedDireciton === 'odlazak' && busArivalSplit.includes('A')) ||
          (selectedDireciton === 'dolazak' && busArivalSplit.includes('B'))) && //check for direction
        busArivalSplit.includes(day === 'radni' ? 'radni' : 'nedelja') && //checks if is work day
        tripRepeat !== tripId && //checks if its first time of the trip
        busArivalSplit.includes(selectedItem.lane_info[0].properties.route_name) // checks if its the selected lane
      ) {
        tripRepeat = tripId;

        arivalTimesAndInfo.push([elm[1], elm[0]]);
      }
    });

    return arivalTimesAndInfo;
  };

  const renderInfo = () => {
    const renderLaneInfo = () => {
      let arivalTimesAndInfoWorkday: string[][] =
        getDepartureTimesAndDescriptions('radni');
      let arivalTimesAndInfoWeekend: string[][] =
        getDepartureTimesAndDescriptions('vikend');

      const sortFunction = (a: string[], b: string[]) => {
        const timeA = new Date(`1970-01-01T${a[0]}Z`);
        const timeB = new Date(`1970-01-01T${b[0]}Z`);
        return timeA.getTime() - timeB.getTime();
      };
      arivalTimesAndInfoWorkday.sort(sortFunction);
      arivalTimesAndInfoWeekend.sort(sortFunction);

      if (
        selectedItem.marker_info === undefined &&
        selectedItem.lane_info !== undefined
      )
        return (
          <>
            <View style={styles.directionSelectionConatiner}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setSelectedDireciton('odlazak')}
                style={[
                  styles.direcitonSelector,
                  {
                    backgroundColor:
                      selectedDireciton === 'odlazak' ? 'gainsboro' : 'white',
                    borderTopLeftRadius:
                      selectedDireciton === 'odlazak' ? 17 : 0,
                    borderTopRightRadius:
                      selectedDireciton === 'odlazak' ? 17 : 0,
                  },
                ]}>
                <Text style={styles.direcitonSelectorText}>Odlazak</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setSelectedDireciton('dolazak')}
                style={[
                  styles.direcitonSelector,
                  {
                    backgroundColor:
                      selectedDireciton === 'dolazak' ? 'gainsboro' : 'white',
                    borderTopLeftRadius:
                      selectedDireciton === 'dolazak' ? 17 : 0,
                    borderTopRightRadius:
                      selectedDireciton === 'dolazak' ? 17 : 0,
                  },
                ]}>
                <Text style={styles.direcitonSelectorText}>Dolazak</Text>
              </TouchableOpacity>
            </View>
            <View>
              <View style={styles.dayContiner}>
                <Text style={styles.weekDayText}>Radni dani</Text>
                {arivalTimesAndInfoWorkday.map((element, index) => {
                  return (
                    <View
                      style={[
                        styles.busArivalRowContainer,
                        {
                          backgroundColor:
                            index % 2 === 0 ? 'gainsboro' : 'white',
                        },
                      ]}>
                      <View style={styles.busArivalPrefixContainer}>
                        <Text style={styles.busArivalPrefixText}>krece</Text>
                        <Text style={styles.busArivalText}>
                          {arivalTimesAndInfoWorkday[index][0].split(':')[0] +
                            ':' +
                            arivalTimesAndInfoWorkday[index][0].split(':')[1]}
                        </Text>
                      </View>
                      <Text style={styles.busTripIdText} numberOfLines={1}>
                        {getRouteIdDisplay(arivalTimesAndInfoWorkday[index][1])}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <View style={styles.dayContiner}>
                <Text style={styles.weekDayText}>Vikend i praznici</Text>
                {arivalTimesAndInfoWeekend.map((element, index) => {
                  return (
                    <View
                      style={[
                        styles.busArivalRowContainer,
                        {
                          backgroundColor:
                            index % 2 === 0 ? 'gainsboro' : 'white',
                        },
                      ]}>
                      <View style={styles.busArivalPrefixContainer}>
                        <Text style={styles.busArivalPrefixText}>krece</Text>
                        <Text style={styles.busArivalText}>
                          {arivalTimesAndInfoWeekend[index][0].split(':')[0] +
                            ':' +
                            arivalTimesAndInfoWeekend[index][0].split(':')[1]}
                        </Text>
                      </View>
                      <Text style={styles.busTripIdText} numberOfLines={1}>
                        {getRouteIdDisplay(arivalTimesAndInfoWeekend[index][1])}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </>
        );
      return null;
    };

    const renderMarkerInfo = () => {
      const currentTime = new Date().toTimeString().split(' ')[0];
      const timeA = new Date(`1970-01-01T${currentTime}Z`);

      const displayArivals = (day: 'radni' | 'vikend') => {
        if (selectedItem.marker_info) {
          return selectedItem.marker_info.properties.route_ids.map(
            (elm, index) => {
              let counter: number = 0;
              let dataToDisplay: string[][] = [];
              busArivalData.forEach(arrivalItem => {
                const timeB = new Date(`1970-01-01T${arrivalItem[1]}Z`);
                if (
                  arrivalItem[3] ===
                    selectedItem.marker_info?.properties.stop_id &&
                  arrivalItem[0]
                    .split('_')
                    .includes(day === 'radni' ? 'radni' : 'nedelja') &&
                  arrivalItem[0]
                    .split('_')
                    .includes(
                      selectedItem.marker_info.properties.route_ids[index],
                    ) &&
                  timeA.getTime() < timeB.getTime() &&
                  counter < 5
                ) {
                  counter++;
                  dataToDisplay.push([arrivalItem[1], arrivalItem[0]]);
                }
              });

              if (dataToDisplay.length > 0) {
                const sortFunction = (a: string[], b: string[]) => {
                  const timeA = new Date(`1970-01-01T${a[0]}Z`);
                  const timeB = new Date(`1970-01-01T${b[0]}Z`);
                  return timeA.getTime() - timeB.getTime();
                };
                dataToDisplay.sort(sortFunction);
                return (
                  <View style={styles.routeContianer}>
                    <Text style={styles.displayRouteNameText}>
                      {'Linija ' + elm}
                    </Text>
                    {dataToDisplay.map((element, index) => {
                      return (
                        <View
                          style={[
                            styles.timeContiner,
                            {
                              backgroundColor:
                                index % 2 === 0 ? 'gainsboro' : 'white',
                            },
                          ]}>
                          <Text style={styles.busArivalText}>
                            {element[0].split(':')[0] +
                              ':' +
                              element[0].split(':')[1]}
                          </Text>

                          <Text numberOfLines={1} style={styles.busTripIdText}>
                            {element[1]}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                );
              }
              return null;
            },
          );
        }
      };
      if (selectedItem.marker_info) {
        return (
          <View>
            <Text style={styles.weekDayText}>Radni dani</Text>
            {displayArivals('radni')}
            <Text style={styles.weekDayText}>Vikend i praznici</Text>
            {displayArivals('vikend')}
          </View>
        );
      }
    };

    return (
      <View style={styles.container}>
        {renderMarkerInfo()}
        {renderLaneInfo()}
      </View>
    );
  };

  const renderWelcome = () => {
    return (
      <View>
        <Text style={[styles.displayText, {padding: 20}]}>
          Dobrodošli u Subotica Travel, vašu praktičnu aplikaciju za navigaciju
          gradskim autobuskim prevozom. Bilo da svakodnevno putujete ili ste
          prvi put u Subotici, naša aplikacija vam pomaže da isplanirate svoje
          putovanje sa aktuelnim redom vožnje, mapama ruta i informacijama o
          cenama, omogućavajući vam da putujete jednostavno i efikasno.
        </Text>
        <Text style={[styles.displayText, {padding: 20}]}>
          Ostanite informisani uz ažurirane dolaske autobusa, obaveštenja o
          uslugama i najbolje opcije ruta prilagođene vašoj destinaciji. Sa
          lakim za korišćenje funkcijama i tačnim podacima, Subotica Travel čini
          putovanje autobusom u Subotici bezbrižnim i pouzdanim. Srećan put!
        </Text>
      </View>
    );
  };

  const handleComponent = () => {
    const renderTitle = () => {
      if (
        selectedItem.marker_info === undefined &&
        selectedItem.lane_info !== undefined
      )
        return (
          <Text style={styles.bottomSheetHeaderTitle}>
            {'Linija ' + selectedItem.lane_info[0].properties.route_name}
          </Text>
        );
      else if (selectedItem.marker_info)
        return (
          <Text style={styles.bottomSheetHeaderTitle}>
            {selectedItem.marker_info.properties.stop_name}
          </Text>
        );
      else
        return (
          <Text style={styles.bottomSheetHeaderTitle}>
            {selectedItem.selection_case.includes('none')
              ? 'Dobro dosli'
              : null}
          </Text>
        );
    };

    return (
      <View
        style={[
          {
            width: Dimensions.get('window').width - 50,
            height: 100,
            alignSelf: 'center',
            borderRadius: 10,
            top: -50,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            flexDirection: 'row',
            position: 'absolute',
          },
          {
            backgroundColor: selectedItem.lane_info
              ? getLaneColor(selectedItem.lane_info[0].properties.route_id)
              : 'gray',
          },
        ]}>
        <View>
          {renderTitle()}
          <Text style={styles.bottomSheetHeaderSubType}>
            {selectedItem.selection_case.includes('lane')
              ? 'Gradska linija'
              : null}
            {selectedItem.selection_case.includes('marker') ? 'Stanica' : null}
          </Text>
        </View>
        <Image
          source={
            selectedItem.marker_info
              ? require('../assets/images/bus-stop.png')
              : require('../assets/images/bus.png')
          }
          style={styles.selectedSubTypeIcon}
        />
      </View>
    );
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      style={{
        borderWidth: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderColor: 'lightgray',
      }}
      snapPoints={snapPoints}
      handleComponent={handleComponent}
      handleHeight={0}>
      <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        {selectedItem.selection_case === 'none'
          ? renderWelcome()
          : renderInfo()}
      </BottomSheetScrollView>
    </BottomSheet>
  );
}

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    paddingTop: 50,
  },
  displayText: {
    color: 'black',
    alignSelf: 'center',
  },
  container: {
    width: screenWidth - 50,
  },
  directionSelectionConatiner: {
    flexDirection: 'row',
    marginTop: 20,
  },
  direcitonSelector: {
    width: screenWidth / 2 - 25,
    paddingVertical: 7,
  },
  direcitonSelectorText: {
    color: 'darkslategrey',
    alignSelf: 'center',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: '300',
  },
  dayContiner: {
    backgroundColor: 'gainsboro',
    marginBottom: 40,
  },
  weekDayText: {
    fontSize: 26,
    paddingVertical: 10,
    paddingLeft: 10,
    fontWeight: '300',
    alignSelf: 'center',
  },
  busArivalPrefixContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 5,
  },
  busArivalRowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 5,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  busArivalPrefixText: {
    fontSize: 13,
    fontWeight: '400',
    marginBottom: 3,
  },
  busArivalText: {
    paddingTop: 10,
    fontWeight: '300',
    fontSize: 26,
  },
  busTripIdText: {
    fontSize: 12,
    marginBottom: 3,
    width: 250,
  },
  headerText: {
    fontSize: 20,
    color: 'darkslategrey',
    alignSelf: 'center',
    marginTop: 10,
  },
  routeContianer: {
    //route continer
    marginVertical: 20,
  },
  displayRouteNameText: {
    //route name
    fontSize: 28,
    color: 'darkslategrey',
    fontWeight: '300',
  },
  timeContiner: {
    // one time contianer
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  bottomSheetHeaderTitle: {
    color: 'white',
    fontWeight: '300',
    fontSize: 30,
  },
  bottomSheetHeaderSubType: {
    color: 'white',
    fontWeight: '200',
    fontSize: 16,
  },
  selectedSubTypeIcon: {
    width: 50,
    height: 50,
  },
});
