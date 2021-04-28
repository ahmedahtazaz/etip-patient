import React, {useState} from 'react';
import {Icon, SearchBar} from 'react-native-elements';
import {connect} from 'react-redux';

import {
  Button,
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
import {Dimensions} from 'react-native';
import Calendar from '../../components/Calendar';
import BottomNavigator from '../../components/BottomNavigator';

const menuIcon = require('../../assets/images/menu-icon.png');
const menuArrowIcon = require('../../assets/images/menu-arrow-icon.png');
const smallHeaderLogo = require('../../assets/images/small-header-logo.png');
const mainScreenIcon = require('../../assets/images/main-screen-icon.png');
const activeCertificationBg = require('../../assets/images/active-certification-bg.png');
const activeAppoinmentsBg = require('../../assets/images/active-appoinments-bg.png');
const plusIcon = require('../../assets/images/plus-icon.png');
const appoinmentRedBg = require('../../assets/images/appoinment-red-bg.png');
const rightHandFinger = require('../../assets/images/right-hand-finger.png');

import {
  moveToAppointmentDetailsAction,
  moveToMakeAppointsAction,
  moveToSettingsScreenAction,
} from './Actions';
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
    id: 'Terms & Conditions',
    title: 'Terms & Conditions',
  },
  {
    id: 'Terms & Conditions',
    title: 'Terms & Conditions',
  },
  {
    id: 'Terms & Conditions',
    title: 'Terms & Conditions',
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

const FamilyMain = ({
  navigation,
  movetoSettingsScreen,
  movetoMakeAnAppointmentScreen,
  moveToAppointmentDetails,
  route,
}) => {
  const window = useWindowDimensions();

  const [selectedId, setSelectedId] = useState(null);

 
  const renderItem = ({item}) => {
    return (
      <View style={styles.nameContainer}>
        <View style={styles.parentNameContainer}>
          <View style={styles.nameTextContainer}>
            <Text style={{marginStart: 8, color: '#adadad'}}>
              Appointment For
            </Text>
            <Text style={{color: '#20B2AA', textColor: 'grey', marginStart: 8}}>
              Jenny White
            </Text>
          </View>
          <View>
            <Icon name="edit" color="black" size={25} style={{margin: 8}} />
          </View>
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
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </View>

      <BottomNavigator
        navigation={navigation}
        selectedItem={{id: 3, label: 'Family'}}></BottomNavigator>
    </View>
    </View>

  );
};

const mapStateToProps = state => {
  return {};
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
  },
  nameTextContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  actionCertificateContainer: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
  },

  calenderContainer: {
    marginTop: 8,
    flex: 3,
    display: 'flex',
    flexDirection: 'column',
  },
  nameContainer: {
    flex: 1,
    alignSelf: 'stretch',
    marginTop: 16,
    backgroundColor: 'white',
    textAlign: 'center',
  },
  parentNameContainer: {
    marginTop: 16,
    flex: 1,

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
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 16,
    borderRadius: 10,
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
    justifyContent: 'center',
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
export default connect(mapStateToProps, mapDispatchToProps)(FamilyMain);