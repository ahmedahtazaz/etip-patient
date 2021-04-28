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
import {PRIMARY_COLOR, GRAY_COLOR, WHITE_COLOR} from '../../theme/Colors';
const menuArrowIcon = require('../../assets/images/menu-arrow-icon.png');
const appointmentBg1 = require('../../assets/images/appointment-bg1.png');
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
      <View style={styles.mainMenu}>
        <TouchableOpacity
          style={styles.mainMenuItems}
          onPress={() => navigation.goBack()}>
          <Image source={menuArrowIcon} style={{marginLeft: 10, marginTop:5}} />
        </TouchableOpacity>
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
  mainMenuItems: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 25,
  },
  appoinmentDivBg : {
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    marginTop: 30,
    backgroundColor:'white',
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
    borderRadius:4,
    flexDirection: 'column',
    backgroundColor:'#F9F9F9',
    padding:10,
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
    paddingRight:'10%',
  },
  inputLabel: {
    fontSize: RFValue(20, 580),
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
  },
  inputLabelSmall: {
    fontSize: RFValue(12, 580),
    color: GRAY_COLOR,
    lineHeight:20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Appointment);
