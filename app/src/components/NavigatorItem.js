import React, { useRef } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ImageBackground,
  View,
} from 'react-native';
import I18n from '../translations/I18n';

import { RFValue } from 'react-native-responsive-fontsize';
import { IS_VERIFIER_APP } from '../commons/Constants';
const selectedBottomNav = require('../assets/images/selected-bottom-nav.png');

function NavigatorItem({ item, isSelected, navigation }) {
  const isSelectedRef = useRef(isSelected);
  isSelectedRef.current = isSelected;

  const itemRef = useRef(item);
  itemRef.current = item;

  const getTitleColor = isSelected => {
    if (isSelected) return '#F37320';
    else return 'white';
  };

  const getImage = (item, isSelected) => {
    if (IS_VERIFIER_APP) {
      return getVerifierImage(item, isSelected);
    }
    return getPatientImage(item, isSelected)
  };


  //verifier images goes here
  const getVerifierImage = (item, isSelected) => {
    switch (item.id) {
      case 1:
        if (isSelected) return require('../assets/images/home-icon.png');
        else return require('../assets/images/home-icon.png');
      case 2:
        if (isSelected)
          return require('../assets/images/test-conducted-icon.png');
        else return require('../assets/images/test-conducted-icon.png');
      case 3:
        if (isSelected) return require('../assets/images/settings-icon.png');
        else return require('../assets/images/settings-icon.png');
      default:
        if (isSelected) return require('../assets/images/home-icon.png');
        else return require('../assets/images/home-icon.png');
    }
  }

  const getPatientImage = (item, isSelected) => {
    switch (item.id) {
      case 1:
        if (isSelected) return require('../assets/images/home-icon.png');
        else return require('../assets/images/home-icon.png');
      case 2:
        if (isSelected)
          return require('../assets/images/appointments-icon.png');
        else return require('../assets/images/appointments-icon.png');
      case 3:
        if (isSelected) return require('../assets/images/family-icon.png');
        else return require('../assets/images/family-icon.png');
      case 4:
        if (isSelected)
          return require('../assets/images/certificates-icon.png');
        else return require('../assets/images/certificates-icon.png');
      default:
        if (isSelected) return require('../assets/images/home-icon.png');
        else return require('../assets/images/home-icon.png');
    }
  }


  const navigateToHome = item => {
    if (IS_VERIFIER_APP) {
      verifierNavigator(item);
    } else {
      patientNavigator(item);
    }
  };

  const patientNavigator = (item) => {
    switch (item.id) {
      case 1:
        navigation.replace('MainScreen');
        break;
      case 2:
        navigation.replace('appointmentMainScreen');
        break;
      case 3:
        navigation.replace('familyMain');
        break;
      case 4:
        navigation.replace('certificateMain');
        break;
      default:
        navigation.replace('MainScreen');
        break;
    }
  }

  const verifierNavigator = (item) => {
    switch (item.id) {
      case 1:
        navigation.replace('TestCenterInfo');
        break;
      case 2:
        navigation.replace('TestConductedScreen');
        break;
      case 3:
        navigation.replace('Settings');
        break;
      default:
        navigation.replace('TestCenterInfo');
        break;
    }
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigateToHome(item);
      }}>
      {isSelected ? (
        <ImageBackground source={selectedBottomNav} style={styles.slectedNavBg}>
          <View>
            <Text
              style={{
                width: '100%',
                fontSize: RFValue(10, 580),
                color: '#036167',
                textAlign: 'center',
                paddingTop: 10,
              }}
              numberOfLines={1}>
              {I18n.t(item.label)}
            </Text>
          </View>
        </ImageBackground>
      ) : (
        <Image
          style={{
            width: '100%',
            height: '30%',
          }}
          resizeMethod="resize"
          resizeMode="contain"
          source={getImage(item, isSelected)}></Image>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 97,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

    
  },
  slectedNavBg: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',

    alignItems: 'center',
    width: '100%',
    paddingBottom: 15,
  },
});

export default NavigatorItem;
