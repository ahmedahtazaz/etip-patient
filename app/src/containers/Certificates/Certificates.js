import {useIsFocused} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import I18n from '../../translations/I18n';
import Orientation from 'react-native-orientation-locker';
import {WHITE_COLOR, LIGHT_GREY} from '../../theme/Colors';
import {RFValue} from 'react-native-responsive-fontsize';
import BottomNavigator from '../../components/BottomNavigator';
import {
  getExpiredCertificatesAction,
  moveToAppointmentDetailsAction,
  moveToMakeAppointsAction,
  moveToSettingsScreenAction,
  setLoaderAction,
} from './Actions';
import {getActiveCertificatesAction} from '../MainScreen/Actions';
import {
  get_active_certificates,
  get_expired_certificates,
} from '../../commons/environment';
import {ActivityIndicator} from 'react-native-paper';
const menuIcon = require('../../assets/images/menu-icon.png');
const smallHeaderLogo = require('../../assets/images/small-header-logo.png');
const activeCertificationBg = require('../../assets/images/active-certification-bg.png');
const issuedWhiteQr = require('../../assets/images/issued-white-qr.png');
const issuedGrayeQr = require('../../assets/images/issued-gray-qr.png');
const issuedRedIcon = require('../../assets/images/issued-by-red-icon.png');
const previousCertificateBg = require('../../assets/images/previous-certificate-bg.png');

