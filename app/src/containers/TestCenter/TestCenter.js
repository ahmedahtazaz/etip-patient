
import React, { useState } from "react";
import { Icon,SearchBar } from 'react-native-elements'

import {Button, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Image, useWindowDimensions, ImageBackground } from "react-native";
import { Dimensions } from 'react-native';
import Calendar from "../../components/Calendar";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const DATA = [
    {
        id: "Modifiy Personal Information",
        title: "Modifiy Personal Information",
    },
    {
        id: "Modify Email",
        title: "Modify Email",
    },
    {
        id: "Modify Sim",
        title: "Modify Sim",
    },
    {
        id: "About App",
        title: "About App",
    },
    {
        id: "Need Assistance",
        title: "Need Assistance",
    },
    {
        id: "Privacy Policy",
        title: "Privacy Policy",
    },
    {
        id: "Terms & Conditions",
        title: "Terms & Conditions",
    },

];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
);

const TestCenter = () => {
    const window = useWindowDimensions();

    const [selectedId, setSelectedId] = useState(null);

    const renderItem = ({ item }) => {

        return (
            <View style={{  
                marginVertical: 8,
                marginHorizontal: 16, }}>
               

               <View style={styles.nameTextContainer}>
                        <Text style={{ marginStart: 8, color: '#adadad' }}>Appointment For</Text>
                        <Text style={{ color: '#20B2AA', textColor: 'grey', marginStart: 8 }}>Jenny White</Text>
                    </View>

            </View>

        );
    };

    return (
        <View style={styles.container}>
            <SearchBar
                containerStyle={{backgroundColor: 'white', borderWidth: 0, borderRadius: 10,marginStart:8,marginEnd:8,marginTop:32,   borderBottomColor: 'transparent',
                borderTopColor: 'transparent'}}
                inputContainerStyle={{backgroundColor: '#d3d3d3'}}
        placeholder="Type Here..."
      />
            <View style={styles.actionCertificateContainer} >
                <FlatList
                    
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={selectedId}
                />
            </View>

          
           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: "column"

        
    },
    nameTextContainer: {
        display: "flex",
        flexDirection: "column"
    },
    actionCertificateContainer: {
        marginTop: 8,
        display: "flex",
        flexDirection: "column"
    },

    calenderContainer: {
        marginTop: 8,
        flex:3,
        display: "flex",
        flexDirection: "column"
    },
    nameContainer: {
        flex:1,
        alignSelf: 'stretch',
        marginTop: 16,
        backgroundColor: 'white',
        textAlign: 'center',

    },
    parentNameContainer: {
        marginTop:16,
        flex:1,

        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    bluebox: {
        width: 100,
        height: 100,
        backgroundColor: 'blue'
    },
    blackbox: {
        width: 100,
        height: 100,
        backgroundColor: 'black'
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 16,
         borderRadius: 10,
      }
})

export default TestCenter;
