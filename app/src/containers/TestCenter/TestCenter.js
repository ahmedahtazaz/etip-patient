import React, { useState, useEffect } from 'react';
import { Icon, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';

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
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Calendar from '../../components/Calendar';
import { RFValue } from 'react-native-responsive-fontsize';
import { PRIMARY_COLOR, GRAY_COLOR, WHITE_COLOR } from '../../theme/Colors';
const menuArrowIcon = require('../../assets/images/menu-arrow-icon.png');
import I18n from '../../translations/I18n';
import { get_terms_url, get_test_centers } from '../../commons/environment';
import { GETTestCenters } from './Action';

const { width, height } = Dimensions.get('window');
const DATA = [
  {
    id: 1,
    title: 'Test Center 1',
  },
  {
    id: 2,
    title: 'Test Center 2',
  },
  {
    id: 3,
    title: 'Modify SimTest Center 3',
  },
  {
    id: 4,
    title: 'Test Center 4',
  },
  {
    id: 5,
    title: 'Test Center 5',
  },
  {
    id: 6,
    title: 'Test Center 6',
  },
  {
    id: 7,
    title: 'Test Center 7',
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const TestCenter = ({
  route: {
    params: { region }
  },
  navigation: { goBack },
  GETTestCenters, testCenterData, }) => {
  const window = useWindowDimensions();

  const [selectedId, setSelectedId] = useState(null);
  const [testCenters, setTestCenters] = useState([]);

  useEffect(() => {
    GETTestCenters(get_test_centers + region);
    setTestCenters(testCenterData);
    console.log('region');
    console.log(region);
  }, []);


  const renderItem = ({ item }) => {
    return (
      <View>
        <View style={styles.nameTextContainer}>
          <Text style={{ marginStart: 8, color: '#027279', fontSize: 15, fontWeight: '600' }}>
          {item.testCenter.name}
          </Text>
          <Text style={{ color: '#606060', fontSize: 13, paddingTop: 5, marginStart: 8 }}>
          {item.testCenter.address}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.backIcon}>
          <TouchableOpacity onPress={() => goBack()}>
            <EvilIcons name="chevron-left" color="#000" size={40} style={{ fontWeight: 'bold' }} />
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
          inputContainerStyle={{ backgroundColor: '#F9F9F9', fontSize: 11, borderRadius: 4, }}
          placeholder="Type Here..."
        />

        <FlatList
          style={styles.appointmentlistContainer}
          data={testCenterData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={testCenterData}
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
    flexDirection: "row",
    height: height * 0.1,
    paddingTop: '7%',
    alignItems: "center",

  },
  backIcon: {
    flex: 1,
    alignItems: "flex-start"
  },
  headerTextView: {
    flex: 9,
    alignItems: "center",
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
  };
};

const mapStateToProps = state => {
  console.log('datatata');
  console.log(state.TestCenterReducer.testCenterData);

  return {
    testCenterData: state.TestCenterReducer.testCenterData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestCenter);
