import React, { useEffect,useState } from 'react';
import { Icon, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import {RFValue} from 'react-native-responsive-fontsize';

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
import I18n from '../../translations/I18n';
import { get_about_app_url, get_terms_url } from '../../commons/environment';
const menuArrowWhiteIcon = require('../../assets/images/menu-arrow-white-icon.png');
const {width, height} = Dimensions.get('window');
import EvilIcons from 'react-native-vector-icons/EvilIcons';

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
  GetABoutApp
} from './Actions';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const Terms = ({
  GetABoutApp,
    navigation
}) => {
  const window = useWindowDimensions();

  const [selectedId, setSelectedId] = useState(null);


useEffect(() => {
    I18n.locale = "en";
    GetABoutApp(get_about_app_url+I18n.locale);

}, []);
  return (
    <View style={styles.container}>
         <View style={styles.header}>
        <View style={styles.backIcon}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <EvilIcons name="chevron-left" color="#000" size={30} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.headerText}>Acout App</Text>
        </View>
      </View>
    <View style={styles.appoinmentDivBg}>
     <Text>hahahah</Text>
    </View>
   
  </View>
  );
};


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: '11%',
    paddingTop: 30,
    alignItems: 'center',
    width,
  },
  container: {
    height,
    backgroundColor: 'white',
  },
  rowDeleteImage: {
    justifyContent: 'flex-end',
    flex: 1,

    display: 'flex',
    flexDirection: 'row',
  },
  backIcon: {
    marginHorizontal: 5,
    width: width * 0.1,
  },
  editContainer: {
    marginStart: 8,
    marginBottom: 30,
    marginTop: -8,
    marginEnd: 8,
  },
  headerText: {
    fontSize: RFValue(16, 580),
    width: width * 0.8,
    textAlign: 'center',
  },
  qrEditContainer: {
    marginTop: -10,
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
    borderRadius: 4,
  },
  parentNameContainer: {
    marginTop: 16,
    flex: 1,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qrCodeandEditConatiner: {
    marginTop: 16,
    flex: 1,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
  appoinmentDivBg: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    marginTop: '25%',
    marginStart:16,
    marginBottom:16,
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
});
const mapDispatchToProps = dispatch => {
  return {
    GetABoutApp: data =>dispatch( GetABoutApp(data)),

  };
};

const mapStateToProps = state => {
  return {
    initLoaded: state.welcomeReducer.initLoaded,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Terms);
