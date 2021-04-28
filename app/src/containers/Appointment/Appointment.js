import React, {useState} from 'react';
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
import {Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {moveToAppointmentCalenderAction} from './Actions';
import {RFValue} from 'react-native-responsive-fontsize';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {PRIMARY_COLOR, GRAY_COLOR, WHITE_COLOR} from '../../theme/Colors';
const menuArrowIcon = require('../../assets/images/menu-arrow-icon.png');
const appointmentBg1 = require('../../assets/images/appointment-bg1.png');
const {width, height} = Dimensions.get('window');
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

const Appointment = ({movetoAppointmentCalenderScreen, navigation}) => {
  const window = useWindowDimensions();

  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.appointmentlistContainer}
        onPress={() => movetoAppointmentCalenderScreen(navigation)}>
        <Text style={{fontWeight: 'bold', marginStart: 8, color: '#20B2AA'}}>
          Jenny WHite
        </Text>
        <Text style={{color: '#d3d3d3', marginStart: 8, fontSize: 16}}>
          My self
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
          <Text style={styles.headerText}>Make an Appointment</Text>
        </View>
      </View>
      <View style={styles.appoinmentDivBg}>
        <View style={styles.nameContainer}>
          <View style={styles.nameTextContainer}>
            <Text style={styles.inputLabelDiv}>
              <Text style={styles.inputLabel}>
                Make an {'\n'}Appointment for
              </Text>
              {'\n'}
              {'\n'}
              <Text style={styles.inputLabelSmall}>
                Please select the family memebers u want to select.
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.actionCertificateContainer}>
          <FlatList
            data={DATA}
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
    movetoAppointmentCalenderScreen: navigation =>
      moveToAppointmentCalenderAction(navigation),
  };
};

const mapStateToProps = state => {
  return {};
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
    marginTop:'25%',
  },
  splashbackground: {
    flex: 1,
  },
  nameTextContainer: {
    marginTop: 50,
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
  },
  nameContainer: {
    alignSelf: 'stretch',
    marginTop: 16,
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
