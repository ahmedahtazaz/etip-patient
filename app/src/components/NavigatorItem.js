import React, {useRef} from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, ImageBackground, View,} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
const selectedBottomNav = require('../assets/images/selected-bottom-nav.png');

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
        if (isSelected) return require('../assets/images/appointments-icon.png');
        else return require('../assets/images/appointments-icon.png');
      case 3:
        if (isSelected) return require('../assets/images/family-icon.png');
        else return require('../assets/images/family-icon.png');
      case 4:
        if (isSelected) return require('../assets/images/certificates-icon.png');
        else return require('../assets/images/certificates-icon.png');
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
      
        {isSelected?<ImageBackground source={selectedBottomNav} style={styles.slectedNavBg} > 
        <View>
        <Text
        style={{
          width: '100%',
          fontSize: RFValue(10, 580),
          fontFamily: 'Gotham-Medium',
          color: '#036167',
          textAlign: 'center',
          paddingTop:10,
        }}
        numberOfLines={1}>
        {item.label}
      </Text></View></ImageBackground>:<Image
        style={{
          width: '100%',
          height: '30%',
        }}
        resizeMethod="resize"
        resizeMode="contain"
        source={getImage(item, isSelected)}></Image>}
      
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 97,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    
  },
  slectedNavBg: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
    alignItems: 'center',
    width:'100%',
    paddingBottom:15,
  },
});

export default NavigatorItem;
