import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { IS_VERIFIER_APP } from '../commons/Constants';
import NavigatorItem from './NavigatorItem';

const verifierNavOptions = [
  { id: 1, label: 'Home' },
  { id: 2, label: 'Test Conducted' },
  { id: 3, label: 'Settings' },
]

const patientNavOptions = [
  { id: 1, label: 'Home' },
  { id: 2, label: 'Appointments' },
  { id: 3, label: 'Family' },
  { id: 4, label: 'Certificates' },
]


function BottomNavigator({ navigation, selectedItem }) {
  const [items, setItems] = useState(IS_VERIFIER_APP ? verifierNavOptions : patientNavOptions);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={styles.rowHorizontalScreenListContainer}
        style={styles.rowHorizontalScreenList}
        data={items}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        renderItem={({ item, index, separators }) => (
          <NavigatorItem
            item={item}
            isSelected={selectedItem.id == item.id}
            navigation={navigation}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor:'#ececec',
    borderWidth:1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.85,
shadowRadius: 3.84,

elevation: 15,
  },
  rowHorizontalScreenListContainer: {
    flexGrow: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
  },
  rowHorizontalScreenList: {
    width: '100%',
    height: '80%',
  },
});

export default BottomNavigator;
