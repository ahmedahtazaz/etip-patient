import React, { useEffect, useState } from 'react';
import { Icon, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { RFValue } from 'react-native-responsive-fontsize';
import HTML from 'react-native-render-html';

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
  ScrollView

} from 'react-native';
import { Dimensions } from 'react-native';
import Calendar from '../../components/Calendar';
import BottomNavigator from '../../components/BottomNavigator';
import { SwipeListView } from 'react-native-swipe-list-view';
import I18n from '../../translations/I18n';
import { get_about_app_url, get_terms_url } from '../../commons/environment';
const menuArrowWhiteIcon = require('../../assets/images/menu-arrow-white-icon.png');
const { width, height } = Dimensions.get('window');
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { WebView } from 'react-native-webview';
import store from '../../../store'

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
  getterms
} from './Actions';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const htmlContent = `
    <h1>VR Lorem ipsum dolor sit amet, consectetur adipiscing elit. !</h1>
    <em>By <b class="author">React Native Master</b></em>
    <img src="https://image.freepik.com/free-photo/young-woman-using-vr-glasses-with-neon-lights_155003-17747.jpg" />
    <p>Vivamus bibendum feugiat pretium. <a href="https://reactnativemaster.com/">Vestibulum ultricies rutrum ornare</a>. Donec eget suscipit tortor. Nullam pellentesque nibh sagittis, pharetra quam a, varius sapien. Pellentesque ut leo id mauris hendrerit ultrices et non mauris. Quisque gravida erat at felis tincidunt tincidunt. Etiam sit amet egestas leo. Cras mollis mi sed lorem finibus, interdum molestie magna mollis. Sed venenatis lorem nec magna convallis iaculis.</p>
    <iframe height="315" src="https://www.youtube.com/embed/fnCmUWqKo6g" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`;
const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const Terms = ({
  getterms,
  navigation
}) => {
  const window = useWindowDimensions();

  const [selectedId, setSelectedId] = useState(null);


  useEffect(() => {
  
   
   // I18n.locale = "ar";
    getterms(get_terms_url);

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

          <Text style={styles.headerText}>{I18n.t('Address')}</Text>
        </View>
      </View>
      <View style={styles.appoinmentDivBg}>
        <HTML
          html={htmlContent}
          tagsStyles={tagsStyles}
          classesStyles={classesStyles}
          imagesMaxWidth={Dimensions.get('window').width * .9}
          staticContentMaxWidth={Dimensions.get('window').width * .9}
        />
      </View>

    </View>
  );
};

const tagsStyles = {
  h1: {
    color: '#6728C7',
    textAlign: 'center',
    marginBottom: 10
  },
  img: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20
  }
}

const classesStyles = {
  'author': {
    color: '#CA43AC',
  },
}
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
    getterms: data => dispatch(getterms(data)),

  };

};

const mapStateToProps = state => {
  // console.log('datatata');
  //  console.log(state.getTermsReducer);

  return {
    initLoaded: state.getTermsReducer.initPayLoad,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Terms);
