import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { APP_INIT_LINK } from '../../commons/Constants';
import { WHITE_COLOR } from '../../theme/Colors';
import {
  moveToWelcomeScreenAction,
  moveToPincodeScreenAction,
  initialiseAppAction,
  showLoaderAction,
  moveToSignInAction,
} from './Actions';

import Orientation from 'react-native-orientation-locker';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { IS_VERIFIER_APP } from '../../commons/Constants';
const splashBg = require('../../assets/images/splash-bg.png');
const splashLogo = require('../../assets/images/splash-logo.png');

function Splash({
  showLoader,
  initialiseApp,
  moveToWelcomeScreen,
  initLoaded,
  navigation,
  loader,
}) {
  const isFocused = useIsFocused();

  useEffect(() => {
    Orientation.lockToPortrait();
  }, [isFocused]);

  useEffect(() => {
    showLoader(true);
    initialiseApp(APP_INIT_LINK);
  }, []);

  useEffect(() => {
    if (initLoaded) {
      moveToWelcomeScreen(navigation);
    }
  }, [initLoaded]);

  return (
    <TouchableOpacity
      style={{ width: '100%', height: '100%' }}
      onPress={() => {
        if (IS_VERIFIER_APP) {
          moveToPincodeScreenAction(navigation)
        } else {
          moveToWelcomeScreen(navigation)
        }
      }}>
      <ImageBackground source={splashBg} style={styles.splashbackground}>
        
          <Image source={splashLogo} />
        
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
  return {
    initialiseApp: url => dispatch(initialiseAppAction(url)),
    showLoader: status => dispatch(showLoaderAction(status)),
    moveToSignIn: navigation => moveToSignInAction(navigation),
    moveToWelcomeScreen: navigation => moveToWelcomeScreenAction(navigation),
  };
};

const mapStateToProps = state => {
  return {
    initLoaded: state.splashReducer.initLoaded,
    loader: state.splashReducer.loader,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);

// Style for "Background"
const styles = StyleSheet.create({
  splashbackground: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },


});
