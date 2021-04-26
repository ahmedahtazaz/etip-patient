import React, { useEffect } from 'react';
import Orientation from 'react-native-orientation-locker';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Image, View, StyleSheet, Text, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RFValue } from 'react-native-responsive-fontsize';
import { WHITE_COLOR } from '../../theme/Colors';

const { width, height } = Dimensions.get('window')

function UpdateSettings() {
    const isFocused = useIsFocused();

    useEffect(() => {
        Orientation.lockToPortrait();
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.icon}>
                    <AntDesign name="caretleft" color="#000" />
                </View>
                <View >
                    <Text style={styles.headerText}>Update Phone Number</Text>
                </View>
            </View>
            <View style={styles.fields}>
                <View>
                    <TouchableOpacity
                        style={[styles.btnStyle, styles.submitButton]}>
                        <Text style={styles.submitText}>Update</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}



export default (UpdateSettings);

// Style for "Background"
const styles = StyleSheet.create({
    container: {
        height
    },
    header: {
        flexDirection: "row",
        height: height * 0.1,
        borderWidth: 1,
        alignItems: "center"
    },
    fields: {

    },
    headerText: {
        fontSize: RFValue(16, 580),
    },
    btnStyle: {
        backgroundColor: "#212826",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.35,
        shadowRadius: 5,
        elevation: 2,
        // minWidth: 88,
        // paddingLeft: 16,
        // paddingRight: 16,
        height: 50,
        paddingHorizontal: 5,
        width: width * 0.9
    },
    submitButtonDark: {
        // width: '100%',
        height: height * 0.1,
        borderRadius: 3,
        backgroundColor: '#000',
        color: WHITE_COLOR,
        paddingTop: 15,
        paddingBottom: 15,
        fontSize: RFValue(14, 580),
    },
    submitText: {
        color: WHITE_COLOR,
        fontSize: RFValue(14, 580),

    }
});
