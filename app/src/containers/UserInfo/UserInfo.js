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
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
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
  const [city, setCity] = useState('Bavaria');
  const [city1, setCity1] = useState('Bavaria');
  const isFocused = useIsFocused();
  const [taxId, setTaxId] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [schiller, setSchiller] = useState('');
  const [zimmer, setzimmer] = useState('');
  const [postalCode, setPostalCode] = useState('');

  useEffect(() => {
    Orientation.lockToPortrait();
  }, [isFocused]);

  const _handleDatePicked = (e, pickeddate) => {
    const date = new Date(pickeddate);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    setShowCalender(false);
    if (day) setDob(day + '-' + month + '-' + year);
    if (day) setCalDate(date);
  };

  return (
    <ScrollView style={{height: '100%'}}>
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
                widthFactorMain="25"></RadioButton>
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
                widthFactorMain="25"></RadioButton>
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
                widthFactorMain="25"></RadioButton>
            </View>

            <DropDownPicker
              items={[
                {
                  label: 'Bavaria',
                  value: 'Bavaria',
                },
                {
                  label: 'Berlin',
                  value: 'Berlin',
                },
                {
                  label: 'Munich',
                  value: 'Munich',
                },
              ]}
              defaultValue={city}
              containerStyle={{height: '15%'}}
              style={{
                backgroundColor: '#F5F9F8',
                fontSize: RFValue(14, 580),
                color: '#243E3B',
              }}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{
                backgroundColor: '#F5F9F8',
                fontSize: RFValue(14, 580),
                color: '#243E3B',
              }}
              onChangeItem={item => setCity(item.value)}
            />
          </View>
          <TextInput
            value={dob}
            textContentType="none"
            placeholder="Date"
            style={styles.inputStyle1}
            onPressIn={() => {
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
          <TextInput
            value={taxId}
            textContentType="taxId"
            underlineColorAndroid="transparent"
            placeholder="Tax ID"
            style={styles.inputStyle1}
            onChangeText={value => setTaxId(value)}></TextInput>
          <TextInput
            value={email}
            textContentType="email"
            underlineColorAndroid="transparent"
            placeholder="Email"
            style={styles.inputStyle1}
            onChangeText={value => setEmail(value)}></TextInput>
          <TextInput
            value={mobileNo}
            textContentType="mobileNo"
            underlineColorAndroid="transparent"
            placeholder="Mobile No"
            style={styles.inputStyle1}
            onChangeText={value => setMobileNo(value)}></TextInput>
          <View style={styles.secondaryHeading}>
            <Text style={styles.secondaryHeadingText}>Address</Text>
          </View>
          <View style={styles.userName}>
            <TextInput
              value={schiller}
              textContentType="schiller"
              underlineColorAndroid="transparent"
              placeholder="Schiller"
              style={styles.inputStyle}
              onChangeText={value => setSchiller(value)}></TextInput>
            <TextInput
              value={schiller}
              textContentType="schiller"
              placeholder="zimmer"
              style={styles.inputStyle}
              onChangeText={value => setZimmer(value)}></TextInput>
          </View>
          <DropDownPicker
            items={[
              {
                label: 'Bavaria',
                value: 'Bavaria',
              },
              {
                label: 'Berlin',
                value: 'Berlin',
              },
              {
                label: 'Munich',
                value: 'Munich',
              },
            ]}
            defaultValue={city1}
            containerStyle={{height: '15%'}}
            style={{
              backgroundColor: '#F5F9F8',
              fontSize: RFValue(14, 580),
              color: '#243E3B',
            }}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{
              backgroundColor: '#F5F9F8',
              fontSize: RFValue(14, 580),
              color: '#243E3B',
            }}
            onChangeItem={item => setCity1(item.value)}
          />
          <TextInput
            value={fName}
            textContentType="postalCode"
            underlineColorAndroid="transparent"
            placeholder="Postal Code"
            style={styles.inputStyle1}
            onChangeText={value => setPostalCode(value)}></TextInput>
          <TouchableOpacity style={[styles.container, styles.submitButtonDark]}>
            <Text style={styles.submitText}>Save {'\u2B24'} Continue</Text>
          </TouchableOpacity>
          <View style={styles.saveCloseDiv}>
            <Text style={styles.saveCloseText}>Save & add another member</Text>
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
    </ScrollView>
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
    marginBottom: 4,
    width: '100%',
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
    marginBottom: 14,
  },
  inputStyle1: {
    display: 'flex',

    backgroundColor: '#F5F9F8',
    borderRadius: 6,
    fontSize: RFValue(14, 580),
    color: '#243E3B',
    paddingTop: '4%',
    paddingBottom: '4%',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginBottom: 14,
  },
  gender: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 14,
  },
  container: {
    backgroundColor: 'rgba(243,115,32,1)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 67,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 5,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16,
  },

  submitButtonDark: {
    width: '100%',
    borderRadius: 3,
    backgroundColor: '#212826',
    color: WHITE_COLOR,
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: RFValue(14, 580),
    fontWeight: '600',
  },
  saveCloseText: {
    fontSize: RFValue(14, 580),
    fontWeight: '600',
    color: '#212826',
    marginBottom: 180,
  },
});
