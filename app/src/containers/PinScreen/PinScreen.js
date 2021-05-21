import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
  TextInput,
  ActivityIndicator
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { useIsFocused } from '@react-navigation/native';
import Foundation from 'react-native-vector-icons/Foundation';
import { RFValue } from 'react-native-responsive-fontsize';
import I18n from '../../translations/I18n';
import {
  GREEN_COLOR,
  WHITE_COLOR,
  PRIMARY_COLOR,
  GRAY_COLOR,
} from '../../theme/Colors';
import { connect } from 'react-redux';
import { verify_pin_url } from '../../commons/environment';
import { verifyPinAction } from './Action';
import { showToast } from '../../commons/Constants';
const headerLogo = require('../../assets/images/header-logo.png');
const phoneDivBg = require('../../assets/images/phone-div-bg.png');
const { width, height } = Dimensions.get('window');

function PinScreen({
  navigation,
  verifyPin,
  loader,
  isPinVerified,
  errMessage
}) {
  const [pin, setPin] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    Orientation.lockToPortrait();
  }, [isFocused]);

  const verifyInputPin = () => {
    let data = {
      url: `${verify_pin_url}/${pin}`
    }
    verifyPin(data);
    // navigation.navigate("TestCenter");
  }

  useEffect(() => {
    if (isPinVerified) {
      navigation.replace("TestCenter");
    }
  }, [isPinVerified]);

  useEffect(() => {
    if (errMessage) {
      showToast(errMessage);
    }
  }, [errMessage]);

  return (
    <View style={styles.MainContainer}>
      <View style={styles.mainMenu}>
        <Image source={headerLogo} />
      </View>
      <ImageBackground source={phoneDivBg} style={styles.splashbackground}>
        <View style={styles.pinSection}>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.heading}>{I18n.t('Enter your')}</Text>
            <Text style={styles.heading}>{I18n.t('secret pin to continue')}</Text>
          </View>
          <View style={styles.lableView}>
            <Text style={styles.labe}>{I18n.t('Please enter your secret pin to')}</Text>
            <Text style={styles.label}>{I18n.t('continue')}</Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <TextInput
              placeholderTextColor={'#dfe1e1'}
              placeholder={'000000'}
              style={styles.pinStyle}
              value={pin}
              onChangeText={e => setPin(e)}
              keyboardType="numeric"
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <TouchableOpacity
              onPress={() => verifyInputPin()}
              disabled={pin.length !== 6}
              style={{
                ...styles.btnStyle,
                backgroundColor: pin.length !== 6 ? '#4b9499' : GREEN_COLOR,
              }}>
              <Text style={styles.submitText}>{I18n.t('Continue')}</Text>
            </TouchableOpacity>
          </View>
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
      </ImageBackground>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    isPinVerified: state.pinScreenReducer.isPinVerified,
    loader: state.pinScreenReducer.loader,
    errMessage: state.pinScreenReducer.errMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    verifyPin: data => dispatch(verifyPinAction(data))
  }
}

const styles = StyleSheet.create({
  MainContainer: {
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
    marginTop:50
  },
  pinStyle: {
    display: 'flex',
    borderBottomWidth: 0,
    paddingTop: '1.8%',
    paddingBottom: '1.5%',
    fontSize: RFValue(24, 580),
    fontWeight: 'bold',
    color: '#319085',
    marginTop: '10%',
    marginBottom: '7%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width,
  },
  pinSection: {
    //paddingHorizontal: 10
    paddingTop: '30%',
    paddingBottom: '10%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  heading: {
    fontSize: RFValue(20, 580),
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
  },
  lable: {
    fontSize: RFValue(12, 580),
    color: GRAY_COLOR,
    lineHeight: 20,
  },
  lableView: {
    marginTop: 20,
  },
  btnStyle: {
    backgroundColor: GREEN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,

    paddingHorizontal: 5,
    width: '100%',
    borderRadius: 8,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 15,
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
    color: WHITE_COLOR,
    fontSize: RFValue(14, 580),
    fontWeight: '600',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PinScreen);
