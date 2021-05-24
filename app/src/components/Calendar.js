import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import moment from 'moment';

const Calendar = ({onDateChange}) => {
  const customDatesStylesCallback = date => {
    switch(date.isoWeekday()) {
      case 6: // saterday
        return {
          style:{
            backgroundColor: '#909',
          },
          textStyle: {
            color: '#0f0',
            fontWeight: 'bold',
          }
        };
      case 7: // Sunday
        return {
          textStyle: {
            color: 'red',
          }
        };
    }
  }
  return (
    <View style={styles.container}>
     <CalendarPicker
        textStyle={{
          fontSize: heightPercentageToDP(2),
          fontWeight: '200',
          color: 'black',
        }}
        disabledDates={customDatesStylesCallback}
        onDateChange={onDateChange}
        minDate={moment().toDate()}
       // customDatesStyles={customDatesStylesCallback}
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
