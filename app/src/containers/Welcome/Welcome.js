import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {APP_INIT_LINK} from '../../commons/Constants';
import {PRIMARY_COLOR} from '../../theme/Colors';
import PrimaryButton from '../../components/PrimaryButton';
import {
  moveToMainScreenAction,
  initialiseAppAction,
  showLoaderAction,
  moveToSignInAction,
  moveToPhoneScreenAction,
} from './Actions';

import Orientation from 'react-native-orientation-locker';
import {useIsFocused} from '@react-navigation/native';
import {ActivityIndicator, Image, View, StyleSheet, Text} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
const welcomeLogo = require('../../assets/images/welcome-logo.png');
const welcomeImg = require('../../assets/images/welcome-image.png');
function Welcome({
  showLoader,
  initialiseApp,
  moveToMainScreen,
  initLoaded,
  navigation,
  loader,
  moveToPhoneScreen,
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
    <View style={styles.background}>
      <View style={styles.welcomeLogo}>
        <Image source={welcomeLogo} />
      </View>
      <View style={styles.welcomeTextDiv}>
        <Text style={styles.welcomeText}>Willkommen</Text>
      </View>
      <View style={styles.welcomeImage}>
        <Image source={welcomeImg} />
      </View>
      <View style={styles.welcomeBottomText}>
        <Text style={styles.bottomTextBig}>Bleiben Sie geschützt</Text>
        <Text style={styles.bottomTextSmall}>
          Ihre ultimative Test - und Impfdokumentation
        </Text>
      </View>
      <View style={styles.buttonDiv}>
        <PrimaryButton
          text="Lesen Sie die AGB"
          nextHandler={() => moveToPhoneScreen(navigation)}
        />
        <PrimaryButton
          text="Ich stimme zu"
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
  );
}

const mapDispatchToProps = dispatch => {
  return {
    initialiseApp: url => dispatch(initialiseAppAction(url)),
    showLoader: status => dispatch(showLoaderAction(status)),
    moveToSignIn: navigation => moveToSignInAction(navigation),
    moveToMainScreen: navigation => moveToMainScreenAction(navigation),
    moveToPhoneScreen: navigation => moveToPhoneScreenAction(navigation),
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
  background: {
    backgroundColor: '#F8F8F8',
    paddingTop: '9%',
    paddingBottom: '10%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  welcomeLogo: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingRight: '3%',
  },
  welcomeTextDiv: {
    paddingTop: '5%',
  },
  welcomeText: {
    fontSize: RFValue(24, 580),
    color: PRIMARY_COLOR,
    fontWeight: '700',
    textAlign: 'center',
  },
  welcomeImage: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  welcomeBottomText: {
    display: 'flex',
    justifyContent: 'center',
  },
  bottomTextBig: {
    fontSize: RFValue(16, 580),
    color: PRIMARY_COLOR,
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: '3%',
    paddingBottom: '3%',
  },
  bottomTextSmall: {
    fontSize: RFValue(12, 580),
    color: PRIMARY_COLOR,
    fontWeight: '400',
    textAlign: 'center',
  },
  buttonDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'baseline',
    paddingTop: '23%',
  },
});
