import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import { moveToMainScreenAction, resetIsCertificateIssuedAction, issueCertificateAction } from './Action';
import I18n from '../../translations/I18n';
import { Switch } from 'react-native-paper';
import moment from 'moment';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import Orientation from 'react-native-orientation-locker';
import { useIsFocused } from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';

const menuIcon = require('../../assets/images/menu-icon.png');
const menuArrowIcon = require('../../assets/images/menu-arrow-icon.png');
const smallHeaderLogo = require('../../assets/images/small-header-logo.png');
const mainScreenIcon = require('../../assets/images/main-screen-icon.png');
const activeCertificationBg = require('../../assets/images/active-certification-bg.png');
const previousAppoinmentsBg = require('../../assets/images/previous-appoinment-bg.png');
const plusIcon = require('../../assets/images/plus-icon.png');
import { BLACK_COLOR, GREEN_COLOR, WHITE_COLOR } from '../../theme/Colors';
import { issue_certificate_url } from '../../commons/environment';
import { showToast } from '../../commons/Constants';
import { ActivityIndicator } from 'react-native';
const { width, height } = Dimensions.get('window');

function TestInformation({
  moveToMainScreen,
  navigation,
  startApplicationPayload,
  verifyPinPayload,
  issueCertificate,
  errMessage,
  loader,
  isCertificateIssued,
  resetIsCertificateIssued
}) {
  const [result, setResult] = useState('positive');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const isFocused = useIsFocused();

  useEffect(() => {
    Orientation.lockToPortrait();
  }, [isFocused]);

  useEffect(() => {
    if (errMessage) {
      showToast(errMessage);
    }
  }, [errMessage]);


  useEffect(() => {
    if (isCertificateIssued) {
      moveToMainScreen(navigation);
      resetIsCertificateIssued();
    }
  }, [isCertificateIssued]);

  const issueCertificateHandler = () => {
    const data = {
      userid: verifyPinPayload?.user?._id,
      body: {
        applicationId: startApplicationPayload?.applicationId,
        reportStatus: result
      },
      url: issue_certificate_url
    }

    issueCertificate(data);

  }

  return (
    <View style={styles.MainContainer}>
      <View style={styles.header}>
        <View style={styles.backIcon}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <EvilIcons name="chevron-left" color="#000" size={40} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.headerText}>{I18n.t('Test Information')}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoContainerChild}>
          <View style={styles.patientInfo}>
            <ImageBackground
              source={activeCertificationBg}
              style={styles.imagepatientInfo}>
              <View style={styles.patientInfoR1}>
                <Text style={styles.patientId}>{startApplicationPayload?.name}</Text>
              </View>
              <View style={styles.patientInfoR2}>
                <View style={styles.nameAndTestPoint}>
                  <Text style={styles.textSize}>{I18n.t('Zeitfenster auswahlen')}</Text>
                  <Text style={styles.textSize}>{I18n.t(startApplicationPayload?.testPoint?.name)}</Text>
                </View>
                <View style={styles.dateAndTime}>
                  <Text style={styles.textSize}>{moment(startApplicationPayload?.appointmentDate).format("DD MMM YYYY")}</Text>
                  <Text style={styles.textSize}>{startApplicationPayload?.appointmentTime}</Text>
                </View>
              </View>
            </ImageBackground>
          </View>

          <View>
            <View style={{ marginTop: 30, marginBottom: 10 }}>
              <Text style={{ ...styles.textSize, color: BLACK_COLOR }}>
                {I18n.t('Test Result')}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.inputStyle1}
              onPress={() => setResult('positive')}>
              <View style={styles.testOption}>
                <Text>Positive</Text>
                {result === 'positive' && (
                  <Ionicons
                    name="checkmark-circle"
                    color={GREEN_COLOR}
                    size={15}
                  />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.inputStyle1}
              onPress={() => setResult('negative')}>
              <View style={styles.testOption}>
                <Text>Negative</Text>
                {result === 'negative' && (
                  <Ionicons
                    name="checkmark-circle"
                    color={GREEN_COLOR}
                    size={15}
                  />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.inputStyle1}
              onPress={() => setResult('invalid')}>
              <View style={styles.testOption}>
                <Text>Invalid</Text>
                {result === 'invalid' && (
                  <Ionicons
                    name="checkmark-circle"
                    color={GREEN_COLOR}
                    size={15}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.switchMain}>
            <View style={styles.switchTextView}>
              <Text style={styles.switchText}>
                {I18n.t('Send Email notification to relevant authority')}
              </Text>
            </View>
            <View style={styles.switchView}>
              <Switch
                trackColor={{ false: 'grey', true: '#4a9b8b' }}
                thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>

          <View style={styles.bottomBtnDiv}>
            <TouchableOpacity
              style={[styles.btnStyle, styles.submitButton]}
              onPress={issueCertificateHandler}>
              <Text style={styles.submitText}>{I18n.t('Issue Certificate')}</Text>
            </TouchableOpacity>



            <TouchableOpacity
              style={{ width: '100%' }}
              onPress={() => navigation.goBack()}>
              <Text style={styles.scanAnotherQRcode}>{I18n.t('Scan Another QR Code')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {loader ? (
          <View
            style={{
              alignSelf: 'center',
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              position: 'absolute',
              zIndex: 1000,
            }}>
            <ActivityIndicator
              size="large"
              color="grey"
              animating={loader}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  switchMain: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  switchTextView: {
    // width: width * 0.7
    width: '88%',
  },
  switchText: {
    color: '#c0c0c0',
    fontSize: RFValue(14, 580),
  },
  switchView: {
    // width: width * 0.2

  },
  testOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textSize: {
    fontSize: RFValue(12, 580),
    color: WHITE_COLOR,
  },
  nameAndTestPoint: {
    flex: 1,
  },
  dateAndTime: {
    flex: 1,
    alignItems: 'flex-end',
  },
  patientInfoR2: {
    flexDirection: 'row',
  },
  header: {
    flexDirection: 'row',
    height: '11%',
    paddingTop: 30,
    alignItems: 'center',
    width,
  },
  infoContainerChild: {
    paddingTop: 30,
    borderWidth: 1,
    marginTop: 20,
    borderColor: '#f2f4f3',
    backgroundColor: '#ffffff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingLeft: 15,
    paddingRight: 15,
    height: '95%'
  },
  backIcon: {
    marginHorizontal: 5,
    width: width * 0.1,
  },
  headerText: {
    fontSize: RFValue(16, 580),
    width: width * 0.8,
    textAlign: 'center',
  },
  infoContainer: {

  },
  sectionContainer: {
    backgroundColor: Colors.black,
  },

  MainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F9F8',
  },

  patientInfo: {
    borderRadius: 10,
    backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    resizeMode: 'cover',
    overflow: 'hidden',
  },

  imagepatientInfo: {
    borderRadius: 10,
    padding: 10,
    display: 'flex',

    flexDirection: 'column',
    resizeMode: 'cover',
    overflow: 'hidden',
    paddingBottom: 15,
  },
  patientId: {
    marginVertical: 12,
    fontSize: RFValue(20, 580),
    color: WHITE_COLOR,
  },
  bottomBtnDiv: {
    position: 'absolute',
    width: '98%',
    left: '5%',
    bottom: '12%'

  },
  inputStyle1: {
    display: 'flex',

    backgroundColor: '#ffffff',
    borderRadius: 6,
    fontSize: RFValue(14, 580),
    color: '#1d1c1c',
    paddingTop: '4%',
    paddingBottom: '4%',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e0dfdf',
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
    elevation: 2,

    height: '65%',

    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 8,
  },
  submitText: {
    color: WHITE_COLOR,
    fontSize: RFValue(14, 580),
  },
  scanAnotherQRcode: {
    fontSize: RFValue(14, 580),
    color: GREEN_COLOR,
    textAlign: 'center',
    marginTop: 5,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    moveToMainScreen: navigation => moveToMainScreenAction(navigation),
    issueCertificate: data => dispatch(issueCertificateAction(data)),
    resetIsCertificateIssued: () => dispatch(resetIsCertificateIssuedAction())
  };
};

const mapStateToProps = state => {
  return {
    startApplicationPayload: state.qrScreenReducer.startApplicationPayload,
    verifyPinPayload: state.pinScreenReducer.verifyPinPayload,
    errMessage: state.issueCertificateReducer.errMessage,
    loader: state.issueCertificateReducer.loader,
    isCertificateIssued: state.issueCertificateReducer.isCertificateIssued,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TestInformation);
