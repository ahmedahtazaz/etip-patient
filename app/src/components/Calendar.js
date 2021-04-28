import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const Calendar = ({onDateChange}) => {
  return (
    <View style={styles.container}>
      <CalendarPicker
        textStyle={{
          fontSize: heightPercentageToDP(2),
          fontWeight: '200',
          color: 'black',
        }}
        onDateChange={onDateChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    marginTop: heightPercentageToDP(1),
  },
});

export default Calendar;
