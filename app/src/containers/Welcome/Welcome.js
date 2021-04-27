import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {APP_INIT_LINK} from '../../commons/Constants';
import {PRIMARY_COLOR, WHITE_COLOR} from '../../theme/Colors';
import PrimaryButton from '../../components/PrimaryButton';
import {
  moveToMainScreenAction,
  initialiseAppAction,
  showLoaderAction,
  moveToSignInAction,
  moveToPhoneScreenAction,
  moveToUserInfoScreenAction,
} from './Actions';

import Orientation from 'react-native-orientation-locker';
import {useIsFocused} from '@react-navigation/native';
import {ActivityIndicator, Image, View, StyleSheet, Text, ImageBackground,} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
const splashBg = require('../../assets/images/splash-bg.png');
const splashLogoSmall = require('../../assets/images/splash-logo-small.png');
function Welcome({
  showLoader,
  initialiseApp,
  moveToMainScreen,
  initLoaded,
  navigation,
  loader,
  moveToPhoneScreen,
  moveToUserInfoScreen,
  
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
      moveToMainScreen(navigation);
    }
  }, [initLoaded]);

  return (
    <ImageBackground source={splashBg} style={styles.splashbackground}>
    <View style={styles.background}>
      <View style={styles.welcomeLogoDiv}>
      <Image source={splashLogoSmall} />
      </View>
      
      <View style={styles.buttonDiv}>
      <View style={styles.welcomeBottomText}>
        <Text style={styles.bottomTextBig}>I have read and accept the following</Text>
        <Text style={styles.bottomTextSmall}>
        Terms & Conditions
        </Text>
        <Text style={styles.bottomTextSmall}>
        Privacy policy of Application
        </Text>
      </View>
        <PrimaryButton
          text="Slide To Confirm"
          nextHandler={() => moveToPhoneScreen(navigation)}
        />
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
    </View>
    </ImageBackground>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    initialiseApp: url => dispatch(initialiseAppAction(url)),
    showLoader: status => dispatch(showLoaderAction(status)),
    moveToSignIn: navigation => moveToSignInAction(navigation),
    moveToMainScreen: navigation => moveToMainScreenAction(navigation),
    moveToPhoneScreen: navigation => moveToPhoneScreenAction(navigation),
    moveToUserInfoScreen: navigation => moveToUserInfoScreenAction(navigation),
  };
};

const mapStateToProps = state => {
  return {
    initLoaded: state.welcomeReducer.initLoaded,
    loader: state.welcomeReducer.loader,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);

// Style for "Background"
const styles = StyleSheet.create({
  splashbackground: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
    alignItems: 'center',
  },
  background: {
    width:'100%',
    paddingLeft:16,
    paddingRight:16,
  },
  welcomeLogoDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
    flexDirection: 'row',
    height:'72%',
  },
  welcomeBottomText: {
    display: 'flex',
    justifyContent: 'center',
  },
  bottomTextBig: {
    fontSize: RFValue(12, 580),
    color: WHITE_COLOR,
    fontWeight: '600',
    paddingTop: '3%',
    paddingBottom: '3%',
  },
  bottomTextSmall: {
    fontSize: RFValue(12, 580),
    color: WHITE_COLOR,
    fontWeight: '400',
    paddingBottom: '3%',
    paddingLeft:'2%',
  },
  buttonDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'baseline',
 
  },
});
