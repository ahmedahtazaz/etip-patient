import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {RFValue} from 'react-native-responsive-fontsize';
import HTML from 'react-native-render-html';
import I18n from '../../translations/I18n';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Dimensions} from 'react-native';
import {get_policy_url} from '../../commons/environment';
const {width, height} = Dimensions.get('window');
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import {useIsFocused} from '@react-navigation/core';
import {showToast} from '../../commons/Constants';

import {getpolicyAction} from './Actions';

const Policy = ({getpolicy, navigation, policy, errMessage}) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) getpolicy(get_policy_url);
  }, [isFocused]);

  useEffect(() => {
    if (errMessage) showToast(errMessage);
  }, [errMessage]);

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
          <Text style={styles.headerText}>{I18n.t('Privacy Policy')}</Text>
        </View>
      </View>
      <View style={styles.appoinmentDivBg}>
        <HTML
          html={policy?.data?.data?.privacyPolicy}
          tagsStyles={tagsStyles}
          classesStyles={classesStyles}
          imagesMaxWidth={Dimensions.get('window').width * 0.9}
          staticContentMaxWidth={Dimensions.get('window').width * 0.9}
        />
      </View>
    </View>
  );
};

const tagsStyles = {
  h1: {
    color: '#6728C7',
    textAlign: 'center',
    marginBottom: 10,
  },
  img: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
  },
};

const classesStyles = {
  author: {
    color: '#CA43AC',
  },
};
const styles = StyleSheet.create({
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
  container: {
    height,
    backgroundColor: '#f8fbfa',
  },
  rowDeleteImage: {
    justifyContent: 'flex-end',
    flex: 1,

    display: 'flex',
    flexDirection: 'row',
  },
 
  editContainer: {
    marginStart: 8,
    marginBottom: 30,
    marginTop: -8,
    marginEnd: 8,
  },

  qrEditContainer: {
    marginTop: -10,
  },

  nameTextContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  actionCertificateContainer: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
  },
  deleteItem: {
    marginEnd: 8,
    marginTop: 22,
  },
  calenderContainer: {
    marginTop: 8,
    flex: 3,
    display: 'flex',
    flexDirection: 'column',
  },
  nameContainer: {
    flex: 1,
    alignSelf: 'stretch',
    marginTop: 16,
    backgroundColor: '#F9F9F9',
    textAlign: 'center',
    borderRadius: 4,
  },
  parentNameContainer: {
    marginTop: 16,
    flex: 1,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qrCodeandEditConatiner: {
    marginTop: 16,
    flex: 1,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  bluebox: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
  blackbox: {
    width: 100,
    height: 100,
    backgroundColor: 'black',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 16,
    borderRadius: 10,
  },
  mainDivPad: {
    paddingLeft: '4%',
    paddingRight: '4%',
  },
  appoinmentDivBg: {borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    height: '82%',
    marginTop: '8%',
    padding:30},
  mainMenu: {
    position: 'absolute',
    zIndex: 2000,
    top: '3%',
    left: '3%',
    height: '10%',
    width: '100%',
  },
  mainMenuItems: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 15,
  },
  menuItemsLeft: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    width: '43%',
  },
  menuItemsCenter: {
    justifyContent: 'center',
  },
});
const mapDispatchToProps = dispatch => {
  return {
    getpolicy: data => dispatch(getpolicyAction(data)),
  };
};

const mapStateToProps = state => {
  return {
    policy: state.getPolicyReducer.policy,
    errMessage: state.getPolicyReducer.errMessage,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Policy);
