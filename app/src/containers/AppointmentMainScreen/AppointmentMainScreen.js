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
  useWindowDimensions,
  ImageBackground,
} from 'react-native';
import I18n from '../../translations/I18n';
import Orientation from 'react-native-orientation-locker';
import {WHITE_COLOR, LIGHT_GREY} from '../../theme/Colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {width} from 'react-native-dimension';

import {
  moveToAppointmentDetailsAction,
  moveToMakeAppointsAction,
  moveToSettingsScreenAction,
} from './Actions';
import BottomNavigator from '../../components/BottomNavigator';
import moment from 'moment';
const menuIcon = require('../../assets/images/menu-icon.png');
const smallHeaderLogo = require('../../assets/images/small-header-logo.png');
const activeCertificationBg = require('../../assets/images/active-certification-bg.png');
const plusIcon = require('../../assets/images/plus-icon.png');
const previousAppoinmentBg = require('../../assets/images/previous-appoinment-bg.png');

const AppointmentMainScreen = ({
  navigation,
  movetoSettingsScreen,
  movetoMakeAnAppointmentScreen,
  moveToAppointmentDetails,
  route,
  activeAppointments,
}) => {
  const window = useWindowDimensions();

  const [selectedId, setSelectedId] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    Orientation.lockToPortrait();
  }, [isFocused]);

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          width: width(95),
          marginEnd: 8,
        }}>
        <TouchableOpacity
          style={styles.activeAppoinmentsDiv}
          onPress={() =>
            moveToAppointmentDetails(navigation, 'appointment', item)
          }>
          <ImageBackground
            source={activeCertificationBg}
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}>
            <View style={styles.contentPadding}>
              <View style={styles.parentNameContainer}>
                <View style={styles.nameTextContainer}>
                  <Text style={styles.boxHeading}>
                    {item?.testPoint?.testCenter?.test?.testType}
                  </Text>
                  <Text style={styles.boxTestText}>
                    {item?.testPoint?.name}
                  </Text>
                </View>
                <View style={styles.nameTextContainer}>
                  <Text style={styles.boxHeading}>
                    {moment(item?.day).format('DD/MM/YYYY')}
                  </Text>
                  <Text style={styles.boxText}>{item?.time}</Text>
                </View>
              </View>
              <View style={styles.parentNameContainer}>
                <View style={styles.bottomTextContainer}>
                  <Text style={styles.boxHeading}>
                    {item?.testPoint?.testCenter?.name}
                  </Text>
                  <Text style={styles.boxText}>{item?.name}</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
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
              {I18n.t('ACTIVE APPOINTMENTS')}
            </Text>
            {activeAppointments ? (
              <FlatList
                horizontal
                data={activeAppointments?.data?.data}
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
                    source={previousAppoinmentBg}
                    style={styles.activeAppoinmentsDiv}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'cover',
                    }}>
                    <View style={styles.contentPadding}>
                      <Text style={styles.boxHeadingDisable}>
                        No Active Appointments
                      </Text>
                      <Text style={styles.boxTextDisable}>
                        You don’t have any active appointment at the moment
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
              </View>
            )}
          </View>
          <View style={styles.actionCertificateContainer}>
            <Text style={styles.boxTopHeading}>
              {I18n.t('PREVIOUS APPOINTMENTS')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={styles.activeCertificationDiv}>
                <ImageBackground
                  source={previousAppoinmentBg}
                  style={styles.activeAppoinmentsDiv}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                  }}>
                  <View style={styles.contentPadding}>
                    <Text style={styles.boxHeadingDisable}>
                      No Previous Appointments
                    </Text>
                    <Text style={styles.boxTextDisable}>
                      You don’t have any previous appointment at the moment
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.plusIconDiv}
        onPress={() => movetoMakeAnAppointmentScreen(navigation)}>
        <Image source={plusIcon} />
      </TouchableOpacity>
      <BottomNavigator
        navigation={navigation}
        selectedItem={{id: 2, label: 'Appointments'}}></BottomNavigator>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    activeAppointments: state.mainScreenReducer.activeAppointments,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fbfa',
  },
  mainDivPad: {
    paddingLeft: '3%',
    paddingRight: '3%',
  },
  mainMenu: {
    position: 'absolute',
    zIndex: 2000,
    top: '3%',
    left: '3%',
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
    width: '45%',
  },
  menuItemsCenter: {
    justifyContent: 'center',
  },
  appoinmentDivBg: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    marginTop: '25%',
  },
  activeCertificationDiv: {
    borderRadius: 10,
    flexWrap: 'wrap',

    display: 'flex',
    flexDirection: 'column',
    resizeMode: 'cover',
    overflow: 'hidden',
    marginEnd: 10,
    maxHeight: 153,
  },
  activeAppoinmentsDiv: {
    borderRadius: 10,

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
    fontSize: RFValue(14, 580),
    color: WHITE_COLOR,
    fontWeight: '800',

    paddingBottom: 10,
  },
  boxText: {
    fontSize: RFValue(13, 580),
    color: WHITE_COLOR,
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
  boxHeading1: {
    fontSize: RFValue(14, 580),
    color: '#a29d9d',
    fontWeight: '800',

    paddingBottom: 10,
  },
  boxHeading2: {
    fontSize: RFValue(14, 580),
    color: '#595050',
    fontWeight: '800',

    paddingBottom: 10,
  },
  boxText: {
    fontSize: RFValue(13, 580),
    color: LIGHT_GREY,
    fontWeight: '400',

    lineHeight: 20,
  },
  boxText1: {
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
    marginStart: 8,
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
});
const mapDispatchToProps = dispatch => {
  return {
    movetoSettingsScreen: navigation => moveToSettingsScreenAction(navigation),
    movetoMakeAnAppointmentScreen: navigation =>
      moveToMakeAppointsAction(navigation),
    moveToAppointmentDetails: (navigation, path, userInfo) =>
      moveToAppointmentDetailsAction(navigation, path, userInfo),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppointmentMainScreen);
