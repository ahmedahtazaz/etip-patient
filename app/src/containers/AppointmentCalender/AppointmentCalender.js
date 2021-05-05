import React, { useState, useEffect } from 'react';
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
import I18n from '../../translations/I18n';
import Calendar from '../../components/Calendar';
import { width, height, totalSize } from 'react-native-dimension';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import {
  moveToTestCentersAction,
  moveToTimeSlotsAction,
  GetRegions,
  moveToTimeTestCenter,
  getAppointmentSlotsAction,
  bookAppointmentAction,
} from './Actions';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { PRIMARY_COLOR, GRAY_COLOR, WHITE_COLOR } from '../../theme/Colors';
import { create_appointment_url, get_appointment_slot_url, get_regions } from '../../commons/environment';
import moment from 'moment';
import { showToast } from '../../commons/Constants';
const menuArrowIcon = require('../../assets/images/menu-arrow-icon.png');
const regionSelectedIcon = require('../../assets/images/region-selected-icon.png');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const AppointmentCalender = ({
  navigation,

  moveToTestCentersAction,
  moveToTimeSlots,
  GetRegions,
  regionData,
  moveToTimeTestCenter,
  route: {
    params: { candidate },
  },
  getAppointmentSlots,
  appointmentSlotsData,
  bookAppointment,
  userInfo,
  errMessage
}) => {
  const window = useWindowDimensions();

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [testCenter, setTestCenter] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showCalender, setShowCalender] = useState(true);
  const [showSlots, setShowSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('');

  const onDateChange = date => {
    setDate(date);
    setShowCalender(false);
    setShowSlots(true);
  };

  const toggleCalendarView = () => {
    setShowCalender(true);
    setShowSlots(false);
  };

  useEffect(() => {
    GetRegions(get_regions);
  }, []);

  useEffect(() => {
    if (errMessage) {
      showToast(errMessage);
    }
  }, [errMessage])

  const setTestCenterValue = testCenter => {
    setTestCenter(testCenter);
    let data = {
      url: `${get_appointment_slot_url}/${testCenter.testCenter._id}`,
      body: {
        date: moment(date).format('DD/MM/YYYY'),
        timeZoneOffset: new Date().getTimezoneOffset(),
      },
    };
    getAppointmentSlots(data);
  };

  const navigateToTestCenter = () => {
    if (selectedRegion) {
      moveToTimeTestCenter(
        navigation,
        selectedRegion.name,
        setTestCenterValue,
      )
    } else {
      showToast("Please select a region")
    }
  }

  const bookAppointmentHandler = () => {
    // navigation.replace('MainScreen', { booked: true })
    console.log("candidate:::: ", candidate);
    console.log("testCenter::: ", testCenter);
    console.log("region::: ", selectedRegion);
    console.log("slot::: ", selectedSlot);
    let data = {
      url: `${create_appointment_url}`,
      userId: userInfo.data?.data?._id,
      body: {
        name: candidate.firstName,
        familyId: userInfo.data?.data?.family.id,
        relation: candidate.relation || "Self",
        patientId: "P-1234",//need to ask about it
        email: candidate.email,
        mobile: candidate.mobileNumber,
        region: selectedRegion.name,
        appointmentDate: moment(date).format('DD/MM/YYYY'),
        appointmentTime: selectedSlot,
        testCenter: {
          _id: testCenter?.testCenter?._id,
          testId: testCenter.id,
          testType: testCenter.testType,
          name: testCenter?.testCenter?.name,
          lab: testCenter?.testCenter?.lab
        }
      }
    }

    bookAppointment(data);
  }

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
        style={styles.imgShadow}
        onPress={() => setSelectedRegion(item)}
      // onPress={() => moveToTimeTestCenter(navigation, item.name)}
      >
        <Image
          style={{
            height: window.height / 5,
            width: window.width / 3,
            marginEnd: 8,
            borderRadius: 10,
          }}
          source={imgsource}
        />
        {item._id === selectedRegion?._id ? (
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
          <Text style={styles.regionImgText}>{item.name}</Text>
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
          <Text style={styles.headerText}>{I18n.t('Make an Appointment')}</Text>
        </View>
      </View>
      <View style={styles.appoinmentDivBg}>
        <ScrollView>
          <View style={styles.nameContainer}>
            <View style={styles.parentNameContainer}>
              <View style={styles.nameTextContainer}>
                <Text style={{ marginStart: 8, color: '#adadad' }}>
                  {I18n.t('Appointment For')}
                </Text>
                <Text
                  style={{ color: '#20B2AA', textColor: 'grey', marginStart: 8 }}>
                  {`${candidate.firstName} ${candidate.lastName}`}
                </Text>
              </View>
              <View>
                <Icon name="cancel" color="red" size={25} style={{ margin: 8 }} />
              </View>
            </View>
          </View>
          <View style={styles.actionCertificateContainer}>
            <Text style={styles.regionText}>{I18n.t('Region')}</Text>
            <FlatList
              horizontal
              data={regionData}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>

          <TouchableOpacity
            style={styles.parentNameContainer}
            onPress={() => navigateToTestCenter()}>
            <View style={styles.nameTextContainer}>
              <Text
                style={{ color: '#20B2AA', textColor: 'grey', marginStart: 8 }}>
                {I18n.t('Test Center')}
              </Text>
            </View>
            <View>
              <Icon name="right" size={25} color="#adadad" />
            </View>
          </TouchableOpacity>
          {!showCalender && date ? (
            <TouchableOpacity
              onPress={toggleCalendarView}
              style={styles.parentNameContainer}>
              <View style={styles.nameTextContainer}>
                <Text style={{ marginStart: 8, color: '#606060' }}>
                  Appointment Date
                </Text>
                <Text
                  style={{ color: '#027279', textColor: 'grey', marginStart: 8 }}>
                  {moment(date).format('DD MMM YYYY')}
                </Text>
              </View>
              <View>
                <Icon name="calendar" size={25} color="#016970" />
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.calenderContainer}>
              <Text style={styles.regionText1}>
                {I18n.t('Appointment Date')}
              </Text>
              <Calendar onDateChange={onDateChange} />
            </View>
          )}
          {showSlots ? (
            <View style={styles.calenderContainer}>
              <Text style={{ marginStart: 8 }}>Time Slot</Text>
              {/* <Calendar/> */}

              <FlatList
                data={appointmentSlotsData?.slots}
                renderItem={({ item }) => {
                  if (item.timeSlot === selectedSlot) {
                    return (
                      <TouchableOpacity
                        style={styles.GridViewBlockStyleActive}
                        onPress={() => setSelectedSlot(null)}>
                        <Text style={styles.GridViewInsideTextItemStyleActive}>
                          {' '}
                          {item.timeSlot}{' '}
                        </Text>
                      </TouchableOpacity>
                    );
                  }
                  return (
                    <TouchableOpacity
                      disabled={item.isBooked}
                      style={styles.GridViewBlockStyle}
                      onPress={() => setSelectedSlot(item.timeSlot)}>
                      <Text style={styles.GridViewInsideTextItemStyle}>
                        {' '}
                        {item.timeSlot}{' '}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
                numColumns={3}
              />
            </View>
          ) : (
            <View />
          )}
          <View style={styles.bottom}>
            <TouchableOpacity
              style={[styles.container1, styles.submitButton]}
              onPress={bookAppointmentHandler}>
              <Text style={styles.submitText}>Book Appointment</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    moveToTimeTestCenter: navigation => moveToTimeTestCenter(navigation),
    moveToTimeTestCenter: (navigation, region, setTestCenterValue) =>
      moveToTimeTestCenter(navigation, region, setTestCenterValue),
    moveToTimeSlots: navigation => moveToTimeSlotsAction(navigation),
    GetRegions: data => dispatch(GetRegions(data)),
    getAppointmentSlots: data => dispatch(getAppointmentSlotsAction(data)),
    bookAppointment: data => dispatch(bookAppointmentAction(data))
  };
};

const mapStateToProps = state => {
  return {
    regionData: state.RegionReducer.regionData,
    appointmentSlotsData: state.RegionReducer.appointmentSlotsData,
    userInfo: state.mainScreenReducer.userInfo,
    errMessage: state.RegionReducer.errMessage
  };
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
    marginBottom: 150,
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
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16,
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppointmentCalender);
