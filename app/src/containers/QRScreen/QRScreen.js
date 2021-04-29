import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import QRCodeScanner from 'react-native-qrcode-scanner';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {RFValue} from 'react-native-responsive-fontsize';
const scanQrBg = require('../../assets/images/scan-qr-bg.png');
const {width, height} = Dimensions.get('window');

function QRScreen({navigation}) {
  const [scan, setScan] = useState(true);
  const [certificate_request, setCertificateRequest] = useState('');
  const [proof_request, setProofRequest] = useState('');
  var arr = [];
  var arr2 = [];

  const onSuccess = e => {};

  return (
    <View style={styles.MainContainer}>
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
          <Text style={styles.headerText}>Scan QR Code</Text>
        </View>
      </View>
      <View style={styles.scanner}>
        <ImageBackground source={scanQrBg} style={styles.splashbackground}>
          <QRCodeScanner
            reactivate={true}
            showMarker={true}
            cameraStyle={{width: '90%', marginLeft: '5%'}}
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
                Scan QR code for patient information
              </Text>
            }
            bottomContent={
              <TouchableOpacity
                style={styles.buttonTouchable}
                onPress={() => {
                  navigation.navigate('VerifierUserInfoScreen');
                }}>
                <Text style={styles.buttonText}>Or Add User Info</Text>
              </TouchableOpacity>
            }
          />
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
    width,
  },
  header: {
    flexDirection: 'row',
    height: height * 0.1,
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
    height: height * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    marginTop: '13%',
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
    backgroundColor: '#ffffff',
    width,
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

export default QRScreen;
