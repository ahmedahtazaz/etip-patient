import React, {useState, useEffect} from 'react';
import {SearchBar} from 'react-native-elements';
import {connect} from 'react-redux';

import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Dimensions} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import I18n from '../../translations/I18n';
import {get_test_centers} from '../../commons/environment';
import {GETTestCenters} from './Action';
import {setTestCenterAction} from '../AppointmentCalender/Actions';

const {height} = Dimensions.get('window');

const TestCenter = ({
  route: {
    params: {region},
  },
  navigation: {goBack},
  GETTestCenters,
  testCenterData,
  setTestCenterValue,
}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredTestCenters, setFilterTestCenters] = useState([]);

  useEffect(() => {
    GETTestCenters(get_test_centers + region);
  }, []);

  const searchTestCenter = text => {
    setSearchText(text);
    let filteredTestCenters = testCenterData.filter(
      ({testCenter}) =>
        testCenter.name.toLowerCase().indexOf(text.toLowerCase()) > -1,
    );
    setFilterTestCenters(filteredTestCenters);
  };

  const getTestCenterData = () => {
    return searchText.length ? filteredTestCenters : testCenterData;
  };

  const selectTestCenter = item => {
    setTestCenterValue(item);
    goBack();
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => selectTestCenter(item)}>
        <View style={styles.nameTextContainer}>
          <Text
            style={{
              marginStart: 8,
              color: '#027279',
              fontSize: 15,
              fontWeight: '600',
            }}>
            {item.testCenter.name}
          </Text>
          <Text
            style={{
              color: '#606060',
              fontSize: 13,
              paddingTop: 5,
              marginStart: 8,
            }}>
            {item.testCenter.address}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.backIcon}>
          <TouchableOpacity onPress={() => goBack()}>
            <EvilIcons
              name="chevron-left"
              color="#000"
              size={40}
              style={{fontWeight: 'bold'}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerTextView}>
          <Text style={styles.headerText}>{I18n.t('Test Centers')}</Text>
        </View>
      </View>
      <View style={styles.appoinmentDivBg}>
        <SearchBar
          containerStyle={{
            backgroundColor: 'white',
            borderWidth: 0,
            borderRadius: 10,
            marginStart: 8,
            fontSize: 11,
            marginEnd: 8,
            marginTop: 32,
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
          }}
          inputContainerStyle={{
            backgroundColor: '#F9F9F9',
            fontSize: 11,
            borderRadius: 4,
          }}
          placeholder="Type Here..."
          onChangeText={searchTestCenter}
          value={searchText}
        />

        <FlatList
          style={styles.appointmentlistContainer}
          data={getTestCenterData()}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={getTestCenterData()}
        />
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
    height: height * 0.1,
    paddingTop: '7%',
    alignItems: 'center',
  },
  backIcon: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerTextView: {
    flex: 9,
    alignItems: 'center',
  },
  headerText: {
    fontSize: RFValue(16, 580),
  },
  appoinmentDivBg: {
    borderRadius: 20,
    backgroundColor: 'white',
    height: '90%',
    marginTop: '5%',
  },
  nameTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 8,
    marginHorizontal: 16,
    display: 'flex',
    borderRadius: 4,
    flexDirection: 'column',
    backgroundColor: '#F9F9F9',
    padding: 10,
  },
  actionCertificateContainer: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
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
    backgroundColor: 'white',
    textAlign: 'center',
  },
  parentNameContainer: {
    marginTop: 16,
    flex: 1,

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
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 16,
    borderRadius: 10,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    GETTestCenters: data => dispatch(GETTestCenters(data)),
    setTestCenterValue: center => dispatch(setTestCenterAction(center)),
  };
};

const mapStateToProps = state => {
  return {
    testCenterData: state.TestCenterReducer.testCenterData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestCenter);
