import React, { useState } from 'react';
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
import { Dimensions } from 'react-native';
import Calendar from '../../components/Calendar';
import { width, height, totalSize } from 'react-native-dimension';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { ScrollView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { PRIMARY_COLOR, GRAY_COLOR, WHITE_COLOR } from '../../theme/Colors';
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
const GRID_DATA = [
  { key: '09:00-09:15', id: 1 },
  { key: '09:15-09:30', id: 2 },
  { key: '09:15-09:30', id: 3 },
  { key: '09:15-09:30', id: 4 },
  { key: '09:15-09:30', id: 5 },
  { key: '09:15-09:30', id: 6 },
  { key: '09:15-09:30', id: 7 },
  { key: '09:15-09:30', id: 8 },
  { key: '09:15-09:30', id: 9 },
  { key: '09:15-09:30', id: 10 },
  { key: '09:15-09:30', id: 11 },
  { key: '09:15-09:30', id: 12 },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const AppointmentTimeSlot = ({
  navigation,
  route: {
    params: { candidate, testCenter, selectedRegion }
  },
}) => {
  const window = useWindowDimensions();

  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
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
        style={{ marginStart: 8 }}
        onPress={() => setSelectedIdRegion(item.id)}>
        <Image
          style={{
            height: window.height / 5,
            width: window.width / 3,
            marginEnd: 8,
            borderRadius: 10,
          }}
          source={imgsource}
        />
        {item.id == selectedIdRegion ? (
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
              style={{ fontWeight: 'bold' }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerTextView}>
          <Text style={styles.headerText}>Make an Appointment</Text>
        </View>
      </View>

      <View style={styles.appoinmentDivBg}>
        <ScrollView>
          <View>
            <View style={styles.nameContainer}>
              <View style={styles.parentNameContainer}>
                <View style={styles.nameTextContainer}>
                  <Text style={{ marginStart: 8, color: '#606060' }}>
                    Appointment For
                  </Text>
                  <Text
                    style={{
                      color: '#027279',
                      textColor: 'grey',
                      marginStart: 8,
                    }}>
                    Jenny White
                  </Text>
                </View>
                <View>
                  <Icon
                    name="closecircleo"
                    color="red"
                    size={25}
                    style={{ margin: 8 }}
                  />
                </View>
              </View>
            </View>
            <View style={styles.actionCertificateContainer}>
              <Text style={{ marginBottom: 8, marginStart: 8 }}>Region</Text>
              <FlatList
                horizontal
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
              />
            </View>

            <View style={styles.parentNameContainer}>
              <View style={styles.nameTextContainer}>
                <Text style={{ marginStart: 8, color: '#606060' }}>
                  Appointment For
                </Text>
                <Text
                  style={{ color: '#027279', textColor: 'grey', marginStart: 8 }}>
                  Jenny White
                </Text>
              </View>
              <View>
                {/* <Icon
                            name='left'
                            color='green'
                            size={25}
                            style={{ marginEnd: 8 }} /> */}
                <Icon name="right" size={25} color="#016970" />
              </View>
            </View>

            <View style={styles.parentNameContainer}>
              <View style={styles.nameTextContainer}>
                <Text style={{ marginStart: 8, color: '#606060' }}>
                  Appointment Date
                </Text>
                <Text
                  style={{ color: '#027279', textColor: 'grey', marginStart: 8 }}>
                  12 May 2021
                </Text>
              </View>
              <View>
                <Icon name="calendar" size={25} color="#016970" />
              </View>
            </View>

            <View style={styles.calenderContainer}>
              <Text style={{ marginStart: 8 }}>Time Slot</Text>
              {/* <Calendar/> */}

              <FlatList
                data={GRID_DATA}
                renderItem={({ item }) => {
                  if (item.id == selectedId) {
                    return (
                      <TouchableOpacity
                        style={styles.GridViewBlockStyleActive}
                        onPress={() => setSelectedId(null)}>
                        <Text style={styles.GridViewInsideTextItemStyleActive}>
                          {' '}
                          {item.key}{' '}
                        </Text>
                      </TouchableOpacity>
                    );
                  }
                  return (
                    <TouchableOpacity
                      style={styles.GridViewBlockStyle}
                      onPress={() => setSelectedId(item.id)}>
                      <Text style={styles.GridViewInsideTextItemStyle}>
                        {' '}
                        {item.key}{' '}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
                numColumns={3}
              />
            </View>
            <View style={styles.bottom}>
              <TouchableOpacity
                style={[styles.container1, styles.submitButton]}
                onPress={() =>
                  navigation.replace('MainScreen', { booked: true })
                }>
                <Text style={styles.submitText}>Book Appointment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  actionCertificateContainer: {
    marginTop: 16,
    display: 'flex',
    height: height(25),

    flexDirection: 'column',
    paddingLeft: 10,
  },

  calenderContainer: {
    marginTop: 8,
    paddingLeft: 10,
    paddingRight: 10,
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
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 10,
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
    height: height(10),
    justifyContent: 'flex-end',
    marginBottom: 80,
    padding: 16,
    borderRadius: 10,
  },
  container1: {
    backgroundColor: 'rgba(243,115,32,1)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 67,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 5,
  },
  submitButton: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#006970',
    color: WHITE_COLOR,

    fontSize: RFValue(14, 580),
    fontWeight: '600',
    minHeight: 68,
  },
  submitText: {
    color: WHITE_COLOR,
    fontSize: RFValue(14, 580),
    fontWeight: '600',
  },
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  GridViewBlockStyle: {
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    height: 50,
    margin: 5,
    backgroundColor: 'white',
    borderStyle: 'dotted',
  },
  GridViewBlockStyleActive: {
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    height: 50,
    margin: 5,
    backgroundColor: '#006970',
    backgroundColor: '#006970',
    borderStyle: 'solid',
  },
  GridViewInsideTextItemStyleActive: {
    color: '#F4AC1F',
    padding: 10,
    fontSize: 14,
    justifyContent: 'center',
  },
  GridViewInsideTextItemStyle: {
    color: '#027279',
    padding: 10,
    fontSize: 14,
    justifyContent: 'center',
  },
  regionSelectedDiv: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 15,
    height: 15,
  },
});

export default AppointmentTimeSlot;
