import React, {useState} from 'react';
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
import {Dimensions} from 'react-native';
import Calendar from '../../components/Calendar';
import {width, height, totalSize} from 'react-native-dimension';
import {ScrollView} from 'react-native-gesture-handler';

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
const GRID_DATA = [
  {key: '09:00-09:15'},
  {key: '09:15-09:30'},
  {key: '09:15-09:30'},
  {key: '09:15-09:30'},
  {key: '09:15-09:30'},
  {key: '09:15-09:30'},
  {key: '09:15-09:30'},
  {key: '09:15-09:30'},
  {key: '09:15-09:30'},
  {key: '09:15-09:30'},
  {key: '09:15-09:30'},
  {key: '09:15-09:30'},
];

const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const AppointmentTimeSlot = ({navigation}) => {
  const window = useWindowDimensions();

  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({item}) => {
    return (
      <View style={{marginStart: 8}}>
        <Image
          style={{
            height: window.height / 5,
            width: window.width / 3,
            marginEnd: 8,
            borderRadius: 10,
          }}
          source={{uri: 'https://picsum.photos/200/300'}}
        />
        <View
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 8,
            marginStart: 8,
          }}>
          <Text>Centered text</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.nameContainer}>
          <View style={styles.parentNameContainer}>
            <View style={styles.nameTextContainer}>
              <Text style={{marginStart: 8, color: '#adadad'}}>
                Appointment For
              </Text>
              <Text
                style={{color: '#20B2AA', textColor: 'grey', marginStart: 8}}>
                Jenny White
              </Text>
            </View>
            <View>
              <Icon
                name="cancel"
                color="red"
                size={25}
                style={{marginTop: 16, marginEnd: 8}}
              />
            </View>
          </View>
        </View>
        <View style={styles.actionCertificateContainer}>
          <Text style={{marginBottom: 8, marginStart: 8}}>Region</Text>
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
            <Text style={{marginStart: 8, color: '#adadad'}}>
              Appointment For
            </Text>
            <Text style={{color: '#20B2AA', textColor: 'grey', marginStart: 8}}>
              Jenny White
            </Text>
          </View>
          <View>
            {/* <Icon
                            name='left'
                            color='green'
                            size={25}
                            style={{ marginEnd: 8 }} /> */}
            <Icon
              name="right"
              size={25}
              color="#adadad"
              style={{marginTop: 16}}
            />
          </View>
        </View>

        <View style={styles.parentNameContainer}>
          <View style={styles.nameTextContainer}>
            <Text style={{marginStart: 8, color: '#adadad'}}>
              Appointment For
            </Text>
            <Text style={{color: '#20B2AA', textColor: 'grey', marginStart: 8}}>
              Jenny White
            </Text>
          </View>
          <View>
            <Icon
              name="right"
              size={30}
              color="#adadad"
              style={{marginTop: 16}}
            />
          </View>
        </View>

        <View style={styles.calenderContainer}>
          <Text style={{marginBottom: 8, marginStart: 8}}>Time Slot</Text>
          {/* <Calendar/> */}

          <FlatList
            data={GRID_DATA}
            renderItem={({item}) => (
              <View style={styles.GridViewBlockStyle}>
                <Text style={styles.GridViewInsideTextItemStyle}>
                  {' '}
                  {item.key}{' '}
                </Text>
              </View>
            )}
            numColumns={3}
          />
        </View>
        <View style={styles.bottom}>
          <Button
            color="#20B2AA"
            title="Book Appointment"
            onPress={() => navigation.replace('MainScreen', {booked: true})}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
  },
  nameTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  actionCertificateContainer: {
    marginTop: 8,
    display: 'flex',
    height: height(25),

    flexDirection: 'column',
  },

  calenderContainer: {
    marginTop: 8,
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
    margin: 8,
    backgroundColor: '#ededed',
    height: height(10),

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  bottom: {
    height: height(10),
    justifyContent: 'flex-end',
    marginBottom: 8,
    padding: 16,
    borderRadius: 10,
  },

  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  GridViewBlockStyle: {
    borderRadius: 1,
    borderWidth: 1,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    height: 50,
    margin: 5,
    backgroundColor: 'white',
    borderStyle: 'dotted',
  },
  GridViewInsideTextItemStyle: {
    color: 'black',
    padding: 10,
    fontSize: 14,
    justifyContent: 'center',
  },
});

export default AppointmentTimeSlot;
