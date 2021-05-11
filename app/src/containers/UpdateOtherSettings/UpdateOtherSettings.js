import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Orientation from 'react-native-orientation-locker';
import {useIsFocused} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import {DARK_GREEN_COLOR, WHITE_COLOR} from '../../theme/Colors';
import I18n from '../../translations/I18n';
import {update_user_email_url} from '../../commons/environment';
import {updateEmailAction} from '../MainScreen/Actions';
import {emailRegex, showToast} from '../../commons/Constants';
import {ActivityIndicator} from 'react-native-paper';
import {resetEmailUpdatedAction} from './Action';
const {width, height} = Dimensions.get('window');

function UpdateOtherSettings({
  loader,
  navigation,
  updateEmail,
  userInfo,
  errMessage,
  emailUpdated,
  resetEmailUpdated,
}) {
  const [email, setEmail] = useState(userInfo?.data?.data?.email || '');
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
    if (emailUpdated) {
      resetEmailUpdated();
      showToast('Email has been updated successfully');
    }
  }, [emailUpdated]);

  const updateUserEmail = () => {
    if (!email || !email.match(emailRegex)) {
      showToast('Please Enter a valid email');
      return;
    }
    let data = {
      url: update_user_email_url,
      body: {
        email,
        userId: userInfo?.data?.data?._id,
      },
    };
    updateEmail(data);
  };

  return (
    <View style={styles.container}>
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
          <Text style={styles.headerText}>{I18n.t('Update Email')}</Text>
        </View>
      </View>
      <View style={styles.appoinmentDivBg}>
      <View style={styles.fields}>
        <View style={styles.infoSec}>
          <View style={styles.inputMain}>
            <TextInput
              value={email}
              onChangeText={e => setEmail(e)}
              textContentType="email"
              underlineColorAndroid="transparent"
              placeholder="Email"
              style={styles.inputStyle1}></TextInput>
          </View>
        </View>
        <View style={styles.updateBtnMain}>
          <TouchableOpacity
            onPress={updateUserEmail}
            style={[styles.btnStyle, styles.submitButton]}>
            <Text style={styles.submitText}>{I18n.t('Update')}</Text>
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
            top: '40%',
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
    updateEmail: data => dispatch(updateEmailAction(data)),
    resetEmailUpdated: () => dispatch(resetEmailUpdatedAction()),
  };
};

const mapStateToProps = state => {
  return {
    userInfo: state.mainScreenReducer.userInfo,
    errMessage: state.updateEmailReducer.errMessage,
    loader: state.updateEmailReducer.loader,
    emailUpdated: state.updateEmailReducer.emailUpdated,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateOtherSettings);

// Style for "Background"
const styles = StyleSheet.create({
  
  inputMain: {
    paddingHorizontal: 20,
  },
  infoSec: {
    height: '50%',
    justifyContent: 'center',
  },
  updateBtnMain: {
    height: '50%',
    justifyContent: 'flex-end',
    paddingBottom: 20,
    alignItems: 'center',
  },
  switchView: {
    width: width * 0.2,
  },
  switchText: {
    color: '#243E3B',
    fontSize: RFValue(12, 580),
  },
  switchTextView: {
    width: width * 0.7,
  },
  switchMain: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  container: {
    height,
    backgroundColor: '#f8fbfa',
  },
  appoinmentDivBg: {
    borderRadius: 20,
    backgroundColor: 'white',
    height: '90%',
    marginTop: '8%',
  },
  header: {
    flexDirection: 'row',
    height: height * 0.1,
    paddingTop: '7%',
    alignItems: 'center',
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
  fields: {
    height: height * 0.8,
  },
  
  btnStyle: {
    backgroundColor: '#212826',
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
    elevation: 2,
    height: 50,
    paddingHorizontal: 5,
    width: width * 0.9,
    borderRadius: 5,
    marginBottom: 10,
    height: 60,
    backgroundColor: DARK_GREEN_COLOR,
  },
  submitButtonDark: {
    height: height * 0.1,
    borderRadius: 3,
    backgroundColor: '#000',
    color: WHITE_COLOR,
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: RFValue(14, 580),
  },
  submitText: {
    color: WHITE_COLOR,
    fontSize: RFValue(14, 580),
  },
  inputStyle1: {
    display: 'flex',

    backgroundColor: '#F5F9F8',
    borderRadius: 6,
    fontSize: RFValue(14, 580),
    color: '#243E3B',
    paddingTop: '4%',
    paddingBottom: '4%',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginBottom: 14,
  },
});
