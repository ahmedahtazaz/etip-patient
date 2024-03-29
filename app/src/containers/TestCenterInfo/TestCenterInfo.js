import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {useIsFocused} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {RFValue} from 'react-native-responsive-fontsize';
import {BLACK_COLOR, GREEN_COLOR, WHITE_COLOR} from '../../theme/Colors';
import BottomNavigator from '../../components/BottomNavigator';
const testCenterInfoBg = require('../../assets/images/test-center-info-bg.png');
const headerLogo = require('../../assets/images/splash-logo1.png');
const btnQrCode = require('../../assets/images/btn-qr-code.png');
const {width, height} = Dimensions.get('window');

const DATA = [
  {
    name: 'P-1234',
    date: '12/Apr/2020 10:00',
  },
  {
    name: 'P-1234',
    date: '12/Apr/2020 10:00',
  },
  {
    name: 'P-1234',
    date: '12/Apr/2020 10:00',
  },
];

function TestCenterInfo({navigation}) {
  const isFocused = useIsFocused();

  useEffect(() => {
    Orientation.lockToPortrait();
  }, [isFocused]);

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.item}
      key={index}
      onPress={() => navigation.navigate('TestInformationScreen')}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.MainContainer}>
      <View style={styles.header}>
        <ImageBackground
          source={testCenterInfoBg}
          style={styles.splashbackground}>
          <View style={styles.mainMenu}>
            <Image source={headerLogo} />
          </View>
          <View>
            <Text style={styles.heading}>Hello, Jone!</Text>
            <Text style={styles.subHeading}>
              Hope you are having a good day
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.testCenterList}>
        <View style={styles.innerDiv}>
          <TouchableOpacity
            style={styles.centerLabel}
            onPress={() => navigation.navigate('TestCenter')}>
            <View>
              <Text style={styles.centerTitle}>Test Center</Text>
              <Text style={styles.centerName}>Zeitfenster auswahlen</Text>
            </View>
            <View>
              <Entypo
                name="chevron-small-right"
                color={GREEN_COLOR}
                size={20}
              />
            </View>
          </TouchableOpacity>

          <Text
            style={{
              fontSize: RFValue(13, 580),
              marginTop: 30,
              fontWeight: '600',
            }}>
            Test Awaiting for results
          </Text>

          <View style={styles.patientList}>
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={(item, index) => index}
            />
          </View>

          <View>
            <TouchableOpacity
              style={[styles.btnStyle, styles.submitButton]}
              onPress={() => navigation.navigate('QRScreen')}>
              <Image source={btnQrCode} />
              <Text style={styles.submitText}>Scan QR Code</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={{width: '100%'}}
              onPress={() => navigation.navigate('VerifierUserInfoScreen')}>
              <Text style={styles.scanAnotherQRcode}>Insert Person Info</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <BottomNavigator
        navigation={navigation}
        selectedItem={{id: 1, label: 'Home'}}></BottomNavigator>
    </View>
  );
}

const styles = StyleSheet.create({
  patientList: {
    marginTop: 30,
    height: '55%',
  },
  MainContainer: {
    backgroundColor: WHITE_COLOR,
    flex: 1,
  },
  splashbackground: {
    flex: 1,
    resizeMode: 'cover',
    paddingTop: '25%',
    paddingBottom: '15%',
    flexDirection: 'column',
    paddingLeft: 20,
    width,
  },
  mainMenu: {
    position: 'absolute',
    zIndex: 2000,
    top: '40%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '7%',
  },
  header: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    overflow: 'hidden',

    backgroundColor: 'gray',
    alignItems: 'center',
  },
  testCenterList: {
    height: height * 0.7,
    paddingHorizontal: 5,
  },
  listView: {
    marginTop: 30,
  },

  heading: {
    fontSize: RFValue(20, 580),
    fontWeight: 'bold',
    color: WHITE_COLOR,
  },
  subHeading: {
    color: WHITE_COLOR,
    fontSize: RFValue(14, 580),
    marginTop: 5,
  },
  item: {
    height: 60,
    padding: 10,
    borderWidth: 1,
    paddingLeft: 15,
    paddingBottom: 15,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: WHITE_COLOR,
    borderColor: '#ebe9e9',
  },
  centerName: {
    fontSize: RFValue(12, 580),
    color: GREEN_COLOR,
  },
  centerTitle: {
    fontSize: RFValue(12, 580),
    color: '#606060',
  },
  centerLabel: {
    backgroundColor: WHITE_COLOR,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: -30,
    paddingTop: 5,
    paddingBottom: 5,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  name: {
    fontSize: RFValue(12, 580),
    color: BLACK_COLOR,
  },
  date: {
    fontSize: RFValue(12, 580),
    color: '#919e9c',
  },
  btnStyle: {
    backgroundColor: GREEN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    paddingTop: 20,
    paddingBottom: 20,
    elevation: 2,
    height: 60,
    paddingHorizontal: 5,
    width: '100%',
    borderRadius: 8,
    marginTop: '5%',
  },
  scanAnotherQRcode: {
    fontSize: RFValue(14, 580),
    color: GREEN_COLOR,
    textAlign: 'center',
    marginTop: 5,
  },
  submitText: {
    color: WHITE_COLOR,
    fontSize: RFValue(14, 580),
    marginLeft: 15,
  },
  innerDiv: {
    paddingLeft: '5%',
    paddingRight: '5%',
  },
});

export default TestCenterInfo;
