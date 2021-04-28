import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import {
  Button,
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
import {Dimensions} from 'react-native';
import Calendar from '../../components/Calendar';
import {width, height, totalSize} from 'react-native-dimension';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {moveToTestCentersAction, moveToTimeSlotsAction} from './Actions';
const menuArrowIcon = require('../../assets/images/menu-arrow-icon.png');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const DATA = [
  {
    id: 'Modifiy Personal Information',
    title: 'Modifiy Personal Information',
  },
  {
    id: 'Modify Email',
    title: 'Modify Email',
  },
  {
    id: 'Modify Sim',
    title: 'Modify Sim',
  },
  {
    id: 'About App',
    title: 'About App',
  },
  {
    id: 'Need Assistance',
    title: 'Need Assistance',
  },
  {
    id: 'Privacy Policy',
    title: 'Privacy Policy',
  },
  {
    id: 'Terms & Conditions',
    title: 'Terms & Conditions',
  },
];

const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const AppointmentCalender = ({
  navigation,
  moveToTestCenters,
  moveToTimeSlots,
}) => {
  const window = useWindowDimensions();

  const [selectedId, setSelectedId] = useState(null);

  const onDateChange = () => moveToTimeSlots(navigation);

  const renderItem = ({item}) => {
    return (
      <View style={{marginStart: 8}}>
        <Image
          style={{
            height: window.height / 5,
            width: window.width / 3,
            marginEnd: 8,
            borderRadius: 10,
          }}
          source={{uri: 'https://picsum.photos/200/300'}}
        />
        <View
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 8,
            marginStart: 8,
          }}>
          <Text>Centered text</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainMenu}>
        <TouchableOpacity
          style={styles.mainMenuItems}
          onPress={() => navigation.goBack()}>
          <Image source={menuArrowIcon} style={{marginLeft: 10, marginTop:5}} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.nameContainer}>
          <View style={styles.parentNameContainer}>
            <View style={styles.nameTextContainer}>
              <Text style={{marginStart: 8, color: '#adadad'}}>
                Appointment For
              </Text>
              <Text
                style={{color: '#20B2AA', textColor: 'grey', marginStart: 8}}>
                Jenny White
              </Text>
            </View>
            <View>
              <Icon name="cancel" color="red" size={25} style={{margin: 8}} />
            </View>
          </View>
        </View>
        <View style={styles.actionCertificateContainer}>
          <Text style={{marginBottom: 8, marginStart: 8}}>Region</Text>
          <FlatList
            horizontal
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
          />
        </View>

        <TouchableOpacity
          style={styles.parentNameContainer}
          onPress={() => moveToTestCenters(navigation)}>
          <View style={styles.nameTextContainer}>
            <Text style={{color: '#20B2AA', textColor: 'grey', marginStart: 8}}>
              Test Center
            </Text>
          </View>
          <View>
            <Icon
              name="right"
              size={25}
              color="#adadad"
              style={{marginTop: 16}}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.calenderContainer}>
          <Text style={{marginBottom: 8, marginStart: 8}}>Region</Text>
          <Calendar onDateChange={onDateChange} />
        </View>
      </ScrollView>
    </View>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    moveToTestCenters: navigation => moveToTestCentersAction(navigation),
    moveToTimeSlots: navigation => moveToTimeSlotsAction(navigation),
  };
};

const mapStateToProps = state => {
  return {};
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
  },
  mainMenuItems: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 25,
  },
  nameTextContainer: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  actionCertificateContainer: {
    margin: 16,
    display: 'flex',
    height: height(25),

    flexDirection: 'column',
  },

  calenderContainer: {
    margin: 8,
    height: height(40),
    display: 'flex',
    flexDirection: 'column',
  },
  nameContainer: {
    alignSelf: 'stretch',
    marginTop: 16,
    backgroundColor: 'white',
    textAlign: 'center',
  },
  parentNameContainer: {
    margin: 16,
    backgroundColor: '#ededed',
    height: height(10),

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  bottom: {
    height: height(20),
    justifyContent: 'flex-end',
    marginBottom: 16,
    borderRadius: 10,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppointmentCalender);