const Certificates = ({
  navigation,
  movetoSettingsScreen,
  moveToAppointmentDetails,
  userInfo,
  getActiveCertificates,
  activeCertificates,
  expiredCertificates,
  setLoader,
  getExpiredCertificates,
  loader,
}) => {
  const [selectedId, setSelectedId] = useState(null);

  const [isUpdated, setIsUpdated] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    Orientation.lockToPortrait();
    if (isFocused) setIsUpdated(true);
  }, [isFocused]);

  useEffect(() => {
    if (isUpdated) setIsUpdated(false);
  }, [isUpdated]);

  useEffect(() => {
    if (userInfo) {
      setLoader(true);
      getActiveCertificates({
        url: get_active_certificates + '/' + userInfo?.data?.data?.family?.id,
      });
      getExpiredCertificates({
        url: get_expired_certificates + '/' + userInfo?.data?.data?.family?.id,
      });
    }
  }, [userInfo]);

  const renderItem = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.activeCertificationDiv}
          onPress={() => moveToAppointmentDetails(navigation, 'certificates')}>
          <ImageBackground
            source={activeCertificationBg}
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}>
            <View style={styles.parentNameContainer}>
              <View style={styles.nameTextContainer}>
                <Text style={styles.boxHeading}>{I18n.t('SARS-COV-2')}</Text>
                <Text style={styles.boxTestText}>
                  {I18n.t('Citigen Antizen Test')}
                </Text>
              </View>
              <View style={styles.nameTextContainer}>
                <TouchableOpacity
                  style={[styles.buttonStyle, styles.submitButtonDark]}
                  onPress={() => moveToMainScreen(navigation)}>
                  <Text style={{color: 'white'}}>{I18n.t('24 hours')}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.parentNameContainer}>
              <View style={styles.bottomTextContainer}>
                <View style={styles.iconRowContainer}>
                  <View style={styles.issueIcon}>
                    <Image source={issuedRedIcon} />
                  </View>
                  <View>
                    <Text style={styles.boxHeading}>{I18n.t('issued by')}</Text>
                    <Text style={styles.boxText}>
                      {I18n.t('Citigen Antizen Test')}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.nameTextContainer}>
                <View style={styles.qrCodeItem}>
                  <Image source={issuedWhiteQr} />
                </View>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItemPrevious = ({item}) => {
    return (
      <View
        style={{
          marginTop: 8,
        }}>
        <View style={styles.activeCertificationDiv}>
          <ImageBackground
            source={previousCertificateBg}
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}>
            <View style={styles.parentNameContainer}>
              <View style={styles.nameTextContainer}>
                <Text style={styles.boxHeading1}>{I18n.t('SARS-COV-2')}</Text>
                <Text style={styles.boxTestText1}>
                  {I18n.t('Citigen Antizen Test')}
                </Text>
              </View>
              <View style={styles.nameTextContainer}>
                <TouchableOpacity
                  style={[styles.buttonStyle, styles.submitButtonRed]}
                  onPress={() => moveToMainScreen(navigation)}>
                  <Text style={{color: 'white'}}>{I18n.t('24 hours')}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.parentNameContainer}>
              <View style={styles.bottomTextContainer}>
                <View style={styles.iconRowContainer}>
                  <View style={styles.issueIcon}>
                    <Image source={issuedRedIcon} style={{marginBottom: 8}} />
                  </View>
                  <View>
                    <Text style={styles.boxHeading1}>
                      {I18n.t('issued by')}
                    </Text>
                    <Text style={styles.boxTestText1}>
                      {I18n.t('Citigen Antizen Test')}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.nameTextContainer}>
                <View style={styles.qrCodeItem}>
                  <Image source={issuedGrayeQr} />
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.mainMenu}>
        <View style={styles.mainMenuItems}>
          <TouchableOpacity
            style={styles.menuItemsLeft}
            onPress={() => {
              movetoSettingsScreen(navigation);
            }}>
            <Image source={menuIcon} style={{marginLeft: 10}} />
          </TouchableOpacity>
          <View style={styles.menuItemsCenter}>
            <Image source={smallHeaderLogo} style={{marginLeft: 5}} />
          </View>
        </View>
      </View>
      <View style={styles.appoinmentDivBg}>
        <View style={styles.mainDivPad}>
          <View style={styles.actionCertificateContainer}>
            <Text style={styles.boxTopHeading}>
              {I18n.t('ACTIVE CERTIFICATES')}
            </Text>
            {activeCertificates ? (
              <FlatList
                horizontal
                data={activeCertificates}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
              />
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={styles.activeCertificationDiv}>
                  <ImageBackground
                    source={previousCertificateBg}
                    style={styles.activeAppoinmentsDiv}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'cover',
                    }}>
                    <View style={styles.contentPadding}>
                      <Text style={styles.boxHeadingDisable}>
                        {I18n.t('No Active Certificate')}
                      </Text>
                      <Text style={styles.boxTextDisable}>
                        {I18n.t(
                          'You don’t have any active certificate at the moment',
                        )}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
              </View>
            )}
          </View>
          <View style={styles.actionCertificateContainer}>
            <Text style={styles.boxTopHeading}>
              {I18n.t('PREVIOUS CERTIFICATES')}
            </Text>
            {expiredCertificates ? (
              <FlatList
                vertical
                data={expiredCertificates}
                renderItem={renderItemPrevious}
                keyExtractor={item => item.id}
                extraData={selectedId}
              />
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={styles.activeCertificationDiv}>
                  <ImageBackground
                    source={previousCertificateBg}
                    style={styles.activeAppoinmentsDiv}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'cover',
                    }}>
                    <View style={styles.contentPadding}>
                      <Text style={styles.boxHeadingDisable}>
                        {I18n.t('No Previous Certificate')}
                      </Text>
                      <Text style={styles.boxTextDisable}>
                        {I18n.t(
                          'You don’t have any previous certificate at the moment',
                        )}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
      <BottomNavigator
        navigation={navigation}
        selectedItem={{id: 4, label: 'Certificates'}}></BottomNavigator>
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
};

