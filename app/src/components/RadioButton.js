import React from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {PRIMARY_COLOR, WHITE_COLOR} from '../../src/theme/Colors';

const WIDTH_FACTOR = 5;

export default function RadioButton({
  checked,
  data,
  widthFactorMain,
  setChecked,
}) {
  const {width} = Dimensions.get('window');
  return (
    <View
      style={{
        width: (width * widthFactorMain) / 100,
      }}>
      {checked ? (
        <TouchableOpacity
        style={styles.container}
          onPress={() => {
            setChecked(!checked);
          }}>
          <Text
           style={styles.radioButton}>
            {data}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setChecked(!checked);
          }}
          >
          <Text
            style={styles.radioButton1}>
            {data}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#212826',
    borderRadius: 3,
    shadowColor: '#000',
    width:'100%',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.26,
    shadowRadius: 4,
    elevation: 10,
    
    
  },
  radioButton: {
    width:'100%',
    borderRadius: 3,
    backgroundColor: '#006970',
    color: WHITE_COLOR,
    fontSize: RFValue(12, 580),
    fontWeight:'600',
    paddingTop: '11%',
    paddingBottom: '11%',
    textAlign:'center',
    
  },
  radioButton1: {
    width:'100%',
    borderRadius: 3,
    backgroundColor: WHITE_COLOR,
    borderWidth:1,
    borderColor:'#EDEDED',
    color: '#243E3B',
    fontSize: RFValue(12, 580),
    fontWeight:'600',
    paddingTop: '10%',
    paddingBottom: '10%',
    textAlign:'center',
  },
});
