import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Orientation from 'react-native-orientation-locker';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { DARK_GREEN_COLOR, WHITE_COLOR } from '../../theme/Colors';
import I18n from '../../translations/I18n';
import { update_user_email_url } from "../../commons/environment"
import { updateEmailAction } from '../MainScreen/Actions';
import { emailRegex, showToast } from '../../commons/Constants';
const { width, height } = Dimensions.get('window');

function UpdateOtherSettings({
  route: {
    params: { title },
  },
  navigation,
  updateEmail,
  userInfo,
  errMessage
}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [email, setEmail] = useState(userInfo?.data?.data?.email || "");
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const isFocused = useIsFocused();

  useEffect(() => {
    Orientation.lockToPortrait();
  }, [isFocused]);

  const updateUserEmail = () => {
    if (!email || !email.match(emailRegex)) {
      showToast('Please Enter a valid email');
      return;
    }
    let data = {
      url: update_user_email_url,
      body: {
        email,
        userId: userInfo?.data?.data?._id
      }
    }
    updateEmail(data)
  }


  useEffect(() => {
    if (errMessage) {
      showToast(errMessage);
    }
  }, [errMessage]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.backIcon}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <EvilIcons name="chevron-left" color="#000" size={30} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.headerText}>{I18n.t('Update')} {title}</Text>
        </View>
      </View>
      <View style={styles.fields}>
        <View style={styles.infoSec}>
          <View style={styles.inputMain}>
            <TextInput
              value={email}
              onChangeText={(e) => setEmail(e)}
              textContentType="email"
              underlineColorAndroid="transparent"
              placeholder="Email"
              style={styles.inputStyle1}></TextInput>
          </View>
          <View style={styles.switchMain}>
            <View style={styles.switchTextView}>
              <Text style={styles.switchText}>
                {I18n.t('Associate my information as a family number with another number')}
              </Text>
            </View>
            <View style={styles.switchView}>
              <Switch
                trackColor={{ false: '#767577', true: '#767577' }}
                thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
        </View>
        <View style={styles.updateBtnMain}>
          <TouchableOpacity onPress={updateUserEmail} style={[styles.btnStyle, styles.submitButton]}>
            <Text style={styles.submitText}>{I18n.t('Update')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


const mapDispatchToProps = dispatch => {
  return {
    updateEmail: (data) => dispatch(updateEmailAction(data))
  };
};

const mapStateToProps = state => {
  console.log("userInfo from updateOtherSettings::: ", state.mainScreenReducer.userInfo?.data?.data);
  return {
    userInfo: state.mainScreenReducer.userInfo,
    errMessage: state.mainScreenReducer.errMessage,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateOtherSettings);


// Style for "Background"
const styles = StyleSheet.create({
  backIcon: {
    marginHorizontal: 5,
  },
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
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    height: height * 0.2,
    alignItems: 'center',
    paddingTop: '10%',
  },
  fields: {
    height: height * 0.8,
  },
  headerText: {
    fontSize: RFValue(16, 580),
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
