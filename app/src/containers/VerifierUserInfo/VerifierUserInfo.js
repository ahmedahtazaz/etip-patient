import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import {
  WHITE_COLOR,
  PRIMARY_COLOR,
  GRAY_COLOR,
  BLACK_COLOR,
  LIGHT_GREY,
} from '../../theme/Colors';
import I18n from '../../translations/I18n';

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
  Dimensions,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioButton from '../../components/RadioButton';
import { moveToMainScreenAction } from './Actions';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { emailRegex, showToast } from '../../commons/Constants';
import { getRegionsAction, resetIsUserCreatedAction } from '../UserInfo/Actions';
import { get_regions, organizationName, signup_url } from '../../commons/environment';
import { createUserAction } from './Action';
const welcomeLogo = require('../../assets/images/welcome-logo.png');
const welcomeImg = require('../../assets/images/welcome-image.png');
const currentDate = new Date();
const { width, height } = Dimensions.get('window');

function VerifierUserInfo({
  navigation,
  loader,
  getRegions,
  regions,
  createUser,
  errMessage,
  isUserCreated,
  resetIsUserCreated,
  userData
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
   (currentDate.getMonth()+1) +
    '-' +
    currentDate.getFullYear(),
  );
  const [showCalender, setShowCalender] = useState(false);
  const [calDate, setCalDate] = useState(new Date());
  const [city, setCity] = useState('Berlin');
  const isFocused = useIsFocused();
  const [taxId, setTaxId] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [schiller, setSchiller] = useState('');
  const [zimmer, setZimmer] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [relation, setRelation] = useState('Wife');

  const scrollRef = useRef();

  useEffect(() => {
    Orientation.lockToPortrait();
  }, [isFocused]);

  useEffect(() => {
    let data = {
      url: get_regions
    }
    getRegions(data)
  }, [])

  const _handleDatePicked = (e, pickeddate) => {
    const date = new Date(pickeddate);
    const day = date.getDate();
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    setShowCalender(false);
    if (day) setDob(day + '-' + month + '-' + year);
    if (day) setCalDate(date);
  };

  const continueHandler = () => {
    if (!fName) {
      showToast('Please Enter First Name');
      return;
    }
    if (!lName) {
      showToast('Please Enter Last Name');
      return;
    }
    if (!taxId) {
      showToast('Please Enter Tax ID');
      return;
    }
    if (!email || !email.match(emailRegex)) {
      showToast('Please Enter a valid email');
      return;
    }

    if (!mobileNo || !mobileNo.match('^[+]49[0-9]{10}$')) {
      showToast('Please enter a valid phone number');
      return;
    }
    if (!schiller) {
      showToast('Please Enter street');
      return;
    }
    if (!zimmer) {
      showToast('Please Enter house no');
      return;
    }
    if (!postalCode) {
      showToast('Please Enter postal code');
      return;
    }

    let data = {
      body: {
        organizationName: organizationName,
        firstName: fName,
        lastName: lName,
        taxId,
        email,
        mobileNumber: mobileNo,
        dateOfBirth: dob,
        gender: male ? 'male' : female ? 'female' : 'other',
        address: {
          street: schiller,
          houseNo: zimmer,
          city,
          zipCode: postalCode,
        }
      },
      url: `https://hlf-backend-1.azurewebsites.net/${signup_url}`
    }


    console.log("data: ", data);
    createUser(data);
  }

  useEffect(() => {
    if (errMessage) {
      showToast(errMessage);
    }
  }, [errMessage]);

  useEffect(() => {
    if (isUserCreated) {
      showToast('user created');
      navigation.navigate('AppointmentCalender', { candidate: userData, userInfo: userData, fromVerifierUserInfo: true })
      resetIsUserCreated()
    }
  }, [isUserCreated]);

  return (
    <ScrollView style={{ height: '100%' }} ref={scrollRef}>
      <View style={styles.background}>
        <View style={styles.innerDiv}>
          <View style={styles.header}>
            <View style={styles.backIcon}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <EvilIcons
                  name="chevron-left"
                  color="#000"
                  fontWeight="bold"
                  size={40}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.headerTextView}>
              <Text style={styles.headerText}>{I18n.t('User Information')}</Text>
            </View>
          </View>

          <View style={{ backgroundColor: '#F5F9F8' }}>
            <View style={styles.infoContainerChild}>
              <View style={styles.mainHeading}>
                <Text style={styles.mainHeadingText}>{I18n.t('USER INFORMATION')}</Text>
              </View>
              <View style={styles.formContainer}>
                <View style={styles.userName}>
                  <TextInput
                    placeholderTextColor={'#a29d9d'}
                    value={fName}
                    textContentType="givenName"
                    underlineColorAndroid="transparent"
                    placeholder={I18n.t("First Name")}
                    style={styles.inputStyle}
                    onChangeText={value => setFName(value)}></TextInput>
                  <TextInput
                    placeholderTextColor={'#a29d9d'}
                    value={lName}
                    textContentType="familyName"
                    placeholder={I18n.t("Last Name")}
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
              <TextInput
                placeholderTextColor={'#a29d9d'}
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
                placeholderTextColor={'#a29d9d'}
                value={taxId}
                textContentType="taxId"
                underlineColorAndroid="transparent"
                placeholder={I18n.t("Tax ID")}
                style={styles.inputStyle1}
                onChangeText={value => setTaxId(value)}></TextInput>
              <TextInput
                placeholderTextColor={'#a29d9d'}
                value={email}
                textContentType="email"
                underlineColorAndroid="transparent"
                placeholder={I18n.t("Email")}
                style={styles.inputStyle1}
                onChangeText={value => setEmail(value)}></TextInput>
              <TextInput
                placeholderTextColor={'#a29d9d'}
                value={mobileNo}
                textContentType="mobileNo"
                underlineColorAndroid="transparent"
                placeholder={I18n.t("Mobile No")}
                style={styles.inputStyle1}
                onChangeText={value => setMobileNo(value)}></TextInput>
              <View style={styles.secondaryHeading}>
                <Text style={styles.secondaryHeadingText}>{I18n.t('ADDRESS')}</Text>
              </View>
              <View style={styles.userName}>
                <TextInput
                  placeholderTextColor={'#a29d9d'}
                  value={schiller}
                  textContentType="schiller"
                  underlineColorAndroid="transparent"
                  placeholder="Schiller"
                  style={styles.inputStyle}
                  onChangeText={value => setSchiller(value)}></TextInput>
                <TextInput
                  placeholderTextColor={'#a29d9d'}
                  value={zimmer}
                  textContentType="schiller"
                  placeholder="zimmer"
                  style={styles.inputStyle}
                  onChangeText={value => setZimmer(value)}></TextInput>
              </View>
              <DropDownPicker
                items={regions}
                defaultValue={city}
                containerStyle={{ height: 48 }}
                style={{
                  backgroundColor: '#F5F9F8',
                  fontSize: RFValue(14, 580),
                  color: '#243E3B',
                  borderColor: '#F5F9F8'
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
                placeholderTextColor={'#a29d9d'}
                value={postalCode}
                textContentType="postalCode"
                underlineColorAndroid="transparent"
                placeholder={I18n.t("Postal Code")}
                style={styles.inputStyle2}
                onChangeText={value => setPostalCode(value)}></TextInput>
              <TouchableOpacity
                style={[styles.container, styles.submitButtonDark]}
                onPress={continueHandler}>
                <Text style={styles.saveCloseText}>{I18n.t('Continue')}</Text>
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
                  <ActivityIndicator
                    size="large"
                    color="grey"
                    animating={loader}
                  />
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    getRegions: data => dispatch(getRegionsAction(data)),
    createUser: data => dispatch(createUserAction(data)),
    resetIsUserCreated: () => dispatch(resetIsUserCreatedAction())
  };
};

const mapStateToProps = state => {
  return {
    regions: state.userInfoReducer.regions,
    errMessage: state.verifierUserInfoReducer.errMessage,
    loader: state.verifierUserInfoReducer.loader,
    isUserCreated: state.verifierUserInfoReducer.isUserCreated,
    userData: state.verifierUserInfoReducer.userData
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifierUserInfo);

// Style for "Background"
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: height * 0.1,
    alignItems: 'center',
    paddingTop: 30,
    width,
    backgroundColor: '#F5F9F8',
  },
  backIcon: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerTextView: {
    flex: 9,
    alignItems: 'center',
    paddingRight: width * 0.1,
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
    marginBottom: 13,
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
    marginTop: 20,
    borderColor: '#f2f4f3',
    // height: height * 0.9,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
});
