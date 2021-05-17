import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import BottomNavigator from '../../components/BottomNavigator';
import {useIsFocused} from '@react-navigation/core';
import Orientation from 'react-native-orientation-locker';
import {SwipeListView} from 'react-native-swipe-list-view';

const menuIcon = require('../../assets/images/menu-icon.png');
const smallHeaderLogo = require('../../assets/images/small-header-logo.png');
const deleteIcon = require('../../assets/images/delete-icon-red.png');
const greenQrCode = require('../../assets/images/green-qr-code.png');
const greyEdit = require('../../assets/images/edit-gray-icon.png');
const plusIcon = require('../../assets/images/plus-icon.png');

import {
  moveToUserinfScreenAction,
  moveToAppointmentDetailsAction,
  moveToMakeAppointsAction,
  moveToSettingsScreenAction,
  getFamilyMembersAction,
  removeFamilyMemberAction,
} from './Actions';
import {get_family_url} from '../../commons/environment';
import {showToast} from '../../commons/Constants';

const FamilyMain = ({
  navigation,
  movetoSettingsScreen,
  moveToAppointmentDetails,
  userInfo,
  familyMembers,
  getFamilyMembers,
  removeFamilyMember,
  errMessage,
  moveToAddFamily,
}) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    Orientation.lockToPortrait();
    getFamilyData();
  }, [isFocused]);

  useEffect(() => {
    getFamilyData();
  }, []);

  useEffect(() => {
    if (errMessage) {
      showToast(errMessage);
    }
  }, [errMessage]);

  const getFamilyData = () => {
    getFamilyMembers({
      url: `${get_family_url}/${userInfo?.data?.data?.family.id}`,
      userId: userInfo?.data?.data?._id,
    });
  };

  const removeMember = ({item}) => {
    let data = {
      url: `${get_family_url}/${userInfo?.data?.data?.family.id}/remove-member/${item._id}`,
      userId: userInfo?.data?.data?._id,
      id: item._id,
    };
    removeFamilyMember(data);
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.nameContainer}>
        <View style={styles.parentNameContainer}>
          <View style={styles.nameTextContainer}>
            <Text style={{color: '#20B2AA', textColor: 'grey', marginStart: 8}}>
              {`${item.firstName} ${item.lastName}`}
            </Text>
            <Text style={{marginStart: 8, color: '#adadad'}}>
              {item.relation}
            </Text>
          </View>
          <View style={styles.qrCodeandEditConatiner}>
            <TouchableOpacity
              style={styles.qrEditContainer}
              onPress={() =>
                moveToAppointmentDetails(navigation, 'personal', item)
              }>
              <Image source={greenQrCode} style={{marginLeft: 5}} />
            </TouchableOpacity>
            {item?.relation ? (
              <TouchableOpacity
                onPress={() =>
                  moveToUserinfScreenAction(
                    navigation,
                    item?.isPrimary ? userInfo?.data?.data : item,
                  )
                }
                style={styles.editContainer}>
                <Image source={greyEdit} style={{marginLeft: 5}} />
              </TouchableOpacity>
            ) : (
              <View style={styles.editContainer} />
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainMenu}>
        <View style={styles.mainMenuItems}>
          <TouchableOpacity
            style={styles.menuItemsLeft}
            onPress={() => {
              movetoSettingsScreen(navigation);
            }}>
            <Image source={menuIcon} style={{marginLeft: 10}} />
          </TouchableOpacity>
          <View style={styles.menuItemsCenter}>
            <Image source={smallHeaderLogo} style={{marginLeft: 5}} />
          </View>
        </View>
      </View>
      <View style={styles.appoinmentDivBg}>
        <View style={styles.mainDivPad}>
          <View style={styles.actionCertificateContainer}>
            <SwipeListView
              data={familyMembers}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              renderHiddenItem={(data, rowMap) => {
                if (!data.item.isPrimary)
                  return (
                    <TouchableOpacity
                      onPress={() => removeMember(data)}
                      style={styles.rowDeleteImage}>
                      <View style={styles.deleteItem}>
                        <Image
                          source={deleteIcon}
                          style={{
                            resizeMethod: 'resize',
                            resizeMode: 'contain',
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  );
              }}
              disableRightSwipe={true}
              leftOpenValue={75}
              rightOpenValue={-75}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.plusIconDiv}
        onPress={() => {
          moveToAddFamily(navigation, userInfo?.data?.data, true);
        }}>
        <Image source={plusIcon} />
      </TouchableOpacity>
      <BottomNavigator
        navigation={navigation}
        selectedItem={{id: 3, label: 'Family'}}></BottomNavigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    flex: 1,
    flexDirection: 'column',
  },
  rowDeleteImage: {
    justifyContent: 'flex-end',
    flex: 1,

    display: 'flex',
    flexDirection: 'row',

    marginTop: '5%',
  },
  editContainer: {
    marginStart: 12,
    marginEnd: 12,
  },
  qrEditContainer: {},

  nameTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  actionCertificateContainer: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
  },
  deleteItem: {
    marginEnd: 12,
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
    paddingTop: 9,
    paddingBottom: 9,
    flex: 1,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qrCodeandEditConatiner: {
    flex: 1,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
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
    paddingTop: 20,
  },
  appoinmentDivBg: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    height: '88%',
    marginTop: '30%',
  },
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
  plusIconDiv: {
    position: 'absolute',
    zIndex: 99999,
    right: 14,
    bottom: '10%',
    width: 81,
    height: 81,
  },
});
const mapDispatchToProps = dispatch => {
  return {
    movetoSettingsScreen: navigation => moveToSettingsScreenAction(navigation),
    movetoMakeAnAppointmentScreen: navigation =>
      moveToMakeAppointsAction(navigation),
    moveToAppointmentDetails: (navigation, path, userInfo) =>
      moveToAppointmentDetailsAction(navigation, path, userInfo),
    getFamilyMembers: data => dispatch(getFamilyMembersAction(data)),
    removeFamilyMember: data => dispatch(removeFamilyMemberAction(data)),
    moveToAddFamily: (navigation, data, addFamily) =>
      moveToUserinfScreenAction(navigation, data, addFamily),
  };
};

const mapStateToProps = state => {
  return {
    userInfo: state.mainScreenReducer.userInfo,
    familyMembers: state.familyReducer.familyMembers,
    errMessage: state.familyReducer.errMessage,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FamilyMain);
