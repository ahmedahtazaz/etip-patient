import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  useWindowDimensions,
  ImageBackground,
  Dimensions
} from 'react-native';
import I18n from '../../translations/I18n';

import {Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
import Orientation from 'react-native-orientation-locker';
import { WHITE_COLOR } from '../../theme/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import BottomNavigator from '../../components/BottomNavigator';
import { width, height, totalSize } from 'react-native-dimension';
import {
  moveToAppointmentDetailsAction,
  moveToMakeAppointsAction,
  moveToSettingsScreenAction,
} from './Actions';
const menuIcon = require('../../assets/images/menu-icon.png');
const menuArrowIcon = require('../../assets/images/menu-arrow-icon.png');
const smallHeaderLogo = require('../../assets/images/small-header-logo.png');
const mainScreenIcon = require('../../assets/images/main-screen-icon.png');
const activeCertificationBg = require('../../assets/images/active-certification-bg.png');
const activeAppoinmentsBg = require('../../assets/images/active-appoinments-bg.png');
const plusIcon = require('../../assets/images/plus-icon.png');
const appoinmentRedBg = require('../../assets/images/appoinment-red-bg.png');
const rightHandFinger = require('../../assets/images/right-hand-finger.png');
const previousAppoinmentBg = require('../../assets/images/previous-appoinment-bg.png');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const DATA = [
  {
    id: 'Modifiy Personal Information',
    title: 'Modifiy Personal Information',
  },
];

const DATA1 = [
  {
    id: 'Modifiy Personal Information',
    title: 'Modifiy Personal Information',
  },
  {
    id: 'Modify Email',
    title: 'Modify Email',
  },
  {
    id: 'Modify Sim',
    title: 'Modify Sim',
  },
  {
    id: 'About App',
    title: 'About App',
  },
  {
    id: 'Need Assistance',
    title: 'Need Assistance',
  },
  {
    id: 'Privacy Policy',
    title: 'Privacy Policy',
  },
  {
    id: 'Terms & Conditions',
    title: 'Terms & Conditions',
  },
];

const Item = ({ item, onPress, backgroundColor, textColor, }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const MainScreen = ({
  navigation,
  movetoSettingsScreen,
  movetoMakeAnAppointmentScreen,
  moveToAppointmentDetails,
  route,
  userInfo
}) => {
  const window = useWindowDimensions();

  const [selectedId, setSelectedId] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {

    Orientation.lockToPortrait();
  }, [isFocused]);

  const renderItem = ({ item }) => {
    if (route.params && route.params.booked) {
      return (
        <View style={styles.appoinmentRedDiv}>
          <ImageBackground
            source={appoinmentRedBg}
            style={styles.appoinmentRedDiv1}>
            <View style={styles.contentPadding1}>
              <View style={styles.redDivTop}>
                <Text style={styles.boxHeading}>You are Covid Positive</Text>
                <Text style={styles.boxText}>
                  Please donot panic, For any Medical Assistance you have +49 00
                  000000 available 24/7.
                </Text>
              </View>
              <View style={styles.redDivBottom}>
                <Text style={styles.redDivBottomLeft}>
                  We have added few tips in your dashbaord that may help you in
                  these times. Swipe to view them
                </Text>
                <Image source={rightHandFinger} style={{ marginTop: 30 }} />
              </View>
            </View>
          </ImageBackground>
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={styles.activeCertificationDiv}>
          <ImageBackground
            source={previousAppoinmentBg}
            style={{ width: '100%', height: '100%', resizeMode: 'cover' }}>
            <View style={styles.contentPadding}>
              <Text style={styles.boxHeadingDisable}>
                No Active Certificate
              </Text>
              <Text style={styles.boxTextDisable}>
                You don’t have any active certificate at the moment
              </Text>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  };

  const renderItemAppointment = ({ item }) => {
    if (route.params && route.params.booked) {
      return (
        <View
          style={{
            width: width(95),
          }}>
          <TouchableOpacity
            style={styles.activeAppoinmentsDiv}
            onPress={() => moveToAppointmentDetails(navigation, 'appointment')}>
            <ImageBackground
              source={activeCertificationBg}
              style={{ width: '100%', height: '100%', resizeMode: 'cover' }}>
              <View style={styles.contentPadding}>
                <View style={styles.parentNameContainer}>
                  <View style={styles.nameTextContainer}>
                    <Text style={styles.boxHeading}>SARS-COV-2</Text>
                    <Text style={styles.boxTestText}>Citigen Antizen Test</Text>
                  </View>
                  <View style={styles.nameTextContainer}>
                    <Text style={styles.boxHeading}>12-may-2021</Text>
                    <Text style={styles.boxText}>10:00-10:15</Text>
                  </View>
                </View>
                <View style={styles.parentNameContainer}>
                  <View style={styles.bottomTextContainer}>
                    <Text style={styles.boxHeading}>SARS-COV-2</Text>
                    <Text style={styles.boxText}>Citigen Antizen Test</Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View>
        <View style={styles.activeAppoinmentsDiv}>
          <ImageBackground
            source={previousAppoinmentBg}
            style={styles.activeAppoinmentsDiv}
            style={{ width: '100%', height: '100%', resizeMode: 'cover' }}>
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
            <Image source={menuIcon} style={{ marginLeft: 10 }} />
          </TouchableOpacity>
          <View style={styles.menuItemsCenter}>
            <Image source={smallHeaderLogo} style={{ marginLeft: 5 }} />
          </View>
        </View>
      </View>
      <View style={styles.appoinmentDivBg}>
        <View style={styles.mainDivPad}>
          <View style={styles.nameContainer}>
            <View style={styles.parentNameContainer}>
              <View style={styles.nameTextContainer}>
                <Text
                  style={{ fontSize: 25, fontWeight: 'bold', marginStart: 8 }}>
                  {
                    Object.keys(userInfo).length ?
                      `${userInfo.firstName} ${userInfo.lastName}`
                      :
                      "Hi Jenny"
                  }
                </Text>
                <Text style={{ textColor: 'grey', marginStart: 8 }}>
                  Hope u r feeling healthy today
                </Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  moveToAppointmentDetails(navigation, 'personal', `${userInfo.firstName} ${userInfo.lastName}`, userInfo)
                }>
                <Image
                  style={{ height: 50, width: 50, marginEnd: 8 }}
                  source={mainScreenIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.actionCertificateContainer}>
            <Text style={styles.boxTopHeading}>ACTIVE CERTIFICATES</Text>
            <FlatList
              horizontal
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              extraData={selectedId}
            />
          </View>
          <View style={styles.actionCertificateContainer}>
            <Text style={styles.boxTopHeading}>APPOINTMENTS</Text>
            <FlatList
              data={route.params && route.params.booked ? DATA1 : DATA}
              renderItem={renderItemAppointment}
              keyExtractor={item => item.id}
              extraData={selectedId}
            />
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
        selectedItem={{ id: 1, label: 'Home' }}></BottomNavigator>
    </View>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    movetoSettingsScreen: navigation => moveToSettingsScreenAction(navigation),
    movetoMakeAnAppointmentScreen: navigation =>
      moveToMakeAppointsAction(navigation),
    moveToAppointmentDetails: (navigation, path, title, qrObj) =>
      moveToAppointmentDetailsAction(navigation, path, title, qrObj),
  };
};

const mapStateToProps = state => {
  return {
    userInfo: state.userInfoReducer.userInfo
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
  appoinmentDivBg: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    marginTop: '25%',
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
  nameTextContainer: {
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
  appoinmentRedDiv: {
    borderRadius: 10,
    flexWrap: 'wrap',
    display: 'flex',
    flexDirection: 'column',
    resizeMode: 'cover',
    overflow: 'hidden',
    marginEnd: 10,
  },
  appoinmentRedDiv1: {
    maxWidth: 400,
    maxHeight: 280,
    borderRadius: 10,
  },
  redDivBottom: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 15,
  },
  redDivBottomLeft: {
    fontSize: RFValue(10, 580),
    color: WHITE_COLOR,
    justifyContent: 'flex-start',
    flexGrow: 10,
    paddingRight: 25,
    paddingTop: 24,
    lineHeight: 24,
  },
  contentPadding1: {
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 13,
    paddingRight: 25,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
