import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

import QRCodeScanner from 'react-native-qrcode-scanner';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { RFValue } from 'react-native-responsive-fontsize';
const { width, height } = Dimensions.get('window')


function QRScreen({ navigation}) {
    const [scan, setScan] = useState(true);
    const [certificate_request, setCertificateRequest] = useState("");
    const [proof_request, setProofRequest] = useState("");
    var arr = [];
    var arr2 = [];

    const onSuccess = (e) => {

    }

    return (
        <View style={styles.MainContainer}>
            <View style={styles.header}>
                <View style={styles.backIcon}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <EvilIcons name="chevron-left" color="#000" size={27} />
                    </TouchableOpacity>
                </View>
                <View >
                    <Text style={styles.headerText}>Scan QR Code</Text>
                </View>
            </View>
            <View style={styles.scanner}>
                <QRCodeScanner
                    reactivate={true}
                    showMarker={true}
                    customMarker={
                        <View style={
                            {
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'transparent'
                            }
                        }>
                            <View style={
                                {
                                    height: 250,
                                    width: 250,
                                    borderWidth: 2,
                                    borderColor: 'white',
                                    backgroundColor: 'transparent'
                                }
                            } />
                        </View>
                    }
                    ref={(node) => { scanner = node }}
                    onRead={onSuccess}
                    topContent={
                        <Text style={styles.textBold}>
                            Scan QR code for patient information
                        </Text>
                    }
                    bottomContent={
                        <TouchableOpacity style={styles.buttonTouchable} onPress={() => {
                            navigation.navigate('VerifierUserInfoScreen')
                        }}>
                            <Text style={styles.buttonText}>Cancel Scan</Text>
                        </TouchableOpacity>
                    }

                />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        height: height * 0.1,
        alignItems: "center",
        width,
    },
    backIcon: {
        marginHorizontal: 5,
        width: width * 0.1
    },
    headerText: {
        fontSize: RFValue(16, 580),
        width: width * 0.8,
        textAlign: "center"
    },
    scanner: {
        height: height * 0.9,
        alignItems: "center",
        justifyContent: "center"
    },
    sectionContainer: {
        backgroundColor: Colors.black,
    },
    textBold: {
        fontSize: RFValue(13, 580),
        marginLeft: 70,
        marginRight: 70,
        zIndex: 10,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: '600',
        color: '#fff',
        marginTop: 20
    },
    buttonText: {
        fontSize: 21,
        color: '#4178CD'
    },
    buttonTouchable: {
        padding: 16
    },

    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: 'red',
    },

    MainContainer: {
        width
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    Imagesize: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 40
    },


    RoundButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4178CD',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 40,
        width: 150,
        borderRadius: 20,
        margin: 5,
    },
    ImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 15,
        width: 15,
        marginLeft: 15

    },
    TextGuide: {
        color: 'black',
        marginTop: 14,
        marginLeft: 5,
        marginBottom: 30,
    },
    TextStyle: {
        color: 'white',
        marginTop: 14,
        marginLeft: 5,
        marginBottom: 15,
    },
    SeparatorLine: {
        backgroundColor: '#fff',
        width: 1,
        height: 40,
    },
});

export default QRScreen;