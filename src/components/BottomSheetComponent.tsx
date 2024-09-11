import {View, Text, StyleSheet, Touchable} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {UnivesalSeleceted} from '../assets/types';
import stopTimes from '../data/txt/stopTimes';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
        tripRepeat !== tripId && //checks if its first time of teh trip
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
          <>
            <Text style={styles.displayText}>Vremena za radne dane</Text>
            {selectedItem.marker_info.properties.route_ids.map(
              (elm, indexRoute) => {
                let counter: number = 0;
                return (
                  <>
                    <Text style={styles.displayText}>{elm}</Text>
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
                          <Text style={styles.displayText}>
                            {'Dolazak: ' + busArivalData[index][1] + '\n'}
                          </Text>
                        );
                      }
                    })}
                  </>
                );
              },
            )}
          </>
        );
        //   return (
        //     <>
        //       <Text style={styles.displayText}>Vremena za radne dane</Text>
        //       <Text style={styles.displayText}>
        //         {busArivalData.map((element, index) => {
        //           if (
        //             busArivalData[index][3] ===
        //               selectedItem.marker_info?.properties.stop_id &&
        //             busArivalData[index][0].split('_').includes('radni')
        //           ) {
        //             return (
        //               'route - ' +
        //               busArivalData[index][0].split('_')[1] +
        //               '\t\t\t' +
        //               'arives - ' +
        //               busArivalData[index][1] +
        //               '\n'
        //             );
        //           }
        //         })}
        //       </Text>
        //       <Text style={styles.displayText}>Vremena za vikend</Text>
        //       <Text style={styles.displayText}>
        //         {busArivalData.map((element, index) => {
        //           if (
        //             busArivalData[index][3] ===
        //               selectedItem.marker_info?.properties.stop_id &&
        //             busArivalData[index][0].split('_').includes('nedelja')
        //           ) {
        //             return (
        //               'route - ' +
        //               busArivalData[index][0].split('_')[1] +
        //               '\t\t\t' +
        //               'arives - ' +
        //               busArivalData[index][1] +
        //               '\n'
        //             );
        //           }
        //         })}
        //       </Text>
        //     </>
        //   );
        // }
        return null;
      }
    };

    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>
          {selectedItem.marker_info !== undefined
            ? selectedItem.marker_info?.properties.stop_name
            : selectedItem.lane_info &&
              selectedItem.lane_info[0].properties.route_name}
        </Text>
        {renderMarkerInfo()}
        {renderLaneInfo()}
      </View>
    );
  };

  return (
    <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
      <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        {renderInfo()}
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
    marginTop: 20,
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
    color: 'gray',
    alignSelf: 'center',
    marginTop: 10,
  },
});
