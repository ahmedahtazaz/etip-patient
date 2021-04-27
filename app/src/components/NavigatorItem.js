import React, {useRef} from 'react';
import {StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

function NavigatorItem({item, isSelected, navigation, onPress}) {
  const isSelectedRef = useRef(isSelected);
  isSelectedRef.current = isSelected;

  const itemRef = useRef(item);
  itemRef.current = item;

  const getTitleColor = isSelected => {
    if (isSelected) return '#F37320';
    else return 'white';
  };

  const getImage = (item, isSelected) => {
    switch (item.id) {
      case 1:
        if (isSelected) return require('../assets/images/home-icon.png');
        else return require('../assets/images/home-icon.png');
      case 2:
        if (isSelected) return require('../assets/images/home-icon.png');
        else return require('../assets/images/home-icon.png');
      case 3:
        if (isSelected) return require('../assets/images/home-icon.png');
        else return require('../assets/images/home-icon.png');
      case 4:
        if (isSelected) return require('../assets/images/home-icon.png');
        else return require('../assets/images/home-icon.png');
      default:
        if (isSelected) return require('../assets/images/home-icon.png');
        else return require('../assets/images/home-icon.png');
    }
  };

  const navigateToHome = item => {
    navigation.navigate('MainScreen', {item: item});
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onPress(item);
        navigateToHome(item);
      }}>
      <Image
        style={{
          width: '100%',
          height: '30%',
        }}
        resizeMethod="resize"
        resizeMode="contain"
        source={getImage(item, isSelected)}></Image>
      <Text
        style={{
          width: '100%',
          fontSize: RFValue(7, 580),
          fontFamily: 'Gotham-Medium',
          color: getTitleColor(isSelected),
          textAlign: 'center',
          top: '10%',
        }}
        numberOfLines={1}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 85,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
});

export default NavigatorItem;
