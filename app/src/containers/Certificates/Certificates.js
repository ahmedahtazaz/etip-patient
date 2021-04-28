import {useIsFocused} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
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
  Button,
} from 'react-native';
import {width, height, totalSize} from 'react-native-dimension';

import {Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
import Orientation from 'react-native-orientation-locker';
import {WHITE_COLOR,LIGHT_GREY} from '../../theme/Colors';
import {RFValue} from 'react-native-responsive-fontsize';
import BottomNavigator from '../../components/BottomNavigator';
import color from 'color';
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
const familyIcon = require('../../assets/images/family-icon.png');

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
];

const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const Certificates = ({ navigation,
  movetoSettingsScreen,
  movetoMakeAnAppointmentScreen,
  moveToAppointmentDetails,
  route}) => {
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
              <TouchableOpacity
            style={[styles.buttonStyle, styles.submitButtonDark]}
            onPress={() => moveToMainScreen(navigation)}>
            <Text style={{color:'white'}}>24 hours</Text>
          </TouchableOpacity>
           
              </View>
              
            </View>
            <View style={styles.parentNameContainer}>

            <View style={styles.bottomTextContainer}>
            <View style={styles.iconRowContainer}>
            <View style={styles.menuItemsCenter}>
            <Image  source={familyIcon}  />
          </View>
              <View>
                <Text style={styles.boxHeading}>issued by</Text>
                <Text style={styles.boxText}>
                  Citigen Antizen Test
              </Text>
              </View>
              </View>

              </View>
              <View style={styles.nameTextContainer}>
              
              <View style={styles.menuItemsCenter}>
            <Image  source={familyIcon}  />
          </View>
           
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
            marginTop:8,
  
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
                <TouchableOpacity
              style={[styles.buttonStyle, styles.submitButtonRed]}
              onPress={() => moveToMainScreen(navigation)}>
              <Text style={{color:'white'}}>24 hours</Text>
            </TouchableOpacity>
             
                </View>
                
              </View>
              <View style={styles.parentNameContainer}>
  
              <View style={styles.bottomTextContainer}>
              <View style={styles.iconRowContainer}>
              <View style={styles.menuItemsCenter}>
              <Image  source={familyIcon}  />
            </View>
                <View>
                  <Text style={styles.boxHeading}>issued by</Text>
                  <Text style={styles.boxText}>
                    Citigen Antizen Test
                </Text>
                </View>
                </View>
  
                </View>
                <View style={styles.nameTextContainer}>
                
                <View style={styles.menuItemsCenter}>
              <Image  source={familyIcon}  />
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
      <View style={styles.mainDivPad}>
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
          <Text style={styles.boxTopHeading}>PREVIOUS CERTIFICATES</Text>
          <FlatList
            vertical
            data={DATA}
            renderItem={renderItemAppointment}
            keyExtractor={item => item.id}
            extraData={selectedId}
          />
        </View>
      </View>
      <View style={styles.plusIconDiv}>
        <Image  source={plusIcon} />
      </View>
      <BottomNavigator
        navigation={navigation}
        selectedItem={{id: 4, label: 'Certificates'}}></BottomNavigator>
    </View>
  );
};


const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    movetoSettingsScreen: navigation => moveToSettingsScreenAction(navigation),
    movetoMakeAnAppointmentScreen: navigation =>
      moveToMakeAppointsAction(navigation),
    moveToAppointmentDetails: navigation =>
      moveToAppointmentDetailsAction(navigation),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainDivPad: {
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingTop: '10%',
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
  menuItemsLeft: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
  },
  menuItemsCenter: {
    marginEnd:16,
    marginTop:16,
    marginBottom:16,


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
    fontSize: RFValue(12, 580),
    color: LIGHT_GREY,
    fontWeight: '800',

    paddingBottom: 5,
  },
  boxText: {
    fontSize: RFValue(12, 580),
    color: LIGHT_GREY,
    fontWeight: '400',

    lineHeight: 20,
  },
  boxTestText:{
    fontSize: RFValue(16, 580),
    color: WHITE_COLOR,
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
  iconRowContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'flex-start',
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
    width: '100%',
    borderRadius: 100,
    backgroundColor: '#006970',
    color: WHITE_COLOR,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: RFValue(14, 580),
    fontWeight: '600',
    marginTop: '8%',
  },
  submitButtonRed: {
    width: '100%',
    borderRadius: 100,
    backgroundColor: 'red',
    color: WHITE_COLOR,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: RFValue(14, 580),
    fontWeight: '600',
    marginTop: '8%',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Certificates);
