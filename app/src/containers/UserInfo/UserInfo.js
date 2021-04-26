import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {APP_INIT_LINK} from '../../commons/Constants';
import {WHITE_COLOR, PRIMARY_COLOR, GRAY_COLOR} from '../../theme/Colors';

import Orientation from 'react-native-orientation-locker';
import {useIsFocused} from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  View,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioButton from '../../components/RadioButton';
const welcomeLogo = require('../../assets/images/welcome-logo.png');
const welcomeImg = require('../../assets/images/welcome-image.png');
const currentDate = new Date();
function UserInfo({loader}) {
  const [isFamily, setIsFamily] = useState(false);
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [male, setMale] = useState(true);
  const [female, setFemale] = useState(false);
  const [other, setOther] = useState(false);
  const [dob, setDob] = useState(
    currentDate.getDate() +
      '-' +
      currentDate.getMonth() +
      '-' +
      currentDate.getFullYear(),
  );
  const [showCalender, setShowCalender] = useState(false);
  const [calDate, setCalDate] = useState(new Date());
  const isFocused = useIsFocused();

  useEffect(() => {
    Orientation.lockToPortrait();
  }, [isFocused]);

  const _handleDatePicked = (e, pickeddate) => {
    const date = new Date(pickeddate);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    if (day) setDob(day + '-' + month + '-' + year);
    if (day) setCalDate(date);
    setShowCalender(false);
  };

  return (
    <View style={styles.background}>
      <View style={styles.innerDiv}>
        <View style={styles.mainHeading}>
          <Text style={styles.mainHeadingText}>
            {isFamily ? 'Add Family' : 'User Information'}
          </Text>
        </View>
        <View style={styles.smallHeading}>
          <Text style={styles.smallHeadingText}>
            {isFamily
              ? 'Please Information of Family Member'
              : 'Please provide your information to continue'}
          </Text>
        </View>
        <View style={styles.secondaryHeading}>
          <Text style={styles.secondaryHeadingText}>User Information</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.userName}>
            <TextInput
              value={fName}
              textContentType="givenName"
              underlineColorAndroid="transparent"
              placeholder="First Name"
              style={styles.inputStyle}
              onChangeText={value => setFName(value)}></TextInput>
            <TextInput
              value={lName}
              textContentType="familyName"
              placeholder="Last Name"
              style={styles.inputStyle}
              onChangeText={value => setLName(value)}></TextInput>
          </View>
          <View style={styles.gender}>
            <RadioButton
              checked={male}
              data="Male"
              setChecked={value => {
                if (value) {
                  setFemale(false);
                  setOther(false);
                }
                setMale(value);
              }}
              widthFactorMain="21"></RadioButton>
            <RadioButton
              checked={female}
              data="FeMale"
              setChecked={value => {
                if (value) {
                  setMale(false);
                  setOther(false);
                }
                setFemale(value);
              }}
              widthFactorMain="21"></RadioButton>
            <RadioButton
              checked={other}
              data="Other"
              setChecked={value => {
                if (value) {
                  setMale(false);
                  setFemale(false);
                }
                setOther(value);
              }}
              widthFactorMain="21"></RadioButton>
          </View>
          <TextInput
            value={dob}
            textContentType="none"
            placeholder="Date"
            style={styles.inputStyle}
            onFocus={() => {
              setShowCalender(true);
            }}></TextInput>
          {showCalender ? (
            <DateTimePicker
              testID="dateTimePicker"
              mode={'date'}
              value={calDate}
              is24Hour={true}
              display="default"
              onChange={_handleDatePicked}
            />
          ) : null}
        </View>
        {loader ? (
          <View
            style={{
              alignSelf: 'center',
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              position: 'absolute',
              zIndex: 1000,
            }}>
            <ActivityIndicator size="large" color="grey" animating={loader} />
          </View>
        ) : null}
      </View>
    </View>
  );
}

const mapDispatchToProps = dispatch => {
  return {};
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);

// Style for "Background"
const styles = StyleSheet.create({
  background: {
    backgroundColor: WHITE_COLOR,
    paddingTop: '9%',
    paddingBottom: '10%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },

  mainHeadingText: {
    fontSize: RFValue(16, 580),
    color: PRIMARY_COLOR,
    fontWeight: '700',
  },
  smallHeadingText: {
    fontSize: RFValue(12, 580),
    color: GRAY_COLOR,
    fontWeight: '400',
    paddingTop: '2%',
    paddingBottom: '7%',
  },
  secondaryHeadingText: {
    fontSize: RFValue(16, 580),
    color: GRAY_COLOR,
    fontWeight: '500',
    paddingBottom: '3%',
  },
  userName: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 14,
  },
  inputStyle: {
    display: 'flex',
    width: '48%',
    backgroundColor: '#F5F9F8',
    borderRadius: 6,
    fontSize: RFValue(14, 580),
    color: '#243E3B',
    paddingTop: '4%',
    paddingBottom: '4%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  gender: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 14,
  },
});