const mapStateToProps = state => {
  return {
    userInfo: state.mainScreenReducer.userInfo,
    activeCertificates: state.certificatesReducer.activeCertificates,
    expiredCertificates: state.certificatesReducer.expiredCertificates,
    loader: state.certificatesReducer.loader,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    movetoSettingsScreen: navigation => moveToSettingsScreenAction(navigation),
    movetoMakeAnAppointmentScreen: navigation =>
      moveToMakeAppointsAction(navigation),
    moveToAppointmentDetails: (navigation, path) =>
      moveToAppointmentDetailsAction(navigation, path),
    getActiveCertificates: payload =>
      dispatch(getActiveCertificatesAction(payload)),
    setLoader: status => dispatch(setLoaderAction(status)),
    getExpiredCertificates: payload =>
      dispatch(getExpiredCertificatesAction(payload)),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fbfa',
  },
  mainDivPad: {
    paddingLeft: '4%',
    paddingRight: '4%',
  },
  mainMenu: {
    position: 'absolute',
    zIndex: 2000,
    top: '3%',
    left: '3%',
    height: '10%',
    width: '100%',
  },
  mainMenuItems: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 15,
  },
  menuItemsLeft: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    width: '43%',
  },
  menuItemsCenter: {
    marginEnd: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  appoinmentDivBg: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    height: '88%',
    marginTop: '30%',
  },
  qrCodeItem: {
    marginEnd: 16,
    marginTop: 22,
  },
  issueIcon: {
    marginEnd: 16,
    marginBottom: 16,
    marginStart: -16,
    marginTop: 4,
  },
  activeCertificationDiv: {
    borderRadius: 10,
    flexWrap: 'wrap',
    width:'100%',
    display: 'flex',
    flexDirection: 'column',
    resizeMode: 'cover',
    overflow: 'hidden',
    backgroundColor: '#d8d8d8',
    marginEnd: 10,
    maxHeight: 153,
  },
  activeAppoinmentsDiv: {
    borderRadius: 10,
    width:'100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'left',
    marginBottom: 10,
    resizeMode: 'cover',
    overflow: 'hidden',

    minHeight: 153,
  },
  contentPadding: {
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 13,
    paddingRight: 50,
  },
  boxHeading: {
    fontSize: RFValue(12, 580),
    color: LIGHT_GREY,
    fontWeight: '800',

    paddingBottom: 5,
  },
  boxHeading1: {
    fontSize: RFValue(12, 580),
    color: '#595050',
    fontWeight: '800',

    paddingBottom: 5,
  },
  boxText: {
    fontSize: RFValue(12, 580),
    color: LIGHT_GREY,
    fontWeight: '400',

    lineHeight: 20,
  },
  boxText1: {
    fontSize: RFValue(12, 580),
    color: '#595050',
    fontWeight: '400',

    lineHeight: 20,
  },
  boxTestText: {
    fontSize: RFValue(16, 580),
    color: WHITE_COLOR,
    fontWeight: '400',

    lineHeight: 20,
  },
  boxTestText1: {
    fontSize: RFValue(16, 580),
    color: '#595050',
    fontWeight: '400',

    lineHeight: 20,
  },
  boxHeadingDisable: {
    fontSize: RFValue(14, 580),
    color: '#595050',
    fontWeight: '800',

    paddingBottom: 10,
  },
  boxTextDisable: {
    fontSize: RFValue(13, 580),
    color: '#595050',
    fontWeight: '400',

    lineHeight: 20,
  },
  nameTextContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  bottomTextContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  actionCertificateContainer: {
    marginTop: 42,
    display: 'flex',
    flexDirection: 'column',
  },
  boxTopHeading: {
    marginBottom: 8,
    color: '#595050',
    fontWeight: '600',
    fontSize: RFValue(12, 580),
  },
  nameContainer: {
    alignSelf: 'stretch',
    marginTop: 16,
    backgroundColor: 'white',
    textAlign: 'center',
  },
  parentNameContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingLeft: 13,
    paddingRight: 20,
  },
  iconRowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 15,
    paddingLeft: 13,
  },

  bluebox: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
  blackbox: {
    width: 100,
    height: 100,
    backgroundColor: 'black',
  },
  plusIconDiv: {
    position: 'absolute',
    zIndex: 99999,
    right: 14,
    bottom: '10%',
    width: 81,
    height: 81,
  },
  buttonStyle: {
    backgroundColor: 'rgba(243,115,32,1)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 5,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16,
  },

  submitButtonDark: {
    width: 65,
    height: 38,
    borderRadius: 17,
    backgroundColor: '#12878D',
    color: WHITE_COLOR,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: RFValue(14, 580),
    fontWeight: '600',
    marginTop: '8%',
  },
  submitButtonRed: {
    width: 65,
    height: 38,
    borderRadius: 17,
    backgroundColor: '#FB4646',
    color: WHITE_COLOR,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: RFValue(14, 580),
    fontWeight: '600',
    marginTop: '8%',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Certificates);
