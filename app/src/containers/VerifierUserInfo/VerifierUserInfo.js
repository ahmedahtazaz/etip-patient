import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import {
  WHITE_COLOR,
  PRIMARY_COLOR,
  GRAY_COLOR,
  BLACK_COLOR,
  LIGHT_GREY,
} from '../../theme/Colors';

import Orientation from 'react-native-orientation-locker';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioButton from '../../components/RadioButton';
import { moveToMainScreenAction } from './Actions';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
const welcomeLogo = require('../../assets/images/welcome-logo.png');
const welcomeImg = require('../../assets/images/welcome-image.png');
const currentDate = new Date();
const { width, height } = Dimensions.get('window');

function VerifierUserInfo({
  navigation,
  loader
}) {
  const [isFamily, setIsFamily] = useState(false);
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(true);
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
  const isFocused = useIsFocused();
  const [taxId, setTaxId] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [schiller, setSchiller] = useState('');
  const [zimmer, setzimmer] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [relation, setRelation] = useState('Wife');

  const scrollRef = useRef();

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
    <ScrollView style={{ height: '100%' }} ref={scrollRef}>
      <View style={styles.background}>
        <View style={styles.innerDiv}>
          <View style={styles.header}>
            <View style={styles.backIcon}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <EvilIcons name="chevron-left" color="#000" size={27} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerTextView}>
              <Text style={styles.headerText}>User Information</Text>
            </View>
          </View>


          <View style={{ backgroundColor: "#F5F9F8" }}>

            <View style={styles.infoContainerChild}>
              <View style={styles.mainHeading}>
                <Text style={styles.mainHeadingText}>
                  USER INFORMATION
              </Text>
              </View>
              <View style={styles.formContainer}>
                <View style={styles.userName}>
                  <TextInput
                    placeholderTextColor={BLACK_COLOR}
                    value={fName}
                    textContentType="givenName"
                    underlineColorAndroid="transparent"
                    placeholder="First Name"
                    style={styles.inputStyle}
                    onChangeText={value => setFName(value)}></TextInput>
                  <TextInput
                    placeholderTextColor={BLACK_COLOR}
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
                    data="Female"
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
              </View>
              {isFamily ? (
                <DropDownPicker
                  items={[
                    {
                      label: 'Brother',
                      value: 'Brother',
                    },
                    {
                      label: 'Sister',
                      value: 'Sister',
                    },
                    {
                      label: 'Mother',
                      value: 'Mother',
                    },
                    {
                      label: 'Father',
                      value: 'Father',
                    },
                    {
                      label: 'Son',
                      value: 'Son',
                    },
                    {
                      label: 'Daughter',
                      value: 'Daughter',
                    },
                    {
                      label: 'Wife',
                      value: 'Wife',
                    },
                  ]}
                  defaultValue={relation}
                  containerStyle={{ height: '6%', marginBottom: '4%' }}
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
                  onChangeItem={item => setRelation(item.value)}
                />
              ) : null}
              <TextInput
                placeholderTextColor={BLACK_COLOR}
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
                placeholderTextColor={BLACK_COLOR}
                value={taxId}
                textContentType="taxId"
                underlineColorAndroid="transparent"
                placeholder="Tax ID"
                style={styles.inputStyle1}
                onChangeText={value => setTaxId(value)}></TextInput>
              <TextInput
                placeholderTextColor={BLACK_COLOR}
                value={email}
                textContentType="email"
                underlineColorAndroid="transparent"
                placeholder="Email"
                style={styles.inputStyle1}
                onChangeText={value => setEmail(value)}></TextInput>
              <TextInput
                placeholderTextColor={BLACK_COLOR}
                value={mobileNo}
                textContentType="mobileNo"
                underlineColorAndroid="transparent"
                placeholder="Mobile No"
                style={styles.inputStyle1}
                onChangeText={value => setMobileNo(value)}></TextInput>
              <View style={styles.secondaryHeading}>
                <Text style={styles.secondaryHeadingText}>ADDRESS</Text>
              </View>
              <View style={styles.userName}>
                <TextInput
                  placeholderTextColor={BLACK_COLOR}
                  value={schiller}
                  textContentType="schiller"
                  underlineColorAndroid="transparent"
                  placeholder="Schiller"
                  style={styles.inputStyle}
                  onChangeText={value => setSchiller(value)}></TextInput>
                <TextInput
                  placeholderTextColor={BLACK_COLOR}
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
                  {
                    label: 'Frankfurt',
                    value: 'Frankfurt',
                  },
                  {
                    label: 'Leipzig',
                    value: 'Leipzig',
                  },
                ]}
                defaultValue={city}
                containerStyle={{ height: '5%' }}
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
              <TextInput
                placeholderTextColor={BLACK_COLOR}
                value={fName}
                textContentType="postalCode"
                underlineColorAndroid="transparent"
                placeholder="Postal Code"
                style={styles.inputStyle2}
                onChangeText={value => setPostalCode(value)}></TextInput>
              <TouchableOpacity
                style={[styles.container, styles.submitButtonDark]}
                onPress={() => {
                  setIsFamily(true);
                  setFName('');
                  setLName('');
                  setMale(true);
                  setFemale(false);
                  setOther(false);
                  setDob(
                    currentDate.getDate() +
                    '-' +
                    currentDate.getMonth() +
                    '-' +
                    currentDate.getFullYear(),
                  );
                  setCalDate(new Date());
                  setCity('Bavaria');
                  setEmail('');
                  setTaxId('');
                  setPostalCode('');
                  setMobileNo('');
                  setSchiller('');
                  setzimmer('');
                  setRelation('Son');
                  scrollRef.current.scrollTo({
                    y: 0,
                    animated: true,
                  });
                  navigation.navigate("TestInformationScreen")
                }}>
                <Text style={styles.saveCloseText}>Continue</Text>
              </TouchableOpacity>
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
        </View>
      </View>
    </ScrollView>
  );
}

