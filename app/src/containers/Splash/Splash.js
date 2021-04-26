import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {APP_INIT_LINK} from '../../commons/Constants';

import {
  moveToWelcomeScreenAction,
  initialiseAppAction,
  showLoaderAction,
  moveToSignInAction,
} from './Actions';

import Orientation from 'react-native-orientation-locker';
import {useIsFocused} from '@react-navigation/native';
import {ActivityIndicator, Image, View, StyleSheet} from 'react-native';

const splash = require('../../assets/images/splash.png');

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
    <View style={styles.background}>
      <Image
        source={splash}
        style={{
          width: '100%',
          height: '100%',
          resizeMode: 'stretch',
        }}
      />
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
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
});
