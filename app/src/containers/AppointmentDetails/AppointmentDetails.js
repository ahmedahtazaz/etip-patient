import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {WHITE_COLOR} from '../../theme/Colors';
import QRCode from 'react-native-qrcode-svg';
import I18n from '../../translations/I18n';
import {getProfileInfoAction} from './Action';
import moment from 'moment';
const activeCertificationBg = require('../../assets/images/active-certification-bg.png');
const menuArrowIcon = require('../../assets/images/menu-arrow-icon.png');
const previousAppoinmentsBg = require('../../assets/images/previous-appoinment-bg.png');
const issuedWhiteQr = require('../../assets/images/issued-white-qr.png');
const issuedRedIcon = require('../../assets/images/issued-by-red-icon.png');
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const AppointmentDetails = ({
  navigation,
  route: {
    params: {getProfile, path, userInfoParam},
  },
  loader,
}) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (userInfoParam) {
      if (path == 'personal')
        setTitle(userInfoParam.firstName + ' ' + userInfoParam.lastName);
    }
  }, [userInfoParam]);

  return (
    <View style={{height: '100%', width: '100%', flexDirection: 'column'}}>
      <View style={styles.header}>
        <View style={styles.backIcon}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <EvilIcons
              name="chevron-left"
              color="#000"
              size={40}
              style={{fontWeight: 'bold'}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerTextView}>
          <Text style={styles.headerText}>{I18n.t('Make an Appointment')}</Text>
        </View>
      </View>
      <View style={styles.appoinmentDivBg}>
      <View style={styles.mainView}>
        {path == 'personal' ? (
          <View style={styles.activeCertificationDiv}>
            <ImageBackground
              source={previousAppoinmentsBg}
              style={{width: '100%', height: '100%', resizeMode: 'cover'}}>
              <View style={styles.contentPadding}>
                <Text style={styles.boxHeading1}>{title ? title : ''}</Text>
                <Text style={styles.boxText1}>
                  {I18n.t('This is my personal QR code.')}
                </Text>
              </View>
            </ImageBackground>
          </View>
        ) : path == 'certificates' ? (
          <View style={styles.activeAppoinmentsDiv}>
            <ImageBackground
              source={activeCertificationBg}
              style={{width: '100%', height: '100%', resizeMode: 'cover'}}>
              <View style={styles.parentNameContainer}>
                <View style={styles.nameTextContainer}>
                  <Text style={styles.boxHeading}>{I18n.t('SARS-COV-2')}</Text>
                  <Text style={styles.boxTestText}>
                    {I18n.t('Citigen Antizen Test')}
                  </Text>
                </View>
                <View style={styles.nameTextContainer}>
                  <TouchableOpacity
                    style={[styles.buttonStyle, styles.submitButtonDark]}
                    onPress={() => moveToMainScreen(navigation)}>
                    <Text style={{color: 'white'}}>{I18n.t('24 hours')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.parentNameContainer}>
                <View style={styles.bottomTextContainer}>
                  <View style={styles.iconRowContainer}>
                    <View style={styles.issueIcon}>
                      <Image source={issuedRedIcon} />
                    </View>
                    <View>
                      <Text style={styles.boxHeading}>
                        {I18n.t('issued by')}
                      </Text>
                      <Text style={styles.boxText}>
                        {I18n.t('Citigen Antizen Test')}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.nameTextContainer}>
                  <View style={styles.qrCodeItem}>
                    <Image source={issuedWhiteQr} />
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        ) : path == 'appointment' ? (
          <View style={styles.activeAppoinmentsDiv}>
            <ImageBackground
              source={activeCertificationBg}
              style={{width: '100%', height: '100%', resizeMode: 'cover'}}>
              <View style={styles.parentNameContainer}>
                <View style={styles.nameTextContainer} >
                  <Text style={styles.boxHeading}>
                    {userInfoParam?.testPoint?.testCenter?.test?.testType}
                  </Text>
                  <Text style={styles.boxTestText}>
                    {userInfoParam?.testPoint?.name}
                  </Text>
                </View>
                <View style={styles.nameTextContainer} >
                  <Text style={styles.boxHeading}>
                    {moment(userInfoParam?.day).format('DD/MM/YYYY')}
                  </Text>
                  <Text style={styles.boxText}>{userInfoParam?.time}</Text>
                </View>
              </View>
              <View style={styles.parentNameContainer}>
                <View style={styles.bottomTextContainer}>
                  <Text style={styles.boxHeading}>
                    {userInfoParam?.testPoint?.testCenter?.name}
                  </Text>
                  <Text style={styles.boxTestText}>{userInfoParam?.name}</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
        ) : null}
        {loader && getProfile ? (
          <View
            style={{
              alignSelf: 'center',
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              position: 'absolute',
              zIndex: 1000,
            }}>
            <ActivityIndicator size="large" color="grey" animating={loader} />
          </View>
        ) : (
          <View style={styles.qrDiv}>
            <QRCode value={JSON.stringify(userInfoParam)} size={250} />
          </View>
        )}
      </View>
      </View>
    </View>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getProfileInfo: data => dispatch(getProfileInfoAction(data)),
  };
};

