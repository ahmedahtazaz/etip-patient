import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import {
  WHITE_COLOR,
  PRIMARY_COLOR,
  GRAY_COLOR,
  BLACK_COLOR,
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
  ToastAndroid,
} from 'react-native';
import I18n from '../../translations/I18n';
import { RFValue } from 'react-native-responsive-fontsize';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioButton from '../../components/RadioButton';
import {
  moveToMainScreenAction,
  signUpAction,
  updateFamilyMemberAction,
  addFamilyMemberAction,
  resetIsUserCreatedAction,
  resetIsFamilyMemberAddedAction,
} from './Actions';
import { emailRegex } from '../../commons/Constants';
import {
  organizationName,
  signup_url,
  add_family_url,
  edit_family_url,
} from '../../commons/environment';
const welcomeLogo = require('../../assets/images/welcome-logo.png');
const welcomeImg = require('../../assets/images/welcome-image.png');
const currentDate = new Date();
function UserInfo({
  loader,
  moveToMainScreen,
  navigation,
  route,
  signUp,
  addFamilyMember,
  userInfo,
  isUserCreated,
  resetIsUserCreated,
  resetIsFamilyMemberAdded,
  isFamilyMemberAdded,
  updateFamilyMember,
  errMessage,
  familyMembers
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
  const [zimmer, setZimmer] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [relation, setRelation] = useState('Wife');
  const [editMode, setEditMode] = useState(false);

  const [isSaveOnly, setIsSaveOnly] = useState(false);

  const scrollRef = useRef();

  useEffect(() => {
    if (errMessage) {
      showToast(errMessage);
    }
  }, [errMessage])

  useEffect(() => {
    const data = (route.params && route.params.data) || '';
    let editUser = route?.params?.editUser || false;

    console.log("data::: ", data)
    if (data) {
      if (!editUser) {
        setIsFamily(true);
      }
      setEditMode(true);
      setFName(data.firstName);
      setLName(data.lastName);
      if (data.gender === 'male') {
        setMale(true);
        setFemale(false);
        setOther(false);
      } else if (data.gender === 'female') {
        setMale(false);
        setFemale(true);
        setOther(false);
      } else {
        setMale(false);
        setFemale(false);
        setOther(true);
      }
      if (data.relation) {
        setRelation(capitalizeFirstLetter(data.relation));
      }
      setDob(data.dateOfBirth);
      setTaxId(data.taxId);
      setEmail(data.email);
      setMobileNo(data.mobileNumber);
      setSchiller(data.address.street);
      setZimmer(data.address.houseNo);
      data.address.city && setCity(capitalizeFirstLetter(data.address.city));
      setPostalCode(data.address.zipCode);
    }
  }, []);

  useEffect(() => {
    Orientation.lockToPortrait();
  }, [isFocused]);

  useEffect(() => {
    if (isUserCreated) {
      if (isSaveOnly) moveToMainScreen(navigation);
      else setIsFamily(true);

      resetIsUserCreated();
    }
  }, [isUserCreated]);

  useEffect(() => {
    if (isFamilyMemberAdded) {
      resetIsFamilyMemberAdded();
      resetForm(true);
    }
  }, [isFamilyMemberAdded]);

  const _handleDatePicked = (e, pickeddate) => {
    const date = new Date(pickeddate);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    setShowCalender(false);
    if (day) setDob(day + '-' + month + '-' + year);
    if (day) setCalDate(date);
  };

  const submit = () => addData();

  const showToast = msg => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  };

  const resetForm = (isFamily = false) => {
    setIsFamily(isFamily);
    setFName('');
    setLName('');
    setMale(false);
    setFemale(true);
    setOther(false);
    if (currentDate)
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
    setZimmer('');
    setRelation('Son');

    scrollRef.current.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const addData = () => {
    let editUser = route?.params?.editUser || false;
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
    if (isFamily && (!mobileNo || !mobileNo.match('^[+]49[0-9]{10}$'))) {
      showToast('Please enter a valid phone number.');
    }
    if (!schiller) {
      showToast('Please Enter schiller');
      return;
    }
    if (!zimmer) {
      showToast('Please Enter zimmer');
      return;
    }
    if (!postalCode) {
      showToast('Please Enter postalcode');
      return;
    }

    let data = {
      url: signup_url,
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
        },
      },
    };
    console.log("isFamily: ", isFamily);
    console.log("editMode: ", editMode)

    if (!isFamily && !editMode) {
      signUp(data);
    } else {
      const dataObj = (route.params && route.params.data) || '';
      let data = {
        url: editMode ? edit_family_url : `${add_family_url}`,
        body: {
          userId: userInfo?.data?.data?._id,
          relation,
          familyId: userInfo?.data?.data?.family.id,
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
          },
        },
      };
      if (!editMode) {
        addFamilyMember(data);
      } else {
        if (editUser) {
         
        }
        data.body['id'] = dataObj['_id'];
        console.log('before dispatching edit: ', data);
        updateFamilyMember(data);
      }
    }
  };

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <ScrollView style={{ height: '100%' }} ref={scrollRef}>
      <View style={styles.background}>
        <View style={styles.innerDiv}>
          <View style={styles.mainHeading}>
            <Text style={styles.mainHeadingText}>
              {!editMode
                ? isFamily
                  ? 'Add Family'
                  : 'User Information'
                : 'Edit Family'}
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
                placeholderTextColor={'#a29d9d'}
                value={fName}
                textContentType="givenName"
                underlineColorAndroid="transparent"
                placeholder="First Name"
                style={styles.inputStyle}
                onChangeText={value => setFName(value)}></TextInput>
              <TextInput
                placeholderTextColor={'#a29d9d'}
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
                color: '#a29d9d',
              }}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{
                backgroundColor: '#F5F9F8',
                fontSize: RFValue(14, 580),
                color: '#a29d9d',
              }}
              onChangeItem={item => setRelation(item.value)}
            />
          ) : null}
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
            placeholder="Tax ID"
            style={styles.inputStyle1}
            onChangeText={value => setTaxId(value)}></TextInput>
          <TextInput
            placeholderTextColor={'#a29d9d'}
            value={email}
            textContentType="email"
            underlineColorAndroid="transparent"
            placeholder="Email"
            style={styles.inputStyle1}
            onChangeText={value => setEmail(value)}></TextInput>
          <TextInput
            placeholderTextColor={'#a29d9d'}
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
              color: '#a29d9d',
            }}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{
              backgroundColor: '#F5F9F8',
              fontSize: RFValue(14, 580),
              color: '#a29d9d',
            }}
            onChangeItem={item => setCity(item.value)}
          />
          <TextInput
            placeholderTextColor={'#a29d9d'}
            value={postalCode}
            textContentType="postalCode"
            underlineColorAndroid="transparent"
            placeholder="Postal Code"
            style={styles.inputStyle2}
            onChangeText={value => setPostalCode(value)}></TextInput>
          {editMode ? (
            <TouchableOpacity
              disabled={loader}
              style={[styles.container, styles.submitButtonDark]}
              onPress={() => addData()}>
              <Text style={styles.saveCloseText}>Update</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                disabled={loader}
                style={[styles.container, styles.submitButtonDark]}
                onPress={() => {
                  if (userInfo) {
                    moveToMainScreen(navigation)
                  } else {
                    setIsSaveOnly(true);
                    submit();
                  }
                }}>
                <Text style={styles.saveCloseText}>Continue</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={userInfo && !Object.keys(userInfo).length}
                style={{ marginTop: '4%', alignContent: 'center' }}
                onPress={() => {
                  setIsSaveOnly(false);
                  submit();
                }}>
                <Text style={styles.saveAddText}>
                  {isFamily ? 'Save & add another member' : 'Save & Add Family'}
                </Text>
              </TouchableOpacity>
            </>
          )}
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
  return {
    moveToMainScreen: navigation => moveToMainScreenAction(navigation),
    signUp: user => dispatch(signUpAction(user)),
    addFamilyMember: data => dispatch(addFamilyMemberAction(data)),
    updateFamilyMember: data => dispatch(updateFamilyMemberAction(data)),
    resetIsUserCreated: () => dispatch(resetIsUserCreatedAction()),
    resetIsFamilyMemberAdded: () => dispatch(resetIsFamilyMemberAddedAction()),
  };
};

const mapStateToProps = state => {
  return {
    userInfo: state.userInfoReducer.userInfo,
    familyMembers: state.userInfoReducer.familyMembers,
    loader: state.userInfoReducer.loader,
    isUserCreated: state.userInfoReducer.isUserCreated,
    isFamilyMemberAdded: state.userInfoReducer.isFamilyMemberAdded,
    errMessage: state.userInfoReducer.errMessage
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);

// Style for "Background"
const styles = StyleSheet.create({
  background: {
    backgroundColor: WHITE_COLOR,
    paddingTop: '9%',
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
});
