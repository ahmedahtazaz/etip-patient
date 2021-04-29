import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image,
    ImageBackground,
    FlatList
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { useIsFocused } from '@react-navigation/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { GREEN_COLOR } from '../../theme/Colors';
const headerLogo = require('../../assets/images/header-logo.png');
const phoneDivBg = require('../../assets/images/phone-div-bg.png');
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
            <View style={styles.mainMenu}>
            <Image source={headerLogo}  />
            </View>
            <ImageBackground source={phoneDivBg} style={styles.splashbackground}>
            <View style={styles.innerDiv}>
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
            </ImageBackground>
        </View>
    );
}


const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: '#ffffff',
        height,
        width
    },
    splashbackground: {
        flex: 1,
        resizeMode: 'cover',
     
      },
    mainMenu : {
        position: 'absolute',
        zIndex: 2000,
        top: '5%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',
        paddingTop:'5%',
      },
    header: {
        flexDirection: "row",
        height: height * 0.15,
        alignItems: "flex-end",
        marginTop: 80,
        width,
        
    },
    innerDiv: {
        paddingLeft: '5%',
        paddingRight: '5%',
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
        color: '#027279'
    },
    address: {
        fontSize: RFValue(10, 580),
        color: "#606060"
    },
    item: {
        display: 'flex',
        borderRadius: 4,
        flexDirection: 'column',
        backgroundColor: '#F9F9F9',
        padding: 10,
        marginBottom:10,
    },
});

export default TestCenterVerifier;