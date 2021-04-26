import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {APP_INIT_LINK} from '../../commons/Constants';
import {WHITE_COLOR, PRIMARY_COLOR, GRAY_COLOR} from '../../theme/Colors';

import Orientation from 'react-native-orientation-locker';
import {useIsFocused} from '@react-navigation/native';
import {ActivityIndicator, Image, View, StyleSheet, Text, TextInput} from 'react-native';
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
      <View style={styles.innerDiv}>
      <View style={styles.mainHeading}>
      <Text style={styles.mainHeadingText}>Add Family</Text>
      </View>
      <View style={styles.smallHeading}>
      <Text style={styles.smallHeadingText}>Please Information of Family Member</Text>
      </View>
      <View style={styles.secondaryHeading}>
      <Text style={styles.secondaryHeadingText}>User Information</Text>
      </View>
      <View style={styles.formContainer}>
      <View style={styles.userName}>
      <TextInput
         
          textContentType="firstName"
          underlineColorAndroid ='transparent'
          placeholder="First Name"
          style={styles.inputStyle}
          onChangeText={value => setPhoneValue(value)}></TextInput>
      <TextInput
          
          textContentType="lastName"
          placeholder="Last Name"
          style={styles.inputStyle}
          onChangeText={value => setOTPValue(value)}></TextInput>
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
          <ActivityIndicator size="large" color="grey" animating={loader} />
        </View>
      ) : null}
      </View>
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
    backgroundColor: WHITE_COLOR,
    paddingTop: '9%',
    paddingBottom: '10%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
 
  mainHeadingText : {
    fontSize: RFValue(16, 580),
    color: PRIMARY_COLOR,
    fontWeight: '700',
  },
  smallHeadingText : {
    fontSize: RFValue(12, 580),
    color: GRAY_COLOR,
    fontWeight: '400',
    paddingTop: '2%',
    paddingBottom: '7%',
  },
  secondaryHeadingText : {
    fontSize: RFValue(16, 580),
    color: GRAY_COLOR,
    fontWeight: '500',
    paddingBottom:'3%',
  },
  userName : {
    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    marginBottom:14,
  },
  inputStyle : {
    display:'flex',
    width:'48%',
    backgroundColor:'#F5F9F8',
    borderRadius:6,
    fontSize: RFValue(14, 580),
    color:'#243E3B',
    paddingTop:'4%',
    paddingBottom:'4%',
    paddingLeft:'5%',
    paddingRight:'5%'
  }
});
