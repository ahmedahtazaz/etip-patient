import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import I18n from '../../translations/I18n';

import Orientation from 'react-native-orientation-locker';
import { useIsFocused } from '@react-navigation/native';
import { PRIMARY_COLOR, GRAY_COLOR, WHITE_COLOR } from '../../theme/Colors';
const headerLogo = require('../../assets/images/header-logo.png');
const phoneDivBg = require('../../assets/images/phone-div-bg.png');
import {
  ActivityIndicator,
  View,
  StyleSheet,
  TextInput,
  Platform,
  ToastAndroid,
  Alert,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { moveToUserInfoScreenAction, sendOTPAction, verifyOTPAction } from './Actions';
import { send_otp_url, verify_otp_url } from '../../commons/environment';

function Phone({ loader, movetoUserInfoScreen, navigation, sendOTP, otpSend, verifyOTP, otpVerified }) {
  const [isPhone, setIsPhone] = useState(true);
  const [phoneValue, setPhoneValue] = useState('+49');
  const [otpValue, setOTPValue] = useState('');
  const [otpValue1, setOTPValue1] = useState('');
  const [otpValue2, setOTPValue2] = useState('');
  const [otpValue3, setOTPValue3] = useState('');
  const [otpValue4, setOTPValue4] = useState('');

  const [otp, setOtp] = useState(null);
  const [otp1, setOtp1] = useState(null);
  const [otp2, setOtp2] = useState(null);
  const [otp3, setOtp3] = useState(null);
  const [otp4, setOtp4] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    Orientation.lockToPortrait();
  }, [isFocused]);

  const showToast = msg => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  };

  const onSubmit = (isPhone, phone, otp) => {
    if (isPhone) {
      if (phone && phone.match('^[+]49[0-9]{10}$')) {
        setIsPhone(false);
        let data = {
          url: send_otp_url,
          body: {
            mobileNumber: phone
          }
        }
        sendOTP(data)
      } else showToast('Please enter a valid phone number.');
    } else {
      if (otp && otp.length == 5) {
        console.log("otp: ", otp)
        let data = {
          url: verify_otp_url,
          body: {
            mobileNumber: phone,
            otp,
            referenceId: "608c899a94122fa7a3eeacfe"
          }
        }
        verifyOTP(data);
        movetoUserInfoScreen(navigation);
      } else showToast('Please enter a valid OTP.');
    }
  };

  useEffect(() => {
    if (isPhone && otpSend) {
      setIsPhone(false);
    }
  }, [otpSend]);


  useEffect(() => {
    if (!isPhone && otpVerified) {
      movetoUserInfoScreen(navigation);
    }
  }, [otpVerified])

  return (
    <View style={styles.background}>
      <View style={styles.mainMenu}>

        <Image source={headerLogo} />

      </View>
      <ImageBackground source={phoneDivBg} style={styles.splashbackground}>
        <View style={styles.innerDiv}>
          {isPhone ? (
            <>
              <Text style={styles.inputLabelDiv}>
                <Text style={styles.inputLabel}>
                  Enter Your{'\n'}
                Mobile Number
              </Text>
                {'\n'}
                {'\n'}
                <Text style={styles.inputLabelSmall}>
                  {/* Please enter your valid phone number to continue */}
                 { I18n.t('Please enter a valid phone number')}
              </Text>
              </Text>
              <TextInput
                value={phoneValue}
                textContentType="telephoneNumber"
                underlineColorAndroid="transparent"
                placeholder="Phone"
                style={styles.inputStyle1}
                keyboardType="numeric"
                onChangeText={value => setPhoneValue(value)}></TextInput>
            </>
          ) : (
            <>
              <Text style={styles.inputLabelDiv}>
                <Text style={styles.inputLabel}>Enter OTP</Text>
                {'\n'}
                {'\n'}
                <Text style={styles.inputLabelSmall}>
                {I18n.t('Please Enter the OTP we have sent over the numuber')}
                </Text>
              </Text>
              <View
                style={{
                  width: '100%',
                  borderBottomWidth: 0,
                  paddingTop: '1.8%',
                  paddingBottom: '1.5%',
                  fontWeight: '500',
                  marginTop: '15%',
                  marginBottom: '15%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  ref={input => setOtp(input)}
                  value={otpValue}
                  maxLength={1}
                  underlineColorAndroid="transparent"
                  textContentType="oneTimeCode"
                  placeholder="0"
                  style={styles.inputStyle}
                  keyboardType="numeric"
                  onChangeText={value => {
                    setOTPValue(value);
                    if (otp1 && value) otp1.focus();
                  }}></TextInput>
                <TextInput
                  ref={input => setOtp1(input)}
                  value={otpValue1}
                  maxLength={1}
                  underlineColorAndroid="transparent"
                  textContentType="oneTimeCode"
                  placeholder="0"
                  style={styles.inputStyle}
                  keyboardType="numeric"
                  onChangeText={value => {
                    setOTPValue1(value);
                    if (otp2 && value) otp2.focus();
                    else if (!value) otp.focus();
                  }}></TextInput>
                <TextInput
                  ref={input => setOtp2(input)}
                  value={otpValue2}
                  maxLength={1}
                  underlineColorAndroid="transparent"
                  textContentType="oneTimeCode"
                  placeholder="0"
                  style={styles.inputStyle}
                  keyboardType="numeric"
                  onChangeText={value => {
                    setOTPValue2(value);
                    if (otp3 && value) otp3.focus();
                    else if (!value) otp1.focus();
                  }}></TextInput>
                <TextInput
                  ref={input => setOtp3(input)}
                  value={otpValue3}
                  maxLength={1}
                  underlineColorAndroid="transparent"
                  textContentType="oneTimeCode"
                  placeholder="0"
                  style={styles.inputStyle}
                  keyboardType="numeric"
                  onChangeText={value => {
                    setOTPValue3(value);
                    if (otp4 && value) otp4.focus();
                    else if (!value) otp2.focus();
                  }}></TextInput>
                <TextInput
                  ref={input => setOtp4(input)}
                  value={otpValue4}
                  textContentType="oneTimeCode"
                  maxLength={1}
                  underlineColorAndroid="transparent"
                  placeholder="0"
                  style={styles.inputStyle}
                  keyboardType="numeric"
                  onChangeText={value => {
                    setOTPValue4(value);
                    if (!value) otp3.focus();
                  }}></TextInput>
              </View>
            </>
          )}
          {(isPhone && phoneValue.match('^[+]49[0-9]{10}$')) ||
            (!isPhone &&
              otpValue
                .concat(otpValue1)
                .concat(otpValue2)
                .concat(otpValue3)
                .concat(otpValue4).length == 5) ? (
            <TouchableOpacity
              style={[styles.container, styles.submitButtonDark]}
              onPress={() =>
                onSubmit(
                  isPhone,
                  phoneValue,
                  otpValue
                    .concat(otpValue1)
                    .concat(otpValue2)
                    .concat(otpValue3)
                    .concat(otpValue4),
                )
              }>
              <Text style={styles.submitText}>{I18n.t('Continue')}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.container, styles.submitButton]}
              onPress={() =>
                onSubmit(
                  isPhone,
                  phoneValue,
                  otpValue
                    .concat(otpValue1)
                    .concat(otpValue2)
                    .concat(otpValue3)
                    .concat(otpValue4),
                )
              }>
              <Text style={styles.submitText}>{I18n.t('Continue')}</Text>
            </TouchableOpacity>
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
      </ImageBackground>
    </View>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    movetoUserInfoScreen: navigation => moveToUserInfoScreenAction(navigation),
    sendOTP: data => dispatch(sendOTPAction(data)),
    verifyOTP: data => dispatch(verifyOTPAction(data))
  };
};

const mapStateToProps = state => {
  return {
    otpSend: state.phoneReducer.otpSend,
    otpVerified: state.phoneReducer.otpVerified
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Phone);

// Style for "Background"
const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
  },
  splashbackground: {
    flex: 1,
    resizeMode: 'cover',

  },
  mainMenu: {
    position: 'absolute',
    zIndex: 2000,
    top: '5%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '5%',
  },
  innerDiv: {
    paddingTop: '35%',
    paddingBottom: '10%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  inputLabelDiv: {
    display: 'flex',

    flexDirection: 'column',
    alignItems: 'center',
    paddingRight: '10%',
  },
  inputLabel: {
    fontSize: RFValue(20, 580),
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
  },
  inputLabelSmall: {
    fontSize: RFValue(12, 580),
    color: GRAY_COLOR,
    lineHeight: 20,
  },
  inputStyle1: {
    color: '#319085',
    display: 'flex',
    borderBottomWidth: 0,
    paddingTop: '1.8%',
    paddingBottom: '1.5%',
    fontSize: RFValue(24, 580),
    fontWeight: '500',
    marginTop: '15%',
    marginBottom: '15%',
  },
  inputStyle: {
    color: '#319085',
    display: 'flex',
    borderBottomWidth: 1,
    paddingTop: '1.8%',
    paddingBottom: '1.5%',
    fontSize: RFValue(24, 580),
    fontWeight: '500',
    marginTop: '1%',
    marginBottom: '5%',
    textAlign: 'center',
    borderBottomColor: '#000000',
    width: '17%',
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
  submitButton: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#4c959a',
    color: WHITE_COLOR,
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: RFValue(14, 580),
    fontWeight: '600',
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
  },
  submitText: {
    color: '#fff',
    fontSize: RFValue(14, 580),
    fontWeight: '600',
  },
});
