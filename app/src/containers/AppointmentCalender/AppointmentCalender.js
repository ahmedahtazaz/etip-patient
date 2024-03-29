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
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import {PRIMARY_COLOR, GRAY_COLOR, WHITE_COLOR} from '../../theme/Colors';
const menuArrowIcon = require('../../assets/images/menu-arrow-icon.png');
const regionSelectedIcon = require('../../assets/images/region-selected-icon.png');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const DATA = [
  {
    id: 1,
    title: 'Bavaria',
  },
  {
    id: 2,
    title: 'Munich',
  },
  {
    id: 3,
    title: 'Augsburg',
  },
  {
    id: 4,
    title: 'Frankfurt',
  },
  {
    id: 5,
    title: 'Hamburg',
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
    let imgsource = require('../../assets/images/bavaria.png');
    switch (item.id) {
      case 1:
        imgsource = require('../../assets/images/bavaria.png');
        break;
      case 2:
        imgsource = require('../../assets/images/munich.png');
        break;
      case 3:
        imgsource = require('../../assets/images/augsburg.png');
        break;
      case 4:
        imgsource = require('../../assets/images/frankfurt.png');
        break;
      case 5:
        imgsource = require('../../assets/images/hamburg.png');
        break;
      default:
        imgsource = require('../../assets/images/bavaria.png');
        break;
    }
    return (
      <TouchableOpacity
        style={{marginStart: 8}}
        style={styles.imgShadow}
        onPress={() => setSelectedId(item.id)}>
        <Image
          style={{
            height: window.height / 5,
            width: window.width / 3,
            marginEnd: 8,
            borderRadius: 10,
          }}
          source={imgsource}
        />
        {item.id == selectedId ? (
          <View style={styles.regionSelectedDiv}>
            <Image source={regionSelectedIcon} />
          </View>
        ) : null}
        <View
          style={{
            position: 'absolute',
            left: 0,
            bottom: 8,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 8,
            marginStart: 8,
          }}>
          <Text style={styles.regionImgText}>{item.title}</Text>
        </View>
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
          <Text style={styles.headerText}>Make an Appointment</Text>
        </View>
      </View>
      <View style={styles.appoinmentDivBg}>
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
            <Text style={styles.regionText}>Region</Text>
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
              <Text
                style={{color: '#20B2AA', textColor: 'grey', marginStart: 8}}>
                Test Center
              </Text>
            </View>
            <View>
              <Icon name="right" size={25} color="#adadad" />
            </View>
          </TouchableOpacity>

          <View style={styles.calenderContainer}>
            <Text style={styles.regionText1}>Appointment Date</Text>
            <Calendar onDateChange={onDateChange} />
          </View>
        </ScrollView>
      </View>
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
    backgroundColor: '#f8fbfa',
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    height: windowHeight * 0.1,
    alignItems: 'center',
    paddingTop: '7%',
  },
  backIcon: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerTextView: {
    flex: 9,
    alignItems: 'center',
    paddingRight: windowWidth * 0.1,
  },
  headerText: {
    fontSize: RFValue(16, 580),
  },
  regionText: {
    color: '#322929',
    fontSize: RFValue(12, 580),
    fontWeight: '500',
    marginBottom: 8,
  },
  regionText1: {
    color: '#322929',
    fontSize: RFValue(12, 580),
    fontWeight: '500',
    marginStart: 8,
    marginBottom: 8,
  },
  appoinmentDivBg: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    marginTop: '5%',
  },
  imgShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 5,
  },
  regionImgText: {
    color: WHITE_COLOR,
    fontSize: RFValue(12, 580),
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
    marginBottom:150,
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
    height: height(8),
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },

  bottom: {
    height: height(20),
    justifyContent: 'flex-end',
    marginBottom: 16,
    borderRadius: 10,
  },
  regionSelectedDiv: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 15,
    height: 15,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppointmentCalender);
