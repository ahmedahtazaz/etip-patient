import {useIsFocused} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
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
import {Dimensions} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {WHITE_COLOR} from '../../theme/Colors';
import {RFValue} from 'react-native-responsive-fontsize';
const mainScreenIcon = require('../../assets/images/main-screen-icon.png');
const activeCertificationBg = require('../../assets/images/active-certification-bg.png');
const activeAppoinmentsBg = require('../../assets/images/active-appoinments-bg.png');

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

const MainScreen = () => {
  const window = useWindowDimensions();

  const [selectedId, setSelectedId] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    Orientation.lockToPortrait();
  }, [isFocused]);

  const renderItem = ({item}) => {
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={styles.activeCertificationDiv} >
      <ImageBackground source={activeCertificationBg} style={{width: '100%', height:'100%', resizeMode: 'cover',}}>
      <View style={styles.contentPadding}>
        <Text style={styles.boxHeading}>No Active Certificate</Text>
        <Text style={styles.boxText}>You don’t have any active certificate at the moment</Text>
        </View>
      </ImageBackground>
      </View>
      </View>
      
    );
  };

  const renderItemAppointment = ({item}) => {
    return (
      <View>
        <View style={styles.activeAppoinmentsDiv} >
        <ImageBackground source={activeAppoinmentsBg} style={styles.activeAppoinmentsDiv} style={{width: '100%', height:'100%', resizeMode: 'cover',}} >
        <View style={styles.contentPadding}>
        <Text style={styles.boxHeading}>No Active Certificate</Text>
        <Text style={styles.boxText}>You don’t have any active certificate at the moment</Text>
        </View>
      </ImageBackground>
      </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <View style={styles.parentNameContainer}>
          <View style={styles.nameTextContainer}>
            <Text style={{fontSize: 25, fontWeight: 'bold', marginStart: 8}}>
              Hi Jenny
            </Text>
            <Text style={{textColor: 'grey', marginStart: 8}}>
              Hope u r feeling healthy today 
            </Text>
          </View>

          <View>
            <Image
              style={{height: 50, width: 50, marginEnd: 8}}
              source={mainScreenIcon}
            />
          </View>
        </View>
      </View>
      <View style={styles.actionCertificateContainer}>
        <Text style={styles.boxTopHeading}>
          ACTIVE CERTIFICATES
        </Text>
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
          vertical
          data={DATA}
          renderItem={renderItemAppointment}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingLeft: '3%',
    paddingRight: '3%',
    flex:1,
  },
  activeCertificationDiv : {
    borderRadius:10,
    flexWrap: 'wrap',

    display: 'flex',
    flexDirection: 'column', 
    resizeMode: 'cover',
    overflow:'hidden',
    marginEnd:10,
    maxHeight:153,
    
  },
  activeAppoinmentsDiv : {
    borderRadius:10,
   
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign:'left',
    marginBottom:10,
    resizeMode: 'cover',
    overflow:'hidden',
    
    minHeight:153,
  },
  contentPadding : {
    paddingTop:25,
    paddingBottom:25,
    paddingLeft:13,
    paddingRight:50,
  },
  boxHeading : {
    fontSize: RFValue(14, 580),
    color: WHITE_COLOR,
    fontWeight: '800',
   
   
    paddingBottom:10,
  },
  boxText : {
    fontSize: RFValue(13, 580),
    color: WHITE_COLOR,
    fontWeight: '400',
   
    lineHeight:20,
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
  boxTopHeading : {
    marginBottom: 8, marginStart: 8, color:'#595050', fontWeight:'600', fontSize: RFValue(12, 580),
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
});

export default MainScreen;
