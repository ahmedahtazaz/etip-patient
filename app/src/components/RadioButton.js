import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

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
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#212826',
          }}
          onPress={() => {
            setChecked(!checked);
          }}>
          <Text
            style={{
              fontSize: RFValue(10, 580),
              top: '5%',
              color: 'white',
            }}>
            {data}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setChecked(!checked);
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'white',
          }}>
          <Text
            style={{
              fontSize: RFValue(10, 580),
              top: '5%',
            }}>
            {data}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
