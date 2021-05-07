import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {STORAGE_KEY} from '../../commons/Constants';
import {WHITE_COLOR} from '../../theme/Colors';
import Slider from 'react-native-slide-to-unlock';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

import {
  moveToMainScreenAction,
  initialiseAppAction,
  showLoaderAction,
  moveToSignInAction,
  moveToPhoneScreenAction,
  moveToUserInfoScreenAction,
  GetDefaultLanguage,
  moveToPPScreenAction,
  moveToTTScreenAction,
} from './Actions';
import I18n from '../../translations/I18n';

import Orientation from 'react-native-orientation-locker';
import {useIsFocused} from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  View,
  StyleSheet,
  Text,
  ImageBackground,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  get_def_lang_url,
  get_lang_by_lang_url,
} from '../../commons/environment';
import {TouchableOpacity} from 'react-native-gesture-handler';
const splashBg = require('../../assets/images/splash-bg.png');
const splashLogoSmall = require('../../assets/images/splash-logo-small.png');

function Welcome({
  navigation,
  loader,
  moveToPhoneScreen,
  moveToTerms,
  moveToPolicy,
}) {
  const isFocused = useIsFocused();

  useEffect(() => {
    Orientation.lockToPortrait();
  }, [isFocused]);

  return (
    <ImageBackground source={splashBg} style={styles.splashbackground}>
      <View style={styles.background}>
        <View style={styles.welcomeLogoDiv}>
          <Image source={splashLogoSmall} />
        </View>

        <View style={styles.buttonDiv}>
          <View style={styles.welcomeBottomText}>
            <Text style={styles.bottomTextBig}>
              {I18n.t('I have read and accept the following')}
            </Text>
            <TouchableOpacity onPress={() => moveToTerms(navigation)}>
              <Text style={styles.bottomTextSmall}>
                {I18n.t('Terms & Conditions')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => moveToPolicy(navigation)}>
              <Text style={styles.bottomTextSmall}>
                {I18n.t('Privacy policy of Application')}
              </Text>
            </TouchableOpacity>
          </View>
          <Slider
            onEndReached={() => {
              moveToPhoneScreen(navigation);
            }}
            containerStyle={{
              margin: 8,
              paddingLeft: 5,
              paddingRight: 5,
              paddingTop: 2,
              paddingBottom: 2,
              backgroundColor: '#F9F9F970',
              borderRadius: 10,
              overflow: 'hidden',
              alignItems: 'center',
              justifyContent: 'center',
              width: '95%',
            }}
            sliderElement={
              <View
                style={{
                  width: 50,
                  margin: 6,
                  borderRadius: 4,
                  height: 50,
                  backgroundColor: '#006970',
                  justifyContent: 'center',
                }}>
                <Icon
                  name="chevron-right"
                  color="white"
                  size={35}
                  style={{alignSelf: 'center'}}
                />
              </View>
            }>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: '#839E9F', fontSize: 21}}>
                {'Slide to Confirm'}
              </Text>
              <Icon
                name="chevron-double-right"
                color="#839E9F"
                size={30}
                style={{}}
              />
            </View>
          </Slider>
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
    GetDefaultLanguage: navigation => dispatch(GetDefaultLanguage(navigation)),
    GetLanguageKeysByKey: navigation =>
      dispatch(GetLanguageKeysByKey(navigation)),
    moveToPolicy: navigation => moveToPPScreenAction(navigation),
    moveToTerms: navigation => moveToTTScreenAction(navigation),
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
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
  },
  welcomeLogoDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: '72%',
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
    paddingLeft:'2%',
  },
  bottomTextSmall: {
    fontSize: RFValue(12, 580),
    color: WHITE_COLOR,
    fontWeight: '400',
    paddingBottom: '3%',
    paddingLeft: '5%',
  },
  buttonDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
});
