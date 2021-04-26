import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import Orientation from 'react-native-orientation-locker';
import {useIsFocused} from '@react-navigation/native';
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
  const [phoneValue, setPhoneValue] = useState('');
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
      if (phone && phone.match('[0-9]{1,3}(?:.[0-9]{3})*(?:,[0-9]+)?')) {
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
      {isPhone ? (
        <TextInput
          value={phoneValue}
          textContentType="telephoneNumber"
          placeholder="Phone"
          style={styles.inputStyle}
          onChangeText={value => setPhoneValue(value)}></TextInput>
      ) : (
        <TextInput
          value={otpValue}
          textContentType="oneTimeCode"
          placeholder="OTP"
          style={styles.inputStyle}
          onChangeText={value => setOTPValue(value)}></TextInput>
      )}
      <TouchableOpacity
        style={[styles.container, styles.submitButton]}
        onPress={() => onSubmit(isPhone, phoneValue, otpValue)}>
        <Text style={styles.submitText}>Submit</Text>
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
  inputStyle: {
    color: '#000',
    marginLeft: '5.12%',
    paddingRight: '1.6%',
    alignSelf: 'stretch',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#D9D5DC',
    paddingTop: '1.8%',
    paddingBottom: '1.5%',
    fontSize: RFValue(12, 580),
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
    height: '6.57%',
    position: 'absolute',
    left: '8.18%',
    top: '63.55%',
    width: '83.64%',
  },
  submitText: {
    color: '#fff',
    fontSize: RFValue(12, 580),
  },
});
