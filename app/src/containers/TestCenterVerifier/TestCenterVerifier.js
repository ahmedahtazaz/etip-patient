import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    FlatList
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { useIsFocused } from '@react-navigation/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { GREEN_COLOR } from '../../theme/Colors';
const { width, height } = Dimensions.get('window')
const DATA = [
    {
        name: 'Zeitfenster auswahlen',
        address: 'SudLager 220g, g2249 Vilseck, Germany',
    },
    {
        name: 'Zeitfenster auswahlen',
        address: 'SudLager 220g, g2249 Vilseck, Germany',
    },
    {
        name: 'Zeitfenster auswahlen',
        address: 'SudLager 220g, g2249 Vilseck, Germany',
    },
    {
        name: 'Zeitfenster auswahlen',
        address: 'SudLager 220g, g2249 Vilseck, Germany',
    },
    {
        name: 'Zeitfenster auswahlen',
        address: 'SudLager 220g, g2249 Vilseck, Germany',
    },
    {
        name: 'Zeitfenster auswahlen',
        address: 'SudLager 220g, g2249 Vilseck, Germany',
    },
    {
        name: 'Zeitfenster auswahlen',
        address: 'SudLager 220g, g2249 Vilseck, Germany',
    },
];

function TestCenterVerifier({ navigation }) {
    const isFocused = useIsFocused();

    useEffect(() => {
        Orientation.lockToPortrait();
    }, [isFocused]);


    const renderItem = ({ item, index }) => (
        <TouchableOpacity style={styles.item} key={index} onPress={()=>navigation.navigate("TestCenterInfo")}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.address}>{item.address}</Text>
        </TouchableOpacity>
    );
    return (
        <View style={styles.MainContainer}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.heading}>Select test center</Text>
                    <Text style={styles.subHeading}>Select the test center you are working today</Text>
                </View>
            </View>
            <View style={styles.testCenterList}>
                <View style={styles.listView}>
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    MainContainer: {
        height,
        width
    },
    header: {
        flexDirection: "row",
        height: height * 0.15,
        alignItems: "flex-end",
        paddingLeft: 10,
        width,
    },
    listView: {
        marginTop: 30
    },
    testCenterList: {
        height: height * 0.85,
        paddingHorizontal: 5
    },
    heading: {
        fontSize: RFValue(18, 580),
        fontWeight: "bold"
    },
    subHeading: {
        color: "#bcbcbc",
        fontSize: RFValue(14, 580),
    },
    name: {
        fontSize: RFValue(12, 580),
        color: GREEN_COLOR
    },
    address: {
        fontSize: RFValue(12, 580),
        color: "#aeaeae"
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
});

export default TestCenterVerifier;