import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import I18n from '../../translations/I18n';
import Orientation from 'react-native-orientation-locker';
import { useIsFocused } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { GREEN_COLOR } from '../../theme/Colors';
import BottomNavigator from '../../components/BottomNavigator';
const { width, height } = Dimensions.get('window');
const DATA = [
  {
    id: 'About App',
    name: 'About App',
    path: 'aboutApp',
  },
  {
    id: "Need assistance",
    name: 'Need assistance',
    path: "needAssistance"
  },
  {
    id: 'Privacy Policy',
    name: 'Privacy Policy',
    path: 'policy',
  },
  {
    id: 'Terms & Conditions',
    name: 'Terms & Conditions',
    path: 'terms',
  },
  {
    id: 'Change Language',
    name: 'Change Language',
    path: 'ChangeLanguage',
  },
];

function VerifierSettings({ navigation }) {
  const [patientName, setPatientName] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    Orientation.lockToPortrait();
  }, [isFocused]);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={styles.item} key={index}

      onPress={() => {
        navigation.navigate(item.path);

      }}
    >
      <Text style={styles.name}>{I18n.t(item.name)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.MainContainer}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>{I18n.t('Settings')}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoContainerChild}>
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
        selectedItem={{ id: 3, label: 'Settings' }}></BottomNavigator>
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
    justifyContent: 'center',
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
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#f8fbfa',
  },
  header: {
    flexDirection: 'row',
    height: '11%',
    alignItems: 'center',
    paddingTop: 30,
    width,
  },
  headerText: {
    fontSize: RFValue(16, 580),
    width,
    textAlign: 'center',
  },
  infoContainer: {
  },
  infoContainerChild: {
    paddingTop: 30,
    height: '95%',
    borderWidth: 1,
    borderColor: '#f2f4f3',
    backgroundColor: '#ffffff',
    marginTop: 20,
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

export default VerifierSettings;
