import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Switch,
  TextInput,
  FlatList,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Orientation from 'react-native-orientation-locker';
import {useIsFocused} from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import {RFValue} from 'react-native-responsive-fontsize';
import {BLACK_COLOR, GREEN_COLOR, WHITE_COLOR} from '../../theme/Colors';
import BottomNavigator from '../../components/BottomNavigator';
const {width, height} = Dimensions.get('window');
const DATA = [
  {
    name: 'P-1234',
    date: '20/May/2020 10:00',
  },
  {
    name: 'P-1354',
    date: '1/Jun/2020 09:00',
  },
  {
    name: 'P-7878',
    date: '12/Jul/2020 01:00',
  },
  {
    name: 'P-4887',
    date: '2/Aug/2020 04:00',
  },
  {
    name: 'P-6698',
    date: '8/Sep/2020 08:00',
  },
  {
    name: 'P-1987',
    date: '27/Oct/2020 10:00',
  },
];

function TestConducted({navigation}) {
  const [patientName, setPatientName] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    Orientation.lockToPortrait();
  }, [isFocused]);

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.item}
      key={index}
      onPress={() => navigation.navigate('TestInformationScreen')}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.MainContainer}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>Test Conducted</Text>
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
                onChange={e => setPatientName(e.target.value)}></TextInput>
            </View>
            <View style={styles.searchIconView}>
              <Feather name="search" color="#aeadad" size={20} />
            </View>
          </View>

          <View style={styles.patientList}>
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={(item, index) => index}
            />
          </View>
        </View>
      </View>
      <BottomNavigator
        navigation={navigation}
        selectedItem={{id: 2, label: 'Test Conducted'}}></BottomNavigator>
    </View>
  );
}

const styles = StyleSheet.create({
  patientList: {
    marginTop: 30,
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
    borderColor: '#f9f9f9',
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
    flexDirection: 'row',
    height: height * 0.1,
    alignItems: 'center',
    paddingTop: 30,
    width,
    backgroundColor: '#f8fbfa',
  },
  headerText: {
    fontSize: RFValue(16, 580),
    width,
    textAlign: 'center',
  },
  infoContainer: {
    height: height * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fbfa',
  },
  infoContainerChild: {
    paddingTop: 30,
    borderWidth: 1,
    marginTop: 20,
    borderColor: '#f2f4f3',
    backgroundColor: '#fff',
    height: height * 0.8,
    width,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 10,
  },
  btnStyle: {
    backgroundColor: GREEN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
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

export default TestConducted;
