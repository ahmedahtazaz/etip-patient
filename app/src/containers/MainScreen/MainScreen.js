import {useIsFocused} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import {Dimensions} from 'react-native';
import Orientation from 'react-native-orientation-locker';
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

const MainScreen = () => {
  const window = useWindowDimensions();

  const [selectedId, setSelectedId] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    Orientation.lockToPortrait();
  }, [isFocused]);

  const renderItem = ({item}) => {
    return (
      <View style={{marginStart: 8}}>
        <Image
          style={{height: window.height / 4, width: window.width, marginEnd: 8}}
          source={{uri: 'https://picsum.photos/200/300'}}
        />
      </View>
    );
  };

  const renderItemAppointment = ({item}) => {
    return (
      <View style={{marginStart: 8}}>
        <Image
          style={{
            height: window.height / 4,
            width: window.width,
            marginBottom: 8,
          }}
          source={{uri: 'https://picsum.photos/200/300'}}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <View style={styles.parentNameContainer}>
          <View style={styles.nameTextContainer}>
            <Text style={{fontSize: 25, fontWeight: 'bold', marginStart: 8}}>
              Hi Jenny
            </Text>
            <Text style={{textColor: 'grey', marginStart: 8}}>
              Hope u r feeling healthy today
            </Text>
          </View>

          <View>
            <Image
              style={{height: 50, width: 50, marginEnd: 8}}
              source={{uri: 'https://picsum.photos/200/300'}}
            />
          </View>
        </View>
      </View>
      <View style={styles.actionCertificateContainer}>
        <Text style={{marginBottom: 8, marginStart: 8}}>
          ACTIVE CERTIFICATES
        </Text>
        <FlatList
          horizontal
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </View>
      <View style={styles.actionCertificateContainer}>
        <Text style={{marginBottom: 8, marginStart: 8}}>APPOINTMENTS</Text>
        <FlatList
          vertical
          data={DATA}
          renderItem={renderItemAppointment}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  nameTextContainer: {
    display: 'flex',
    flexDirection: 'column',
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
});

export default MainScreen;