const mapStateToProps = state => {
  return {
    loader: state.appointmentDetailsReducer.loader,
  };
};

const styles = StyleSheet.create({
  activeCertificationDiv: {
    borderRadius: 10,
    flexWrap: 'wrap',

    display: 'flex',
    flexDirection: 'column',
    resizeMode: 'cover',
    overflow: 'hidden',
    
    maxHeight: 153,
    marginBottom: 50,
  },
  activeAppoinmentsDiv: {
    borderRadius: 10,

    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'left',
    marginBottom: 50,
    
    resizeMode: 'cover',
    overflow: 'hidden',

    minHeight: 153,
  },
  mainView: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: '4%',
    paddingRight: '4%',
    paddingTop: 52,
  },
  header: {
    flexDirection: 'row',
    height: height * 0.1,
    alignItems: 'center',
    paddingTop: '7%',
    width,
  },
  backIcon: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerTextView: {
    flex: 9,
    alignItems: 'center',
    paddingRight: width * 0.1,
  },
  headerText: {
    fontSize: RFValue(16, 580),
  },
  appoinmentDivBg: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    height:'88%',
    marginTop: '5%',
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
  boxTestText: {
    fontSize: RFValue(13, 580),
    color: WHITE_COLOR,
    fontWeight: '400',
  },
  boxHeading1: {
    fontSize: RFValue(14, 580),
    color: '#595050',
    fontWeight: '800',

    paddingBottom: 10,
  },
  boxText1: {
    fontSize: RFValue(12, 580),
    color: '#595050',
    fontWeight: '400',

    lineHeight: 20,
  },
  nameContainer: {
    alignSelf: 'stretch',

    backgroundColor: 'white',
    textAlign: 'center',
  },
  parentNameContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingLeft: 13,
    paddingRight: 20,
    paddingBottom: 10,
  },
  bottomTextContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  iconRowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 15,
    paddingLeft: 13,
  },
  qrCodeItem: {
    marginEnd: 16,
    marginTop: 22,
  },
  issueIcon: {
    marginEnd: 16,
    marginBottom: 16,
    marginStart: -16,
    marginTop: 4,
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
    width: 65,
    height: 38,
    borderRadius: 17,
    backgroundColor: '#12878D',
    color: WHITE_COLOR,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: RFValue(14, 580),
    fontWeight: '600',
    marginTop: '8%',
  },
  submitButtonRed: {
    width: 65,
    height: 38,
    borderRadius: 17,
    backgroundColor: '#FB4646',
    color: WHITE_COLOR,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: RFValue(14, 580),
    fontWeight: '600',
    marginTop: '8%',
  },
  qrDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentDetails);
