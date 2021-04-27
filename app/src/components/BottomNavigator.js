import React, {useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import NavigatorItem from './NavigatorItem';

function BottomNavigator({navigation}) {
  const [items, setItems] = useState([
    {id: 1, label: 'Home'},
    {id: 2, label: 'Appointments'},
    {id: 3, label: 'Family'},
    {id: 4, label: 'Certificates'},
  ]);
  const [selectedItem, setSelectedItem] = useState({id: 1, label: 'Home'});
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={styles.rowHorizontalScreenListContainer}
        style={styles.rowHorizontalScreenList}
        data={items}
        viewabilityConfig={{itemVisiblePercentThreshold: 50}}
        renderItem={({item, index, separators}) => (
          <NavigatorItem
            item={item}
            isSelected={selectedItem.id == item.id}
            navigation={navigation}
            onPress={item => setSelectedItem(item)}
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
    backgroundColor: '#353333',
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
