import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {APP_INIT_LINK} from '../../commons/Constants';
import {PRIMARY_COLOR} from '../../theme/Colors';

import Orientation from 'react-native-orientation-locker';
import {useIsFocused} from '@react-navigation/native';
import {ActivityIndicator, Image, View, StyleSheet, Text} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
const welcomeLogo = require('../../assets/images/welcome-logo.png');
const welcomeImg = require('../../assets/images/welcome-image.png');
function UserInfo({
  loader,
}) {
  const isFocused = useIsFocused();

  useEffect(() => {
    Orientation.lockToPortrait();
  }, [isFocused]);

  return (
    <View style={styles.background}>
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
    </View>
  );
}

const mapDispatchToProps = dispatch => {
  return {
  };
};

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);

// Style for "Background"
const styles = StyleSheet.create({
  background: {
    backgroundColor: '#F8F8F8',
    paddingTop: '9%',
    paddingBottom: '10%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  welcomeLogo: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingRight: '3%',
  },
  welcomeTextDiv: {
    paddingTop: '5%',
  },
  welcomeText: {
    fontSize: RFValue(24, 580),
    color: PRIMARY_COLOR,
    fontWeight: '700',
    textAlign: 'center',
  },
  welcomeImage: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  welcomeBottomText: {
    display: 'flex',
    justifyContent: 'center',
  },
  bottomTextBig: {
    fontSize: RFValue(16, 580),
    color: PRIMARY_COLOR,
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: '3%',
    paddingBottom: '3%',
  },
  bottomTextSmall: {
    fontSize: RFValue(12, 580),
    color: PRIMARY_COLOR,
    fontWeight: '400',
    textAlign: 'center',
  },
  buttonDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'baseline',
    paddingTop: '23%',
  },
});
