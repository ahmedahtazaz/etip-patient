import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  TextInput,
  FlatList,
} from 'react-native';
import moment from 'moment';
import I18n from '../../translations/I18n';
import Orientation from 'react-native-orientation-locker';
import { useIsFocused } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import { BLACK_COLOR, GREEN_COLOR, WHITE_COLOR } from '../../theme/Colors';
import BottomNavigator from '../../components/BottomNavigator';
import { getConductedTestsAction } from './Action';
import { showToast } from '../../commons/Constants';
import { get_pending_applications_url } from '../../commons/environment';
import { getPendingApplicationsAction } from '../TestCenterInfo/Action';
const { width, height } = Dimensions.get('window');

function TestConducted({
  navigation,
  getPendingApplications,
  conductedTests,
  errMessage,
  loader,
  verifyPinPayload,
  pendingApplications
}) {
  const [patientName, setPatientName] = useState('');
  const [filteredPatient, setFilteredPatient] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    Orientation.lockToPortrait();
  }, [isFocused]);

  useEffect(() => {
    let data = {
      url: `${get_pending_applications_url}/${verifyPinPayload?.user?.testCenter?._id}`
    };
    getPendingApplications(data);
  }, []);

  useEffect(() => {
    if (errMessage) {
      showToast(errMessage);
    }
  }, [errMessage]);

  const searchPatient = text => {
    setPatientName(text);
    let filteredPatients = pendingApplications.filter(
      (patient) =>
        patient.name.toLowerCase().indexOf(text.toLowerCase()) > -1,
    );
    setFilteredPatient(filteredPatients);
  };

  const getData = () => {
    return patientName.length ? filteredPatient : pendingApplications;
  };

  const renderItem = ({ item, index }) => (
    <View
      style={styles.item}
      key={index}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.date}>{`${moment(item?.appointmentDate).format("DD MMM YYYY")} ${item?.appointmentTime}`}</Text>
    </View>
  );

  return (
    <View style={styles.MainContainer}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>{I18n.t('Test Conducted')}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoContainerChild}>
          <View style={styles.searchBox}>
            <View style={styles.searchFieldView}>
              <TextInput
                style={styles.searchField}
                placeholder="Search"
                underlineColorAndroid="transparent"
                value={patientName}
                onChangeText={e => searchPatient(e)}></TextInput>
            </View>
            <View style={styles.searchIconView}>
              <Feather name="search" color="#aeadad" size={20} />
            </View>
          </View>

          <View style={styles.patientList}>
            <FlatList
              data={getData()}
              renderItem={renderItem}
              keyExtractor={(item, index) => index}
            />
          </View>
          {loader ? (
            <View
              style={{
                alignSelf: 'center',
                height: '100%',
                width: '100%',
                justifyContent: 'center',
                position: 'absolute',
                top: '40%',
                zIndex: 1000,
              }}>
              <ActivityIndicator size="large" color="grey" animating={loader} />
            </View>
          ) : null}
        </View>
      </View>
      <BottomNavigator
        navigation={navigation}
        selectedItem={{ id: 2, label: 'Test Conducted' }}></BottomNavigator>
    </View>
  );
}

const styles = StyleSheet.create({
  patientList: {
    marginTop: 30,
    height: height * 0.55
  },
  item: {
    height: 60,

    borderWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 15,
    borderRadius: 5,
    borderColor: '#e0dfdf',
  },
  name: {
    fontSize: RFValue(12, 580),
  },
  date: {
    fontSize: RFValue(12, 580),
    color: '#cbd1d0',
  },
  searchIconView: {
    flex: 1,
  },
  searchFieldView: {
    flex: 9,
  },
  searchField: {
    paddingLeft: 20,
    color:'black',
    
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,

    height: 50,
    borderColor: '#f9f9f9',
  },
  MainContainer: {
    flex: 1,
    backgroundColor: '#f8fbfa',
  },
  header: {
    position:'absolute',
    zIndex: 2000,
    flexDirection: 'row',
    height: '11%',
    alignItems: 'center',
    //paddingTop: 30,
    paddingTop:'8%',
    width,
  },
  headerText: {
    fontSize: RFValue(16, 580),
    width,
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#f8fbfa',
  },
  infoContainerChild: {
    paddingTop: 30,
    borderWidth: 1,
    marginTop: 20,
    height: '95%',
    borderColor: '#f2f4f3',
    backgroundColor: '#ffffff',

    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 15,
  },
  btnStyle: {
    backgroundColor: GREEN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    height: 50,
    paddingHorizontal: 5,
    width: '100%',
    borderRadius: 8,
    marginTop: 15,
  },
});


const mapStateToProps = (state) => {
  return {
    loader: state.testCenterInfoReducer.loader,
    errMessage: state.testCenterInfoReducer.errMessage,
    pendingApplications: state.testCenterInfoReducer.pendingApplications,
    verifyPinPayload: state.pinScreenReducer.verifyPinPayload,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getConductedTests: data => dispatch(getConductedTestsAction(data)),
    getPendingApplications: data =>
      dispatch(getPendingApplicationsAction(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestConducted);