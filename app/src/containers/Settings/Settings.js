import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/core';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {WHITE_COLOR} from '../../theme/Colors';
import I18n from '../../translations/I18n';
import {connect} from 'react-redux';
import {
  moveToAppointmentDetailsAction,
  moveToUserUpdateSettingScreenAction,
} from './Actions';
import Orientation from 'react-native-orientation-locker';
const settingHeaderBg = require('../../assets/images/setting-header-bg.png');
const settingTopIcon = require('../../assets/images/setting-top-icon.png');
const menuArrowWhiteIcon = require('../../assets/images/menu-arrow-white-icon.png');
const DATA = [
  {
    id: 'Modifiy Personal Information',
    title: 'Modifiy Personal Information',
    path: 'UserInfoScreen',
  },
  {
    id: 'Modify Email',
    title: 'Modify Email',
    path: 'UpdateOtherSettingsScreen',
  },
  {
    id: 'Modify Sim',
    title: 'Modify Sim',
    path: 'PhoneScreen',
  },
  {
    id: 'Change Language',
    title: 'Change Language',
    path: 'ChangeLanguage',
  },

  {
    id: 'Need Assistance',
    title: 'Need Assistance',
  },
  {
    id: 'Privacy Policy',
    title: 'Privacy Policy',
    path: 'policy',
  },
  {
    id: 'Terms & Conditions',
    title: 'Terms & Conditions',
    path: 'terms',
  },
  {
    id: 'About App',
    title: 'About App',
    path: 'aboutApp',
  },
];

const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{I18n.t(item.title)}</Text>
  </TouchableOpacity>
);

const Settings = ({
  navigation,
  movetoUpdateScreen,
  moveToAppointmentDetails,
  userInfo,
}) => {
  const [selectedId, setSelectedId] = useState(null);

  const [isUpdated, setIsUpdated] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    Orientation.lockToPortrait();
    if (isFocused) setIsUpdated(true);
  }, [isFocused]);

  useEffect(() => {
    if (isUpdated) setIsUpdated(false);
  }, [isUpdated]);

  const renderItem = ({item}) => {
    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          if (item.path === 'UserInfoScreen') {
            navigation.navigate(item.path, {
              data: userInfo?.data?.data,
              editUser: true,
            });
          } else if (item.path === 'UpdateOtherSettingsScreen') {
            navigation.navigate(item.path);
          } else if (item.path === 'PhoneScreen') {
            navigation.navigate(item.path, {isUpdateMobileNumber: true});
          } else {
            if (item.path)
              movetoUpdateScreen(item.path, navigation, item.title);
          }
        }}
        backgroundColor={'white'}
        textColor={'black'}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={settingHeaderBg} style={styles.settingHeaderBg}>
        <View style={styles.SettingHeaderDiv}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={menuArrowWhiteIcon} style={{marginRight: 10}} />
          </TouchableOpacity>
          <Text style={styles.profileName}>
            {I18n.t(
              `${userInfo?.data?.data?.firstName} ${userInfo?.data?.data?.lastName}`,
            )}
          </Text>
          <TouchableOpacity
            onPress={() =>
              moveToAppointmentDetails(
                navigation,
                'personal',
                userInfo?.data?.data,
                true,
              )
            }>
            <Image source={settingTopIcon} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />

      <TouchableOpacity
        style={[styles.container, styles.submitButton]}
        onPress={() => navigation.goBack()}>
        <Text style={styles.submitText} style={{color: '#F20000'}}>
          {I18n.t('Logout')}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  settingHeaderBg: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    minHeight: 135,
  },
  SettingHeaderDiv: {
    paddingTop: 46,
    paddingBottom: 25,
    paddingLeft: 13,
    paddingRight: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  profileName: {
    fontSize: RFValue(24, 580),
    color: WHITE_COLOR,
    justifyContent: 'flex-start',
    flexGrow: 10,
    paddingLeft: 10,
  },

  item: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#FAFAFA',
    color: '#F20000',
    fontSize: RFValue(14, 580),
    fontWeight: '700',
    paddingTop: 20,
    paddingBottom: 0,
    paddingLeft: 15,
    paddingRight: 15,
    height: '10%',
    height: '8%',
    bottom: 5,
  },
  submitText: {
    fontSize: RFValue(12, 580),
    color: '#F20000',
    fontWeight: '600',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    movetoUpdateScreen: (path, navigation, title) =>
      moveToUserUpdateSettingScreenAction(path, navigation, title),
    moveToAppointmentDetails: (navigation, path, userInfo) =>
      moveToAppointmentDetailsAction(navigation, path, userInfo),
  };
};

const mapStateToProps = state => {
  return {
    userInfo: state.mainScreenReducer.userInfo,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
