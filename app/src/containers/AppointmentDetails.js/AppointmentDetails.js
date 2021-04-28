import React from 'react';
import {ImageBackground, Text, View, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {WHITE_COLOR} from '../../theme/Colors';
const mainScreenIcon = require('../../assets/images/main-screen-icon.png');
const qrBig = require('../../assets/images/qr-big.png');
const activeCertificationBg = require('../../assets/images/active-certification-bg.png');
const menuArrowIcon = require('../../assets/images/menu-arrow-icon.png');
const previousAppoinmentsBg = require('../../assets/images/previous-appoinment-bg.png');

const AppointmentDetails = ({navigation}) => {
  return (
    <View style={{height: '100%', width: '100%', flexDirection: 'column'}}>
      <View style={styles.mainMenu}>
        <TouchableOpacity
          style={styles.mainMenuItems}
          onPress={() => navigation.goBack()}>
          <Image source={menuArrowIcon} style={{marginLeft: 5}} />
        </TouchableOpacity>
      </View>

      <View style={styles.mainView}>
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
        <View style={styles.activeCertificationDiv}>
          <ImageBackground
            source={activeCertificationBg}
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}>
            <View style={styles.contentPadding}>
              <Text style={styles.boxHeading}>No Active Certificate</Text>
              <Text style={styles.boxText}>
                You don’t have any active certificate at the moment
              </Text>
            </View>
          </ImageBackground>
        </View>
        <Image style={{marginEnd: 8}} source={qrBig}></Image>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  activeCertificationDiv: {
    borderRadius: 10,
    flexWrap: 'wrap',

    display: 'flex',
    flexDirection: 'column',
    resizeMode: 'cover',
    overflow: 'hidden',
    marginEnd: 10,
    maxHeight: 153,
    marginBottom: 50,
  },
  mainView: {
    flex: 1,
    flexDirection: 'column',

    paddingTop: 50,
    paddingLeft: '3%',
  },
  mainMenu: {
    position: 'absolute',
    zIndex: 2000,
    top: 0,
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
});

export default AppointmentDetails;
