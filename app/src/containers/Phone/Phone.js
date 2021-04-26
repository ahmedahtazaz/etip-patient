import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import Orientation from 'react-native-orientation-locker';
import {useIsFocused} from '@react-navigation/native';
import {PRIMARY_COLOR, GRAY_COLOR, WHITE_COLOR} from '../../theme/Colors';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  TextInput,
  Platform,
  ToastAndroid,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {moveToUserInfoScreenAction} from './Actions';

function Phone({loader, movetoUserInfoScreen, navigation}) {
  const [isPhone, setIsPhone] = useState(true);
  const [phoneValue, setPhoneValue] = useState('+49');
  const [otpValue, setOTPValue] = useState('');

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
      } else showToast('Please enter a valid phone number.');
    } else {
      if (otp && otp.length == 5) {
        movetoUserInfoScreen(navigation);
      } else showToast('Please enter a valid OTP.');
    }
  };

  return (
    <View style={styles.background}>
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
                Please Enter your Phone Number to continue
              </Text>
            </Text>
            <TextInput
              value={phoneValue}
              textContentType="telephoneNumber"
              underlineColorAndroid="transparent"
              placeholder="Phone"
              style={styles.inputStyle}
              onChangeText={value => setPhoneValue(value)}></TextInput>
          </>
        ) : (
          <>
            <Text style={styles.inputLabelDiv}>
              <Text style={styles.inputLabel}>Enter OTP</Text>
              {'\n'}
              {'\n'}
              <Text style={styles.inputLabelSmall}>
                Please Enter the OTP we have sent over the numuber{' '}
              </Text>
            </Text>
            <TextInput
              value={otpValue}
              textContentType="oneTimeCode"
              placeholder="OTP"
              style={styles.inputStyle}
              onChangeText={value => setOTPValue(value)}></TextInput>
          </>
        )}
        {(isPhone && phoneValue.match('^[+]49[0-9]{10}$')) ||
        (!isPhone && otpValue.length == 5) ? (
          <TouchableOpacity
            style={[styles.container, styles.submitButtonDark]}
            onPress={() => onSubmit(isPhone, phoneValue, otpValue)}>
            <Text style={styles.submitText}>Continue</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.container, styles.submitButton]}
            onPress={() => onSubmit(isPhone, phoneValue, otpValue)}>
            <Text style={styles.submitText}>Continue</Text>
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
    </View>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    movetoUserInfoScreen: navigation => moveToUserInfoScreenAction(navigation),
  };
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Phone);

// Style for "Background"
const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
  },
  innerDiv: {
    paddingTop: '12%',
    paddingBottom: '10%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  inputLabelDiv: {
    display: 'flex',
    height: 100,
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: RFValue(20, 580),
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
  },
  inputLabelSmall: {
    fontSize: RFValue(10, 580),
    fontWeight: 'bold',
    color: GRAY_COLOR,
    paddingTop: 15,
  },
  inputStyle: {
    color: '#000',

    display: 'flex',
    borderBottomWidth: 0,
    paddingTop: '1.8%',
    paddingBottom: '1.5%',
    fontSize: RFValue(24, 580),
    fontWeight: '500',
    marginTop: '15%',
    marginBottom: '15%',
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
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16,
  },
  submitButton: {
    width: '100%',
    borderRadius: 3,
    backgroundColor: '#EDEDED',
    color: WHITE_COLOR,
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: RFValue(14, 580),
  },
  submitButtonDark: {
    width: '100%',
    borderRadius: 3,
    backgroundColor: '#212826',
    color: WHITE_COLOR,
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: RFValue(14, 580),
  },
  submitText: {
    color: '#fff',
    fontSize: RFValue(12, 580),
  },
});
