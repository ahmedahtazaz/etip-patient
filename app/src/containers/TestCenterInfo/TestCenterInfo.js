import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
    FlatList
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { useIsFocused } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { RFValue } from 'react-native-responsive-fontsize';
import { BLACK_COLOR, GREEN_COLOR, WHITE_COLOR } from '../../theme/Colors';
const { width, height } = Dimensions.get('window')

const DATA = [
    {
        name: 'P-1234',
        date: '12/Apr/2020 10:00',
    },
    {
        name: 'P-1234',
        date: '12/Apr/2020 10:00',
    },
    {
        name: 'P-1234',
        date: '12/Apr/2020 10:00',
    }
];

function TestCenterInfo({ navigation }) {
    const isFocused = useIsFocused();

    useEffect(() => {
        Orientation.lockToPortrait();
    }, [isFocused]);


    const renderItem = ({ item, index }) => (
        <TouchableOpacity style={styles.item} key={index}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.date}>{item.date}</Text>
        </TouchableOpacity>
    );
    return (
        <View style={styles.MainContainer}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.heading}>Hello, Jone!</Text>
                    <Text style={styles.subHeading}>Hope you are having a good day</Text>
                </View>
            </View>
            <View style={styles.testCenterList}>

                <TouchableOpacity style={styles.centerLabel}>
                    <View>
                        <Text style={styles.centerTitle}>Test Center</Text>
                        <Text style={styles.centerName}>Zeitfenster auswahlen</Text>
                    </View>
                    <View>
                        <Entypo name="chevron-small-right" color={GREEN_COLOR} size={20} />
                    </View>
                </TouchableOpacity>

                <Text style={{ fontSize: RFValue(13, 580), marginTop: 30, paddingLeft: 10 }}>Test Awaiting for results</Text>

                <View style={styles.patientList}>
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index}
                    />
                </View>

                <View>
                    <TouchableOpacity
                        style={[styles.btnStyle, styles.submitButton]}>
                        <FontAwesome name="qrcode" color={WHITE_COLOR} size={20} />
                        <Text style={styles.submitText}>Issue Certificate</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity
                        style={{ width: "100%" }}>
                        <Text style={styles.scanAnotherQRcode}>Scan Another QR Code</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    patientList: {
        marginTop: 30
    },
    MainContainer: {
        height,
        width
    },
    header: {
        flexDirection: "row",
        height: height * 0.3,
        alignItems: "flex-end",
        paddingLeft: 10,
        width,
        backgroundColor: "gray",
        alignItems: "center",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    testCenterList: {
        height: height * 0.7,
        paddingHorizontal: 5
    },
    listView: {
        marginTop: 30
    },

    heading: {
        fontSize: RFValue(20, 580),
        fontWeight: "bold",
        color: WHITE_COLOR
    },
    subHeading: {
        color: "#bcbcbc",
        fontSize: RFValue(14, 580),
        marginTop: 5
    },
    item: {
        height: 50,
        padding: 10,
        borderWidth: 1,
        paddingLeft: 15,
        paddingBottom: 15,
        marginBottom: 15,
        borderRadius: 5,
        borderColor: "#f9f9f9"
    },
    centerName: {
        fontSize: RFValue(12, 580),
        color: GREEN_COLOR
    },
    centerTitle: {
        fontSize: RFValue(12, 580),
        color: "#aeaeae"
    },
    centerLabel: {
        backgroundColor: WHITE_COLOR,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop: -30,
        height: 50,
        marginHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    name: {
        fontSize: RFValue(12, 580),
        color: BLACK_COLOR
    },
    date: {
        fontSize: RFValue(12, 580),
        color: "#cbd1d0"
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
    scanAnotherQRcode: {
        fontSize: RFValue(14, 580),
        color: GREEN_COLOR,
        textAlign: "center",
        marginTop: 5
    },
    submitText: {
        color: WHITE_COLOR,
        fontSize: RFValue(14, 580),
        marginLeft: 15
    },
});

export default TestCenterInfo;