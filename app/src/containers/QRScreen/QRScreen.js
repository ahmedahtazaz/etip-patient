import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import { getStartApplicationAction, resetIsApplicationStartedAction } from './Actions';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import I18n from '../../translations/I18n';
import QRCodeScanner from 'react-native-qrcode-scanner';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { get_start_application_url } from '../../commons/environment';
import { connect } from 'react-redux';
import { showToast } from '../../commons/Constants';
const scanQrBg = require('../../assets/images/scan-qr-bg.png');
const { width, height } = Dimensions.get('window');

function QRScreen({
  navigation,
  getStartApplication,
  isApplicationStarted,
  resetIsApplicationStarted,
  loader,
  errMessage
}) {
  const [isScaned, setIsScaned] = useState(false);
  const [certificate_request, setCertificateRequest] = useState('');
  const [proof_request, setProofRequest] = useState('');
  var arr = [];
  var arr2 = [];

  const onSuccess = e => {
    console.log('e.data:: ', e.data)
    const qrData = JSON.parse(e.data);
    console.log("data: ", qrData)
    if (!isScaned && qrData && qrData.applicationId) {
      let data = {
        url: `${get_start_application_url}/${qrData.applicationId}`
      }
      getStartApplication(data);
      setIsScaned(true);
    }
  };

  useEffect(() => {
    if (isApplicationStarted) {
      setIsScaned(false);
      navigation.navigate("TestInformationScreen")
      resetIsApplicationStarted();
    }

  }, [isApplicationStarted])


  useEffect(() => {
    if (errMessage) {
      showToast(errMessage);
      setIsScaned(false)
    }
  }, [errMessage]);

  return (
    <View style={styles.MainContainer}>
      <View style={styles.header}>
        <View style={styles.backIcon}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <EvilIcons
              name="chevron-left"
              color="#000"
              size={40}
              style={{ fontWeight: 'bold' }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerTextView}>
          <Text style={styles.headerText}>{I18n.t('Scan QR Code')}</Text>
        </View>
      </View>
      <View style={styles.scanner}>
        <ImageBackground source={scanQrBg} style={styles.splashbackground}>
          <QRCodeScanner
            reactivate={true}
            showMarker={true}
            cameraStyle={{ width: '90%', marginLeft: '5%' }}
            customMarker={
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'transparent',
                }}>
                <View
                  style={{
                    height: 250,
                    width: 250,
                    borderWidth: 2,
                    borderColor: 'white',
                    backgroundColor: 'transparent',
                  }}
                />
              </View>
            }
            ref={node => {
              scanner = node;
            }}
            onRead={onSuccess}
            topContent={
              <Text style={styles.textBold}>
                {I18n.t('Scan QR code for patient information')}
              </Text>
            }
            bottomContent={
              <TouchableOpacity
                style={styles.buttonTouchable}
                onPress={() => {
                  navigation.navigate('VerifierUserInfoScreen');
                }}>
                <Text style={styles.buttonText}>{I18n.t('Or Add User Info')}</Text>
              </TouchableOpacity>
            }
          />
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
              <ActivityIndicator size="large" color="grey" animating={loader} />
            </View>
          ) : null}
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  splashbackground: {
    flex: 1,
    resizeMode: 'cover',
    flexDirection: 'column',
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'row',
    height: '11%',
    alignItems: 'center',
    paddingTop: '9%',
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
  scanner: {
    height: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    marginTop: '8%',
  },
  sectionContainer: {
    backgroundColor: Colors.black,
  },
  textBold: {
    fontSize: RFValue(13, 580),

    zIndex: 10,

    textAlign: 'center',
    fontWeight: '600',
    color: '#fff',
  },
  buttonText: {
    fontSize: 21,
    paddingBottom: 20,
    color: '#ffffff',
  },
  buttonTouchable: {
    padding: 16,
  },

  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: 'red',
  },

  MainContainer: {
    backgroundColor: '#F5F9F8',
    width: '100%',
    height: '100%',
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  Imagesize: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },

  RoundButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4178CD',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    width: 150,
    borderRadius: 20,
    margin: 5,
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 15,
    width: 15,
    marginLeft: 15,
  },
  TextGuide: {
    color: 'black',
    marginTop: 14,
    marginLeft: 5,
    marginBottom: 30,
  },
  TextStyle: {
    color: 'white',
    marginTop: 14,
    marginLeft: 5,
    marginBottom: 15,
  },
  SeparatorLine: {
    backgroundColor: '#fff',
    width: 1,
    height: 40,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    getStartApplication: data => dispatch(getStartApplicationAction(data)),
    resetIsApplicationStarted: () => dispatch(resetIsApplicationStartedAction())
  };
};

const mapStateToProps = state => {
  return {
    regions: state.userInfoReducer.regions,
    loader: state.qrScreenReducer.loader,
    isApplicationStarted: state.qrScreenReducer.isApplicationStarted,
    errMessage: state.qrScreenReducer.errMessage

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QRScreen);
