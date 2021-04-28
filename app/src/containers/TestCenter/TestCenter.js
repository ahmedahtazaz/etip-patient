import React, {useState} from 'react';
import {Icon, SearchBar} from 'react-native-elements';

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
import {RFValue} from 'react-native-responsive-fontsize';
import {PRIMARY_COLOR, GRAY_COLOR, WHITE_COLOR} from '../../theme/Colors';
const menuArrowIcon = require('../../assets/images/menu-arrow-icon.png');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
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

const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const TestCenter = ({navigation: {goBack}}) => {
  const window = useWindowDimensions();

  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({item}) => {
    return (
      <View>
        <View style={styles.nameTextContainer}>
          <Text style={{marginStart: 8, color: '#027279', fontSize:15, fontWeight:'600'}}>
            Appointment For
          </Text>
          <Text style={{color: '#606060', fontSize:13, paddingTop:5, marginStart: 8}}>
          {item.title}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainMenu}>
      <View style={styles.mainMenuItems}>
        <TouchableOpacity
          style={styles.menuItemsLeft}
          onPress={() => navigation.goBack()}>
          <Image source={menuArrowIcon} style={{marginLeft: 10}} />
        </TouchableOpacity>
        <View style={styles.menuItemsCenter}>
        <Text style={styles.headerTitle}>Select Test Center</Text>
        </View>
        </View>
      </View>
      <View style={styles.appoinmentDivBg}>
      <SearchBar
        containerStyle={{
          backgroundColor: 'white',
          borderWidth: 0,
          borderRadius: 10,
          marginStart: 8,
          fontSize:11,
          marginEnd: 8,
          marginTop: 32,
          borderBottomColor: 'transparent',
          borderTopColor: 'transparent',
        }}
        inputContainerStyle={{backgroundColor: '#F9F9F9', fontSize:11, borderRadius: 4,}}
        placeholder="Type Here..."
      />
      
        <FlatList
          style={styles.appointmentlistContainer}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5E5E5',
    flex: 1,
    flexDirection: 'column',
  },
  mainMenu : {
    paddingBottom: 18,
    paddingTop: 20,
  },
  mainMenuItems: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 15,
  },
  menuItemsLeft: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width:'25%',
    marginStart:5,
  },
  menuItemsCenter: {
    justifyContent: 'center',
    minHeight:28,
  },
  headerTitle : {
    color:'#322929',
    fontWeight:'900',
    fontSize: RFValue(16, 580),
  },
  appoinmentDivBg : {
    borderRadius:20,
    backgroundColor:'white',
    height:'90%',
  },
  nameTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 8,
    marginHorizontal: 16,
    display: 'flex',
    borderRadius:4,
    flexDirection: 'column',
    backgroundColor:'#F9F9F9',
    padding:10,
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

export default TestCenter;
