import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {RFValue} from 'react-native-responsive-fontsize';
import HTML from 'react-native-render-html';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Dimensions} from 'react-native';
import I18n from '../../translations/I18n';
import {get_terms_url} from '../../commons/environment';
const {width, height} = Dimensions.get('window');
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import {getterms} from './Actions';
import {useIsFocused} from '@react-navigation/core';
import {showToast} from '../../commons/Constants';

const Terms = ({getterms, navigation, errMessage, terms}) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) getterms(get_terms_url);
  }, [isFocused]);

  useEffect(() => {
    if (errMessage) showToast(errMessage);
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
          <Text style={styles.headerText}>{I18n.t('Terms & Conditions')}</Text>
        </View>
      </View>
      <View style={styles.appoinmentDivBg}>
        <HTML
          html={terms?.data?.data?.terms}
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
    height: '11%',
    paddingTop: 30,
    alignItems: 'center',
    width,
  },
  container: {
    height,
    backgroundColor: 'white',
  },
  rowDeleteImage: {
    justifyContent: 'flex-end',
    flex: 1,

    display: 'flex',
    flexDirection: 'row',
  },
  backIcon: {
    marginHorizontal: 5,
    width: width * 0.1,
  },
  editContainer: {
    marginStart: 8,
    marginBottom: 30,
    marginTop: -8,
    marginEnd: 8,
  },
  headerText: {
    fontSize: RFValue(16, 580),
    width: width * 0.8,
    textAlign: 'center',
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
  appoinmentDivBg: {},
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
    getterms: data => dispatch(getterms(data)),
  };
};

const mapStateToProps = state => {
  return {
    terms: state.getTermsReducer.terms,
    errMessage: state.getTermsReducer.errMessage,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Terms);