export default VerifierUserInfo;

// Style for "Background"
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    height: height * 0.1,
    alignItems: "center",
    width,
    backgroundColor: "#F5F9F8"
  },
  backIcon: {
    flex: 1,
    alignItems: "flex-start"
  },
  headerTextView: {
    flex: 9,
    alignItems: "center",
    paddingRight: width * 0.1
  },
  headerText: {
    fontSize: RFValue(16, 580),

  },
  background: {
    backgroundColor: WHITE_COLOR,
    // paddingTop: '9%',
    // paddingLeft: '5%',
    // paddingRight: '5%',
  },

  mainHeadingText: {
    fontSize: RFValue(13, 580),
    color: LIGHT_GREY,
    marginTop: 10,
    marginBottom: 13
  },
  smallHeadingText: {
    fontSize: RFValue(12, 580),
    color: GRAY_COLOR,
    fontWeight: '400',
    paddingTop: '2%',
    paddingBottom: '7%',
  },
  secondaryHeadingText: {
    fontSize: RFValue(13, 580),
    color: LIGHT_GREY,
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
    fontSize: RFValue(12, 580),
    color: '#243E3B',
    paddingTop: '3%',
    paddingBottom: '3%',
    paddingLeft: '4%',
    paddingRight: '4%',
    marginBottom: 14,
  },
  inputStyle1: {
    display: 'flex',
    backgroundColor: '#F5F9F8',
    borderRadius: 6,
    fontSize: RFValue(12, 580),
    color: '#243E3B',
    paddingTop: '3%',
    paddingBottom: '3%',
    paddingLeft: '4%',
    paddingRight: '4%',
    marginBottom: 14,
    fontWeight: '300',
  },
  inputStyle2: {
    display: 'flex',
    backgroundColor: '#F5F9F8',
    borderRadius: 6,
    fontSize: RFValue(12, 580),
    color: '#243E3B',
    paddingTop: '3%',
    paddingBottom: '3%',
    paddingLeft: '4%',
    paddingRight: '4%',
    marginBottom: 14,
    marginTop: '4%',
    fontWeight: '300',
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
    borderRadius: 10,
    backgroundColor: '#006970',
    color: WHITE_COLOR,
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: RFValue(14, 580),
    fontWeight: '600',
    marginTop: '8%',
  },
  saveCloseText: {
    fontSize: RFValue(14, 580),
    fontWeight: '600',
    color: WHITE_COLOR,
  },
  saveAddText: {
    fontSize: RFValue(14, 580),
    fontWeight: '600',
    color: '#006970',
    marginBottom: 180,
    textAlign: 'center',
  },
  infoContainerChild: {
    paddingTop: 30,
    borderWidth: 1,
    borderColor: "#f2f4f3",
    // height: height * 0.9,
    width,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff"
  },
});