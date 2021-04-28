import React, { useState } from 'react';
import { Icon, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';

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
import { Dimensions } from 'react-native';
import Calendar from '../../components/Calendar';
import BottomNavigator from '../../components/BottomNavigator';
import { SwipeListView } from 'react-native-swipe-list-view';

const menuIcon = require('../../assets/images/menu-icon.png');
const menuArrowIcon = require('../../assets/images/menu-arrow-icon.png');
const smallHeaderLogo = require('../../assets/images/small-header-logo.png');
const mainScreenIcon = require('../../assets/images/main-screen-icon.png');
const activeCertificationBg = require('../../assets/images/active-certification-bg.png');
const activeAppoinmentsBg = require('../../assets/images/active-appoinments-bg.png');
const plusIcon = require('../../assets/images/plus-icon.png');
const appoinmentRedBg = require('../../assets/images/appoinment-red-bg.png');
const rightHandFinger = require('../../assets/images/right-hand-finger.png');
const deleteIcon = require('../../assets/images/delete-icon-red.png');
const issuedWhiteQr = require('../../assets/images/issued-white-qr.png');
const greenQrCode = require('../../assets/images/green-qr-code.png');
const greyEdit = require('../../assets/images/edit-gray-icon.png');

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

const Item = ({ item, onPress, backgroundColor, textColor }) => (
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


  const renderItem = ({ item }) => {
    return (
      <View style={styles.nameContainer}>
        <View style={styles.parentNameContainer}>
          <View style={styles.nameTextContainer}>
            <Text style={{ color: '#20B2AA', textColor: 'grey', marginStart: 8 }}>
              Jenny White
            </Text>
            <Text style={{ marginStart: 8, color: '#adadad' }}>
            My Self
            </Text>
          </View>
          <View style={styles.qrCodeandEditConatiner}>
          <View style={styles.qrEditContainer}>
          <Image source={greenQrCode} style={{ marginLeft: 5 }} />
          </View>
          <View style={styles.editContainer}>
          <Image source={greyEdit} style={{ marginLeft: 5 }} />
          </View>
        
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
            <Image source={menuIcon} style={{ marginLeft: 10 }} />
          </TouchableOpacity>
          <View style={styles.menuItemsCenter}>
            <Image source={smallHeaderLogo} style={{ marginLeft: 5 }} />
          </View>
        </View>
      </View>
      <View style={styles.appoinmentDivBg}>
      <View style={styles.mainDivPad}>

        <View style={styles.actionCertificateContainer}>
          {/* <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        /> */}
          <SwipeListView
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}

            renderHiddenItem={(data, rowMap) => (
              <View style={styles.rowDeleteImage}>


                <View style={styles.deleteItem}>
                  <Image source={deleteIcon} />
                </View>


              </View>
            )}
            disableRightSwipe={true}
            leftOpenValue={75}
            rightOpenValue={-75}
          />

        </View>

       
      </View>
      </View>
      <BottomNavigator
          navigation={navigation}
          selectedItem={{ id: 3, label: 'Family' }}></BottomNavigator>
    </View>

  );
};

const mapStateToProps = state => {
  return {};
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    flex: 1,
    flexDirection: 'column',
  },
  rowDeleteImage: {
    justifyContent: 'flex-end',
    flex: 1,

    display: 'flex',
    flexDirection: 'row',
  },
  editContainer:{
    marginStart:8,
marginBottom:30,
marginTop:-8,
marginEnd:8,

  },
  qrEditContainer:{
    marginTop:-10,

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
  deleteItem: {
    marginEnd: 8,
    marginTop: 22,
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
    backgroundColor: '#F9F9F9',
    textAlign: 'center',
    borderRadius:4,
  },
  parentNameContainer: {
    marginTop: 16,
    flex: 1,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qrCodeandEditConatiner:{
    marginTop: 16,
    flex: 1,

    display: 'flex',
    flexDirection: 'row',
    justifyContent:'flex-end',
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
  },
  appoinmentDivBg : {
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    backgroundColor:'white',
    marginTop:'25%',
  },
  mainMenu: {
    position: 'absolute',
    zIndex: 2000,
    top: '4%',
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
