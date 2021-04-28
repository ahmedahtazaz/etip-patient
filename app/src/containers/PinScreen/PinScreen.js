import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { useIsFocused } from '@react-navigation/native';
import Foundation from 'react-native-vector-icons/Foundation';
import { RFValue } from 'react-native-responsive-fontsize';
import { GREEN_COLOR, WHITE_COLOR } from '../../theme/Colors';
const { width, height } = Dimensions.get('window')


function PinScreen({ navigation }) {
    const [pin, setPin] = useState("");
    const isFocused = useIsFocused();

    useEffect(() => {
        Orientation.lockToPortrait();
    }, [isFocused]);



    return (
        <View style={styles.MainContainer}>
            <View style={styles.header}>
                <View>
                    <Foundation name="plus" color={GREEN_COLOR} size={50} />
                </View>
            </View>
            <View style={styles.pinSection}>
                <View style={{ marginTop: 20 }}>
                    <Text style={styles.heading}>Enter Your</Text>
                    <Text style={styles.heading}>Secret Pin to continue</Text>
                </View>
                <View style={styles.lableView}>
                    <Text style={styles.labe}>Please Enter your Phone Number to</Text>
                    <Text style={styles.label}>continue</Text>
                </View>

                <View style={{ marginTop: 10 }}>
                    <TextInput
                        placeholder={"0000000"}
                        style={styles.pinStyle}
                        value={pin}
                        onChangeText={e => setPin(e)}
                        keyboardType="numeric"
                        underlineColorAndroid="transparent"
                    />
                </View>


                <View style={{ marginTop: 20 }}>
                    <TouchableOpacity
                        onPress={()=>navigation.navigate("TestCenter")}
                        disabled={pin.length !== 7}
                        style={{ ...styles.btnStyle, backgroundColor: pin.length !== 7 ? "#4b9499" : GREEN_COLOR }}>
                        <Text style={styles.submitText}>Continue</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    MainContainer: {
        height,
        width,

    },
    pinStyle: {
        fontWeight: "bold",
        fontSize: RFValue(22, 580),
    },
    header: {
        flexDirection: "row",
        height: height * 0.1,
        alignItems: "flex-end",
        justifyContent: "center",
        width,
    },
    pinSection: {
        paddingHorizontal: 10
    },
    heading: {
        fontSize: RFValue(22, 580),
        fontWeight: "bold"
    },
    lable: {
        color: "#d1d1d1",
        fontSize: RFValue(12, 580),
    },
    lableView: {
        marginTop: 20
    },
    btnStyle: {
        backgroundColor: GREEN_COLOR,
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
        height: 50,
        paddingHorizontal: 5,
        width: "100%",
        borderRadius: 8,
        marginTop: 15
    },

    submitText: {
        color: WHITE_COLOR,
        fontSize: RFValue(14, 580),
    },

});

export default PinScreen;