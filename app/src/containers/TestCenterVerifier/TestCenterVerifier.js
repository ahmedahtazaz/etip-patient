import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
  FlatList,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {useIsFocused} from '@react-navigation/native';
import I18n from '../../translations/I18n';

import {RFValue} from 'react-native-responsive-fontsize';
import {GREEN_COLOR} from '../../theme/Colors';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
const headerLogo = require('../../assets/images/small-header-logo.png');
const phoneDivBg = require('../../assets/images/phone-div-bg.png');
const menuIcon = require('../../assets/images/menu-arrow-icon1.png');
const {width, height} = Dimensions.get('window');
const DATA = [
  {
    name: 'Zeitfenster auswahlen',
    address: 'SudLager 220g, g2249 Vilseck, Germany',
  },
  {
    name: 'Zeitfenster auswahlen',
    address: 'SudLager 220g, g2249 Vilseck, Germany',
  },
  {
    name: 'Zeitfenster auswahlen',
    address: 'SudLager 220g, g2249 Vilseck, Germany',
  },
  {
    name: 'Zeitfenster auswahlen',
    address: 'SudLager 220g, g2249 Vilseck, Germany',
  },
  {
    name: 'Zeitfenster auswahlen',
    address: 'SudLager 220g, g2249 Vilseck, Germany',
  },
  {
    name: 'Zeitfenster auswahlen',
    address: 'SudLager 220g, g2249 Vilseck, Germany',
  },
  {
    name: 'Zeitfenster auswahlen',
    address: 'SudLager 220g, g2249 Vilseck, Germany',
  },
];

function TestCenterVerifier({navigation}) {
  const isFocused = useIsFocused();

  useEffect(() => {
    Orientation.lockToPortrait();
  }, [isFocused]);

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.item}
      key={index}
      onPress={() => navigation.replace('TestCenterInfo')}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.address}>{item.address}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.MainContainer}>
      <View style={styles.mainMenu}>
        <View style={styles.mainMenuItems}>
          {navigation.canGoBack() ? (
            <TouchableOpacity
              style={styles.menuItemsLeft}
              onPress={() => navigation.goBack()}>
              <Image source={menuIcon} style={{marginLeft: 10}} />
            </TouchableOpacity>
          ) : (
            <View style={styles.menuItemsLeft}></View>
          )}
          <View style={styles.menuItemsCenter}>
            <Image source={headerLogo} style={{marginLeft: 5}} />
          </View>
        </View>
      </View>

      <ImageBackground source={phoneDivBg} style={styles.splashbackground}>
        <View style={styles.innerDiv}>
          <View style={{marginBottom: '5%'}}>
            <View>
              <Text style={styles.heading}>{I18n.t('Your test center')}</Text>
            </View>
          </View>
          {renderItem({item: DATA[0], index: 0})}
        </View>
        <View style={styles.innerDiv1}>
          <View style={styles.header}>
            <View>
              <Text style={styles.heading}>{I18n.t('Select test point')}</Text>
              <Text style={styles.subHeading}>
              {I18n.t(' Select the test point you are working today')}
              </Text>
            </View>
          </View>
          <View style={styles.testCenterList}>
            <View style={styles.listView}>
              <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  splashbackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  mainMenu: {
    position: 'absolute',
    zIndex: 2000,
    top: '5%',
    width: '100%',
  },
  mainMenuItems: {
    flexDirection: 'row',
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft:10,
  },
  menuItemsLeft: {
    position: 'relative',
    alignSelf: 'flex-start',
    width: '43%',
  },
  menuItemsCenter: {
    position: 'relative',
    alignSelf: 'center',
  },
  innerDiv: {
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '35%',
  },
  innerDiv1: {
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '10%',
  },
  listView: {
    marginTop: 30,
  },

  testCenterList: {
    height: '70%',
  },
  heading: {
    fontSize: RFValue(18, 580),
    fontWeight: 'bold',
  },
  subHeading: {
    color: '#bcbcbc',
    fontSize: RFValue(14, 580),
  },
  name: {
    fontSize: RFValue(12, 580),
    color: '#027279',
  },
  address: {
    fontSize: RFValue(10, 580),
    color: '#606060',
  },
  item: {
    display: 'flex',
    borderRadius: 4,
    flexDirection: 'column',
    backgroundColor: '#F9F9F9',
    padding: 10,
    marginBottom: 10,
  },
});

export default TestCenterVerifier;
