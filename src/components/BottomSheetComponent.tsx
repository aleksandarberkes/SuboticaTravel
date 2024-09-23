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
                  },
                ]}>
                <Text style={styles.displayText}>Odlazak</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setSelectedDireciton('dolazak')}
                style={[
                  styles.direcitonSelector,
                  {
                    backgroundColor:
                      selectedDireciton === 'dolazak' ? 'gainsboro' : 'white',
                  },
                ]}>
                <Text style={styles.displayText}>Dolazak</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.departureTimesContainer}>
              <Text style={styles.weekDayText}>Radni dani</Text>
              {arivalTimesAndInfoWorkday.map((element, index) => {
                return (
                  <>
                    <Text style={styles.busArivalText}>
                      {arivalTimesAndInfoWorkday[index][0]}
                    </Text>
                    <Text style={styles.busTripIdText}>
                      {arivalTimesAndInfoWorkday[index][1]}
                    </Text>
                  </>
                );
              })}
              <Text style={styles.weekDayText}>Vikend i praznici</Text>
              {arivalTimesAndInfoWeekend.map((element, index) => {
                return (
                  <>
                    <Text style={styles.busArivalText}>
                      {arivalTimesAndInfoWorkday[index][0]}
                    </Text>
                    <Text style={styles.busTripIdText}>
                      {arivalTimesAndInfoWorkday[index][1]}
                    </Text>
                  </>
                );
              })}
            </View>
          </>
        );
      return null;
    };

    const renderMarkerInfo = () => {
      const currentTime = new Date().toTimeString().split(' ')[0];
      const timeA = new Date(`1970-01-01T${currentTime}Z`);
      console.log(timeA);

      if (selectedItem.marker_info) {
        return (
          <View style={styles.departureTimesContainer}>
            <Text style={styles.headerText}>Vremena za radne dane</Text>
            {selectedItem.marker_info.properties.route_ids.map(
              (elm, indexRoute) => {
                let counter: number = 0;
                return (
                  <View style={styles.routeContianer}>
                    <Text style={styles.displayRouteNameText}>
                      {'Linija ' + elm}
                    </Text>
                    {busArivalData.map((element, index) => {
                      const timeB = new Date(
                        `1970-01-01T${busArivalData[index][1]}Z`,
                      );
                      if (
                        busArivalData[index][3] ===
                          selectedItem.marker_info?.properties.stop_id &&
                        busArivalData[index][0].split('_').includes('radni') &&
                        busArivalData[index][0]
                          .split('_')
                          .includes(
                            selectedItem.marker_info.properties.route_ids[
                              indexRoute
                            ],
                          ) &&
                        timeA.getTime() < timeB.getTime() &&
                        counter < 5
                      ) {
                        counter++;
                        return (
                          <Text style={styles.busArivalText}>
                            {busArivalData[index][1].split(':')[0] +
                              ':' +
                              busArivalData[index][1].split(':')[1] +
                              '\n'}
                          </Text>
                        );
                      }
                    })}
                  </View>
                );
              },
            )}
            <Text style={styles.headerText}>Vremena za vikend i praznike</Text>
            {selectedItem.marker_info.properties.route_ids.map(
              (elm, indexRoute) => {
                let counter: number = 0;
                return (
                  <View style={styles.routeContianer}>
                    <Text style={styles.displayRouteNameText}>
                      {'Linija ' + elm}
                    </Text>
                    {busArivalData.map((element, index) => {
                      const timeB = new Date(
                        `1970-01-01T${busArivalData[index][1]}Z`,
                      );
                      if (
                        busArivalData[index][3] ===
                          selectedItem.marker_info?.properties.stop_id &&
                        busArivalData[index][0]
                          .split('_')
                          .includes('nedelja') &&
                        busArivalData[index][0]
                          .split('_')
                          .includes(
                            selectedItem.marker_info.properties.route_ids[
                              indexRoute
                            ],
                          ) &&
                        timeA.getTime() < timeB.getTime() &&
                        counter < 5
                      ) {
                        counter++;
                        return (
                          <Text style={styles.busArivalText}>
                            {busArivalData[index][1] + '\n'}
                          </Text>
                        );
                      }
                    })}
                  </View>
                );
              },
            )}
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
      snapPoints={snapPoints}
      handleComponent={handleComponent}
      handleIndicatorStyle={{display: 'none'}}>
      <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        {selectedItem.selection_case === 'none'
          ? renderWelcome()
          : renderInfo()}
      </BottomSheetScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
  },
  displayText: {
    color: 'black',
    alignSelf: 'center',
  },
  container: {
    width: '80%',
  },
  directionSelectionConatiner: {
    flexDirection: 'row',
  },
  direcitonSelector: {
    padding: 20,
    width: 157,
  },
  departureTimesContainer: {
    width: '100%',
    marginBottom: 40,
    backgroundColor: 'gainsboro',
    padding: 10,
  },
  weekDayText: {
    fontSize: 22,
    paddingTop: 10,
    paddingLeft: 10,
    fontWeight: '700',
  },
  busArivalText: {
    paddingTop: 10,
    fontSize: 20,
  },
  busTripIdText: {
    fontSize: 12,
  },
  headerText: {
    fontSize: 20,
    color: 'darkslategrey',
    alignSelf: 'center',
    marginTop: 10,
  },
  displayRouteNameText: {
    fontSize: 22,
    color: 'darkslategrey',
  },
  routeContianer: {
    backgroundColor: 'lightgray',
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'darkgrey',
    paddingLeft: 20,
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
