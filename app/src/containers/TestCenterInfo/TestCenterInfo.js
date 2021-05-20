import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import I18n from '../../translations/I18n';
import Orientation from 'react-native-orientation-locker';
import {useIsFocused} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import {RFValue} from 'react-native-responsive-fontsize';
import {BLACK_COLOR, GREEN_COLOR, WHITE_COLOR} from '../../theme/Colors';
import BottomNavigator from '../../components/BottomNavigator';
const testCenterInfoBg = require('../../assets/images/test-center-info-bg.png');
const headerLogo = require('../../assets/images/splash-logo1.png');
const btnQrCode = require('../../assets/images/btn-qr-code.png');
const testInfoBg = require('../../assets/images/test-info-bg.png');

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
  const [isUpdated, setIsUpdated] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    Orientation.lockToPortrait();
    if (isFocused) setIsUpdated(true);
  }, [isFocused]);

  useEffect(() => {
    if (isUpdated) setIsUpdated(false);
  }, [isUpdated]);

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
          <View style={{height: '100%', top: '50%'}}>
            <Text style={styles.heading}>{I18n.t('Hello, Jone!')}</Text>
            <Text style={styles.subHeading}>
              {I18n.t('Hope you are having a good day')}
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.testCenterList}>
        <ImageBackground source={testInfoBg} style={styles.splashbackground1}>
          <View style={styles.innerDiv}>
            <TouchableOpacity
              style={styles.centerLabel}
              onPress={() => navigation.navigate('TestCenter')}>
              <View>
                <Text style={styles.centerTitle}>{I18n.t('Test Center')}</Text>
                <Text style={styles.centerName}>
                  {I18n.t('Zeitfenster auswahlen')}
                </Text>
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
              {I18n.t('Test Awaiting for results')}
            </Text>

            <View style={styles.patientList}>
              <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
              />
            </View>
          </View>
          <View style={styles.bottomBtnDiv}>
            <TouchableOpacity
              style={[styles.btnStyle, styles.submitButton]}
              onPress={() => navigation.navigate('QRScreen')}>
              <Image source={btnQrCode} />
              <Text style={styles.submitText}>{I18n.t('Scan QR Code')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{width: '100%'}}
              onPress={() => navigation.navigate('VerifierUserInfoScreen')}>
              <Text style={styles.scanAnotherQRcode}>
                {I18n.t('Insert Person Info')}
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      <BottomNavigator
        navigation={navigation}
        selectedItem={{id: 1, label: 'Home'}}></BottomNavigator>
    </View>
  );
}

const styles = StyleSheet.create({
  patientList: {
    marginTop: 10,
    height: '46%',
  },
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  splashbackground: {
    flex: 1,
    resizeMode: 'cover',
    flexDirection: 'column',
    paddingLeft: 20,
    height: '100%',
  },
  splashbackground1: {
    resizeMode: 'cover',
    height: '82%',
  },
  mainMenu: {
    position: 'absolute',
    zIndex: 2000,
    top: '20%',
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
    height: '30%',
  },
  testCenterList: {
    backgroundColor: 'white',
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
    height: '18%',
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
  bottomBtnDiv: {
    position: 'absolute',
    width: '90%',
    left: '5%',
    bottom: '12%',
  },
  btnStyle: {
    backgroundColor: GREEN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    paddingTop: 20,
    paddingBottom: 20,
    elevation: 2,
    height: '70%',

    width: '100%',
    borderRadius: 8,
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
