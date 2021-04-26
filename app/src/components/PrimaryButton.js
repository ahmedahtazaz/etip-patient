import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DARK_BLUE_COLOR, WHITE_COLOR } from '../theme/Colors';
import {RFValue} from 'react-native-responsive-fontsize';
function PrimaryButton(props) {

    const styles = StyleSheet.create({
        primaryButton: {
            borderColor: DARK_BLUE_COLOR,
            borderWidth: 2,
            borderRadius: 26,
            backgroundColor: DARK_BLUE_COLOR,
            paddingTop: 15,
            paddingLeft: 20,
            paddingBottom: 15,
            paddingRight: 20,
            marginTop: 14,
            width: '100%',
            
        },
        text: {
            color: WHITE_COLOR,
            fontSize: RFValue(14, 580),
            fontWeight:'700',
            alignSelf: 'center'
        }
    });

    return (
        <TouchableOpacity style={styles.primaryButton} onPress={props.nextHandler}>
            <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
    )
}

export default PrimaryButton;