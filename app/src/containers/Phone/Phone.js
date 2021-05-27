import React, { useEffect, useRef, useState } from 'react';
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
import {
  moveToUserInfoScreenAction,
  resetIsPhoneUpdatedAction,
  sendOTPAction,
  updatePhoneAction,
  verifyOTPAction,
  resetPhoneAction,
  upgradeFamilyAction
} from './Actions';
import {
  send_otp_url,
  update_phone_url,
  upgrade_family_member,
  verify_otp_url,
} from '../../commons/environment';
import { getProfileInfoAction } from '../AppointmentDetails/Action';
import { moveToMainScreenAction } from '../UserInfo/Actions';
import moment from 'moment';

function Phone({
  loader,
  movetoUserInfoScreen,
  navigation,
  route,
  sendOTP,
  otpSend,
  verifyOTP,
  otpVerified,
  errMessage,
  verifyOtpPayload,
  moveToMainScreen,
  sendOptPayload,
  updatePhone,
  userInfo,
  isPhoneUpdated,
  resetIsPhoneUpdated,
  updatePhoneOtpSend,
  updatePhoneSendOptPayload,
  resetPhone,
  upgradeFamilyAction

}) {
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
  const [seconds, setSeconds] = useState(0);
  const [resendOtpState, setresendOtpState] = useState(false);

  const [isUpdateMobileNumber, setIsUpdateMobileNumber] = useState(false);
  const isUpdateMobileNumberRef = useRef();
  isUpdateMobileNumberRef.current = isUpdateMobileNumber;

  const [otpResentAwait, setOtpResentAwait] = useState(false);

  const [secTimeout, setSecTimeout] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    return () => {
      if (secTimeout) clearTimeout(secTimeout);
      resetPhone();
    };
  }, []);

  useEffect(() => {
    if (seconds > 0) {
      setresendOtpState(false);
      if (secTimeout) clearTimeout(secTimeout);
      setSecTimeout(setTimeout(() => setSeconds(seconds - 1), 1000));
    } else {
      setSeconds(0);
      setresendOtpState(true);
    }
  }, [seconds]);

  useEffect(() => {
    Orientation.lockToPortrait();
    if (isFocused) setIsUpdateMobileNumber(route?.params?.isUpdateMobileNumber);
  }, [isFocused]);

  const showToast = msg => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(I18n.t(msg), ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  };

  const onSubmit = (isPhone, phone, otp) => {
    if (isPhone) {
      // Temporary check
      if (true || (phone && phone.match('^[+]49[0-9]{10}$'))) {
        let data = {
          url: send_otp_url,
          editMode: isUpdateMobileNumber,
          body: {
            mobileNumber: phone,
          },
        };
        sendOTP(data);
      } else showToast('Please enter a valid phone number');
    } else {
      if (otp && otp.length == 5) {
        let data = {
          url: isUpdateMobileNumber ? update_phone_url : verify_otp_url,
          body: {
            mobileNumber: phone,
            otp,
            referenceId: sendOptPayload?.data?.data?.ref_id,
          },
        };
        if (isUpdateMobileNumber) {
          data.body['userId'] = userInfo?.data?.data?._id;
          data.body['referenceId'] =
            updatePhoneSendOptPayload?.data?.data?.ref_id;
          updatePhone(data);
        } else {
          console.log(sendOptPayload?.data?.data?.upgradeFamily);
          console.log('asasa');
          if (sendOptPayload?.data?.data?.upgradeFamily) {
            let data = {
              url: upgrade_family_member,
              body: {
                taxId: sendOptPayload?.data?.data?.taxId,
                otp,
                referenceId: sendOptPayload?.data?.data?.ref_id,
              },
            };
            console.log(data);
            upgradeFamilyAction(data);
          }
          else {
            verifyOTP(data);
          }
        }
      } else showToast('Please enter a valid OTP');
    }
  };
  useEffect(() => {
    const isUpdateMobileNumber = route?.params?.isUpdateMobileNumber;
    if (!isUpdateMobileNumber && sendOptPayload?.data?.data?.upgradeFamily) {
      setIsPhone(false);
      setSeconds(119);
      setOtpResentAwait(false);
      showToast('OTP has been sent to your parent account');
    }
  }, [sendOptPayload?.data?.data?.upgradeFamily])

  useEffect(() => {
    if (!isUpdateMobileNumber && (isPhone || otpResentAwait) && otpSend && !sendOptPayload?.data?.data?.upgradeFamily) {
      setIsPhone(false);
      setSeconds(119);
      setOtpResentAwait(false);
      showToast('OTP has been sent successfully');
    }
  }, [otpSend]);

  useEffect(() => {
    if (isPhone && updatePhoneOtpSend) {
      setIsPhone(false);
      setSeconds(119);
      setOtpResentAwait(false);
      showToast('OTP has been sent successfully');
    }
  }, [updatePhoneOtpSend]);

  useEffect(() => {
    if (!isUpdateMobileNumber && !isPhone && otpVerified) {
      movetoUserInfoScreen(navigation, phoneValue);
    }
  }, [otpVerified]);

  useEffect(() => {
    if (errMessage === 'Phone Number already exists.') {
      setIsPhone(true);
      resetIsPhoneUpdated();
    }
    if (errMessage) {
      showToast(errMessage);
    }
  }, [errMessage]);

  useEffect(() => {
    const isUpdateMobileNumber = route?.params?.isUpdateMobileNumber;
    if (!isUpdateMobileNumber && verifyOtpPayload?.data) {
      if (verifyOtpPayload?.data?.data) {
        if (verifyOtpPayload?.data?.data?.isNewAccount) {
          //navigate to userInfoScreen
          movetoUserInfoScreen(navigation, phoneValue);
          resetPhone();
        } else {
          //get userInfo and navigate to MainScreen
          moveToMainScreen(navigation);
          resetPhone();

        }
      } else {
        //navigate to userInfoScreen
        movetoUserInfoScreen(navigation, phoneValue);
        resetPhone();

      }
    }

  }, [verifyOtpPayload]);

  const checkOtpStatus = () => {
    if (resendOtpState) {
      // Temporary check
      if (true || (phoneValue && phoneValue.match('^[+]49[0-9]{10}$'))) {
        let data = {
          url: send_otp_url,
          editMode: isUpdateMobileNumber,
          body: {
            mobileNumber: phoneValue,
          },
        };
        sendOTP(data);
        setOtpResentAwait(true);
      } else showToast('Please enter a valid phone number');
    } else {
      showToast('Please wait for at least 2 minutes');
    }
  };
  useEffect(() => {
    if (isPhoneUpdated) {
      resetIsPhoneUpdated();
      navigation.goBack();
    }
  }, [isPhoneUpdated]);

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
                  {I18n.t('Enter Your Mobile Number')}
                </Text>
                {'\n'}
                {'\n'}
                <Text style={styles.inputLabelSmall}>
                  {/* Please enter your valid phone number to continue */}
                  {I18n.t('Please enter your valid phone number to continue')}
                </Text>
              </Text>
              <TextInput
                value={phoneValue}
                textContentType="telephoneNumber"
                underlineColorAndroid="transparent"
                placeholder={I18n.t('Phone')}
                style={styles.inputStyle1}
                keyboardType="numeric"
                onChangeText={value => {
                  if (value.length > 0) setPhoneValue(value);
                }}></TextInput>
            </>
          ) : (
            <>
              <Text style={styles.inputLabelDiv}>
                <Text style={styles.inputLabel}>{I18n.t('Enter OTP')}</Text>
                {'\n'}
                {'\n'}
                <Text style={styles.inputLabelSmall}>
                  {I18n.t('Please Enter the OTP we have sent over the number')}
                </Text>
              </Text>
              <View
                style={{
                  width: '100%',
                  borderBottomWidth: 0,

                  paddingBottom: '1.5%',
                  fontWeight: '500',
                  marginTop: '9%',
                  marginBottom: '7%',
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
              <TouchableOpacity onPress={() => checkOtpStatus()}>
                <View>
                  <Text style={styles.resendOtpStyle}>
                    {'Resend OTP (' +
                      moment.utc(seconds * 1000).format('mm:ss') +
                      ')'}
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}
          {isPhone ||
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
              <Text style={styles.submitText}>
                {isUpdateMobileNumber
                  ? I18n.t('Update Mobile Number')
                  : I18n.t('Continue')}
              </Text>
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
          {isUpdateMobileNumber ? (
            <TouchableOpacity
              disabled={loader}
              style={[styles.container, styles.cancelButton]}
              onPress={() => navigation.goBack()}>
              <Text style={styles.saveCloseText}>{I18n.t('Cancel')}</Text>
            </TouchableOpacity>
          ) : null}
          {loader ? (
            <View
              style={{
                alignSelf: 'center',
                height: '100%',
                width: '100%',
                justifyContent: 'center',
                position: 'absolute',
                top: '40%',
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
    movetoUserInfoScreen: (navigation, phone) =>
      moveToUserInfoScreenAction(navigation, phone),
    sendOTP: data => dispatch(sendOTPAction(data)),
    verifyOTP: data => dispatch(verifyOTPAction(data)),
    getProfileInfo: data => dispatch(getProfileInfoAction(data)),
    moveToMainScreen: navigation => moveToMainScreenAction(navigation),
    updatePhone: data => dispatch(updatePhoneAction(data)),
    resetIsPhoneUpdated: () => dispatch(resetIsPhoneUpdatedAction()),
    resetPhone: () => dispatch(resetPhoneAction()),
    upgradeFamilyAction: data => dispatch(upgradeFamilyAction(data)),


  };
};

const mapStateToProps = state => {
  return {
    otpSend: state.phoneReducer.otpSend,
    updatePhoneOtpSend: state.phoneReducer.updatePhoneOtpSend,
    otpVerified: state.phoneReducer.otpVerified,
    errMessage: state.phoneReducer.errMessage,
    verifyOtpPayload: state.phoneReducer.verifyOptPayload,
    userInfo: state.mainScreenReducer.userInfo,
    isPhoneUpdated: state.phoneReducer.isPhoneUpdated,
    sendOptPayload: state.phoneReducer.sendOptPayload,
    updatePhoneSendOptPayload: state.phoneReducer.updatePhoneSendOptPayload,
    loader: state.phoneReducer.loader,
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

    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '20%',
    height: '10%',
  },
  innerDiv: {
    paddingTop: '40%',
    paddingBottom: '10%',
    paddingLeft: '5%',
    paddingRight: '5%',
    height: '100%',
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
    marginTop: '10%',
    marginBottom: '10%',
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
  resendOtpStyle: {
    color: '#006970',
    fontSize: RFValue(13, 580),
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '5%',
  },
  cancelButton: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'red',
    color: WHITE_COLOR,
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: RFValue(14, 580),
    fontWeight: '600',
    marginTop: '8%',
    marginBottom: 10,
  },
  saveCloseText: {
    fontSize: RFValue(14, 580),
    fontWeight: '600',
    color: WHITE_COLOR,
  },
});
