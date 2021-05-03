import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {useIsFocused} from '@react-navigation/native';
import Foundation from 'react-native-vector-icons/Foundation';
import {RFValue} from 'react-native-responsive-fontsize';
import I18n from '../../translations/I18n';
import {
  GREEN_COLOR,
  WHITE_COLOR,
  PRIMARY_COLOR,
  GRAY_COLOR,
} from '../../theme/Colors';
const headerLogo = require('../../assets/images/header-logo.png');
const phoneDivBg = require('../../assets/images/phone-div-bg.png');
const {width, height} = Dimensions.get('window');

function PinScreen({navigation}) {
  const [pin, setPin] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    Orientation.lockToPortrait();
  }, [isFocused]);

  return (
    <View style={styles.MainContainer}>
      <View style={styles.mainMenu}>
        <Image source={headerLogo} />
      </View>
      <ImageBackground source={phoneDivBg} style={styles.splashbackground}>
        <View style={styles.pinSection}>
          <View style={{marginTop: 20}}>
            <Text style={styles.heading}>{I18n.t('Enter Your')}</Text>
            <Text style={styles.heading}>{I18n.t('Secret Pin to continue')}</Text>
          </View>
          <View style={styles.lableView}>
            <Text style={styles.labe}>{I18n.t('Please Enter your Phone Number to')}</Text>
            <Text style={styles.label}>{I18n.t('continue')}</Text>
          </View>

          <View style={{marginTop: 10}}>
            <TextInput
              placeholderTextColor={'#dfe1e1'}
              placeholder={'0000000'}
              style={styles.pinStyle}
              value={pin}
              onChangeText={e => setPin(e)}
              keyboardType="numeric"
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={{marginTop: 20}}>
            <TouchableOpacity
              onPress={() => navigation.replace('TestCenter')}
              disabled={pin.length !== 7}
              style={{
                ...styles.btnStyle,
                backgroundColor: pin.length !== 7 ? '#4b9499' : GREEN_COLOR,
              }}>
              <Text style={styles.submitText}>{I18n.t('Continue')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
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
    top: '5%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '5%',
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
    marginBottom: '10%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width,
  },
  pinSection: {
    //paddingHorizontal: 10
    paddingTop: '35%',
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

export default PinScreen;
