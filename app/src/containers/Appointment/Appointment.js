import React, {useState, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  useWindowDimensions,
  ImageBackground,
} from 'react-native';
import I18n from '../../translations/I18n';

import {Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {moveToAppointmentCalenderAction} from './Actions';
import {RFValue} from 'react-native-responsive-fontsize';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {PRIMARY_COLOR, GRAY_COLOR, WHITE_COLOR} from '../../theme/Colors';
import {getFamilyMembersAction} from '../FamilyMain/Actions';
import {get_family_url} from '../../commons/environment';
const menuArrowIcon = require('../../assets/images/menu-arrow-icon.png');
const appointmentBg1 = require('../../assets/images/appointment-bg1.png');
const {width, height} = Dimensions.get('window');

const Appointment = ({
  movetoAppointmentCalenderScreen,
  navigation,
  userInfo,
  familyMembers,
  getFamilyMembers,
}) => {
  const window = useWindowDimensions();

  const [selectedId, setSelectedId] = useState(null);
  const [family, setFamily] = useState([userInfo?.data?.data]);

  useEffect(() => {
    if (!familyMembers || familyMembers.length == 0) {
      if (userInfo) {
        getFamilyMembers({
          url: `${get_family_url}/${userInfo.data?.data?.family?.id}`,
          userId: userInfo.data?.data?._id,
        });
      }
    }
  }, [getFamilyMembers]);

  useEffect(() => {
    if (familyMembers && familyMembers.length > 0) {
      setFamily(familyMembers?.data?.data?.familyUsers);
    }
  }, [familyMembers]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.appointmentlistContainer}
        onPress={() =>
          movetoAppointmentCalenderScreen(navigation, item, userInfo.data?.data)
        }>
        <Text style={{fontWeight: 'bold', marginStart: 8, color: '#20B2AA'}}>
          {`${item.firstName} ${item.lastName}`}
        </Text>
        <Text style={{color: '#d3d3d3', marginStart: 8, fontSize: 16}}>
          {I18n.t(item.labe)}
        </Text>
      </TouchableOpacity>
    );
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
          <Text style={styles.headerText}>{I18n.t('Make an Appointment')}</Text>
        </View>
      </View>
      <View style={styles.appoinmentDivBg}>
        <View style={styles.nameContainer}>
          <View style={styles.nameTextContainer}>
            <Text style={styles.inputLabelDiv}>
              <Text style={styles.inputLabel}>
                {I18n.t('Make an Appointment for')}
              </Text>
              {'\n'}
              {'\n'}
              <Text style={styles.inputLabelSmall}>
                {I18n.t('Please select the family member.')}
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.actionCertificateContainer}>
          <FlatList
            data={familyMembers}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
          />
        </View>
      </View>
    </View>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    movetoAppointmentCalenderScreen: (navigation, candidate, userInfo) =>
      moveToAppointmentCalenderAction(navigation, candidate, userInfo),
    getFamilyMembers: payload => dispatch(getFamilyMembersAction(payload)),
  };
};

const mapStateToProps = state => {
  return {
    userInfo: state.mainScreenReducer.userInfo,
    familyMembers: state.familyReducer.familyMembers,
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8fbfa',
    flex: 1,
  },
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
  appoinmentDivBg: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    height: '88%',
    marginTop: '8%',
  },
  splashbackground: {
    flex: 1,
  },
  nameTextContainer: {
    marginTop: 30,
    marginVertical: 8,
    marginHorizontal: 16,

    display: 'flex',
    flexDirection: 'column',
  },
  appointmentlistContainer: {
    marginVertical: 8,
    marginHorizontal: 16,
    display: 'flex',
    borderRadius: 4,
    flexDirection: 'column',
    backgroundColor: '#F9F9F9',
    padding: 10,
  },
  actionCertificateContainer: {
    marginTop: 32,
    display: 'flex',
    flexDirection: 'column',
    paddingBottom:150
  },
  nameContainer: {
    alignSelf: 'stretch',
    marginTop: 0,
    backgroundColor: 'white',
    textAlign: 'center',
  },
  parentNameContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  inputLabelDiv: {
    display: 'flex',

    flexDirection: 'column',
    alignItems: 'center',
    paddingRight: '10%',
  },
  inputLabel: {
    fontSize: RFValue(20, 580),
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
  },
  inputLabelSmall: {
    fontSize: RFValue(12, 580),
    color: GRAY_COLOR,
    lineHeight: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Appointment);
