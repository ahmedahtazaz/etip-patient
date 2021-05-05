import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  useWindowDimensions,
} from 'react-native';
import BottomNavigator from '../../components/BottomNavigator';
import {useIsFocused} from '@react-navigation/core';
import Orientation from 'react-native-orientation-locker';
import {SwipeListView} from 'react-native-swipe-list-view';

const menuIcon = require('../../assets/images/menu-icon.png');
const smallHeaderLogo = require('../../assets/images/small-header-logo.png');
const deleteIcon = require('../../assets/images/delete-icon-red.png');
const greenQrCode = require('../../assets/images/green-qr-code.png');
const greyEdit = require('../../assets/images/edit-gray-icon.png');

import {
  moveToUserinfScreenAction,
  moveToAppointmentDetailsAction,
  moveToMakeAppointsAction,
  moveToSettingsScreenAction,
  getFamilyMembersAction,
  removeFamilyMemberAction,
} from './Actions';
import {get_family_url} from '../../commons/environment';

const FamilyMain = ({
  navigation,
  movetoSettingsScreen,
  moveToAppointmentDetails,
  userInfo,
  familyMembers,
  getFamilyMembers,
  removeFamilyMember,
}) => {
  const window = useWindowDimensions();

  const isFocused = useIsFocused();

  useEffect(() => {
    Orientation.lockToPortrait();
    getFamilyData();
  }, [isFocused]);

  useEffect(() => {
    getFamilyData();
  }, []);

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
                moveToAppointmentDetails(
                  navigation,
                  'personal',
                  `${item.firstName} ${item.lastName}`,
                  item,
                )
              }>
              <Image source={greenQrCode} style={{marginLeft: 5}} />
            </TouchableOpacity>
            {item?.relation ? (
              <TouchableOpacity
                onPress={() => moveToUserinfScreenAction(navigation, item)}
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
            {/* <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        /> */}
            <SwipeListView
              data={familyMembers}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              renderHiddenItem={(data, rowMap) => {
                if (data.item.relation)
                  return (
                    <TouchableOpacity
                      onPress={() => removeMember(data)}
                      style={styles.rowDeleteImage}>
                      <View style={styles.deleteItem}>
                        <Image source={deleteIcon} />
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
    paddingLeft: '3%',
    paddingRight: '3%',
  },
  appoinmentDivBg: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    marginTop: '25%',
  },
  mainMenu: {
    position: 'absolute',
    zIndex: 2000,
    top: '3%',
    left: '3%',
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
    width: '45%',
  },
  menuItemsCenter: {
    justifyContent: 'center',
  },
});
const mapDispatchToProps = dispatch => {
  return {
    movetoSettingsScreen: navigation => moveToSettingsScreenAction(navigation),
    movetoMakeAnAppointmentScreen: navigation =>
      moveToMakeAppointsAction(navigation),
    moveToAppointmentDetails: (navigation, path, title, qrObj) =>
      moveToAppointmentDetailsAction(navigation, path, title, qrObj),
    getFamilyMembers: data => dispatch(getFamilyMembersAction(data)),
    removeFamilyMember: data => dispatch(removeFamilyMemberAction(data)),
  };
};

const mapStateToProps = state => {
  return {
    userInfo: state.userInfoReducer.userInfo,
    familyMembers: state.familyReducer.familyMembers,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FamilyMain);
