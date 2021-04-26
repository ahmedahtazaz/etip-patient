import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {APP_INIT_LINK} from '../../commons/Constants';
import {WHITE_COLOR} from '../../theme/Colors';

import Orientation from 'react-native-orientation-locker';
import {useIsFocused} from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
const splashBg = require('../../assets/images/splash-bg.png');
const splashLogo = require('../../assets/images/splash-logo.png');

function MainScreen({navigation, loader}) {
  const isFocused = useIsFocused();

  useEffect(() => {
    Orientation.lockToPortrait();
  }, [isFocused]);

  return (
    <TouchableOpacity style={{width: '100%', height: '100%'}}>
      <ImageBackground source={splashBg} style={styles.splashbackground}>
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
    </TouchableOpacity>
  );
}

const mapDispatchToProps = dispatch => {
  return {};
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

// Style for "Background"
const styles = StyleSheet.create({
  splashbackground: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  background: {
    height: '90%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyrightDiv: {},
  copyrightText: {
    fontSize: RFValue(12, 580),
    textAlign: 'center',
    fontWeight: '400',
    color: WHITE_COLOR,
  },
});
