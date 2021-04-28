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
} from 'react-native';
import { Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import Orientation from 'react-native-orientation-locker';
import { WHITE_COLOR,LIGHT_GREY } from '../../theme/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import {width, height, totalSize} from 'react-native-dimension';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import {
  moveToAppointmentDetailsAction,
  moveToMakeAppointsAction,
  moveToSettingsScreenAction,
} from './Actions';
import BottomNavigator from '../../components/BottomNavigator';
import { ScrollView } from 'react-native-gesture-handler';
const menuIcon = require('../../assets/images/menu-icon.png');
const menuArrowIcon = require('../../assets/images/menu-arrow-icon.png');
const smallHeaderLogo = require('../../assets/images/small-header-logo.png');
const mainScreenIcon = require('../../assets/images/main-screen-icon.png');
const activeCertificationBg = require('../../assets/images/active-certification-bg.png');
const previousAppoinmentsBg = require('../../assets/images/previous-appoinment-bg.png');
const plusIcon = require('../../assets/images/plus-icon.png');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const DATA = [
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
  {
    id: 'Privacy Policy',
    title: 'Privacy Policy',
  },
  {
    id: 'Terms & Conditions',
    title: 'Terms & Conditions',
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const AppointmentMainScreen = ({  navigation,
  movetoSettingsScreen,
  movetoMakeAnAppointmentScreen,
  moveToAppointmentDetails,
  route, }) => {
  const window = useWindowDimensions();

  const [selectedId, setSelectedId] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    Orientation.lockToPortrait();
  }, [isFocused]);

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          width: width(95),

        }}>
        <View style={styles.activeCertificationDiv}>
          <ImageBackground
            source={activeCertificationBg}
            style={{ width: '100%', height: '100%', resizeMode: 'cover' }}>
            <View style={styles.parentNameContainer}>
              <View style={styles.nameTextContainer}>
                <Text style={styles.boxHeading}>SARS-COV-2</Text>
                <Text style={styles.boxTestText}>
                  Citigen Antizen Test
              </Text>
              </View>
              <View style={styles.nameTextContainer}>
                <Text style={styles.boxHeading}>12-may-2021</Text>
                <Text style={styles.boxText}>
                  10:00-10:15
              </Text>
              </View>
              
            </View>
            <View style={styles.parentNameContainer}>

            <View style={styles.bottomTextContainer}>
                <Text style={styles.boxHeading}>SARS-COV-2</Text>
                <Text style={styles.boxText}>
                  Citigen Antizen Test
              </Text>
              </View>
              </View>

          </ImageBackground>
        </View>
      </View>
    );
  };
  const renderItemAppointment = ({ item }) => {
    return (
      <View
      style={{
        width: width(95),
        marginBottom:8,

      }}>
      <View style={styles.activeCertificationDiv}>
        <ImageBackground
         source={previousAppoinmentsBg}
         style={styles.activeAppoinmentsDiv}
         style={{ width: '100%', height: '100%', resizeMode: 'cover' }}>
          <View style={styles.parentNameContainer}>
            <View style={styles.nameTextContainer}>
              <Text style={styles.boxHeading1}>SARS-COV-2</Text>
              <Text style={styles.boxTestText1}>
                Citigen Antizen Test
            </Text>
            </View>
            <View style={styles.nameTextContainer}>
              <Text style={styles.boxText1}>12-may-2021</Text>
              <Text style={styles.boxText1}>
                10:00-10:15
            </Text>
            </View>
            
          </View>
          <View style={styles.parentNameContainer}>

          <View style={styles.bottomTextContainer}>
              <Text style={styles.boxHeading2}>Zeitfenster auswählen</Text>
              <Text style={styles.boxText1}>
                Citigen Antizen Test
            </Text>
            </View>
            </View>

        </ImageBackground>
      </View>
    </View>
  );
  };
 

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.backIcon}>
              <TouchableOpacity onPress={() => goBack()}>
                <EvilIcons name="chevron-left" color="#000" size={40} style={{fontWeight:'bold'}} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerTextView}>
              <Text style={styles.headerText}>Make an Appointment</Text>
            </View>
          </View>
          <View style={styles.appoinmentDivBg}>
      <View style={styles.mainDivPad}>
        <View style={styles.actionCertificateContainer}>
          <Text style={styles.boxTopHeading}>ACTIVE APPOINTMENTS</Text>
          <FlatList
            horizontal
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
          />
        </View>
        <View style={styles.actionCertificateContainer}>
          <Text style={styles.boxTopHeading}>PREVIOUS APPOINTMENTS</Text>
          <ScrollView>
          <FlatList
            vertical
            data={DATA}
            renderItem={renderItemAppointment}
            keyExtractor={item => item.id}
            extra
            Data={selectedId}
          />
          </ScrollView>
        </View>
      </View>
      </View>
      <View style={styles.plusIconDiv}>
        <Image source={plusIcon} />
      </View>
      <BottomNavigator
        navigation={navigation}
        selectedItem={{ id: 2, label: 'Appointments' }}></BottomNavigator>
    </View>
  );
};


const mapStateToProps = state => {
  return {};
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fbfa',
  },
  mainDivPad: {
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingTop: '10%',
  },
  header: {
    flexDirection: "row",
    height: windowHeight * 0.1,
    alignItems: "center",
 
  },
  backIcon: {
    flex: 1,
    alignItems: "flex-start"
  },
  headerTextView: {
    flex: 9,
    alignItems: "center",
    paddingRight: windowWidth * 0.1
  },
  headerText: {
    fontSize: RFValue(16, 580),

  },
  appoinmentDivBg : {
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    backgroundColor:'white',
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
    color: LIGHT_GREY,
    fontWeight: '800',

    paddingBottom: 10,
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
  boxTestText:{
    fontSize: RFValue(16, 580),
    color: WHITE_COLOR,
    fontWeight: '400',

    lineHeight: 20,
  },
  boxTestText1:{
    fontSize: RFValue(16, 580),
    color: '#595050',
    fontWeight: '400',

    lineHeight: 20,
  },
  nameTextContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  bottomTextContainer:{
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
    moveToAppointmentDetails: navigation =>
      moveToAppointmentDetailsAction(navigation),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppointmentMainScreen);
