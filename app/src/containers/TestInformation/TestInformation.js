import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,  ImageBackground,

} from 'react-native';
import {connect} from 'react-redux';
import {moveToMainScreenAction} from './Action';

import { Switch } from 'react-native-paper';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import Orientation from 'react-native-orientation-locker';
import { useIsFocused } from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';

const menuIcon = require('../../assets/images/menu-icon.png');
const menuArrowIcon = require('../../assets/images/menu-arrow-icon.png');
const smallHeaderLogo = require('../../assets/images/small-header-logo.png');
const mainScreenIcon = require('../../assets/images/main-screen-icon.png');
const activeCertificationBg = require('../../assets/images/active-certification-bg.png');
const previousAppoinmentsBg = require('../../assets/images/previous-appoinment-bg.png');
const plusIcon = require('../../assets/images/plus-icon.png');
import { BLACK_COLOR, GREEN_COLOR, WHITE_COLOR } from '../../theme/Colors';
const { width, height } = Dimensions.get('window')


function TestInformation( { goBack, moveToMainScreen, navigation } ) {
    const [result, setResult] = useState("positive");
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const isFocused = useIsFocused();

    useEffect(() => {
        Orientation.lockToPortrait();
    }, [isFocused]);

    return (
        <View style={styles.MainContainer}>
            <View style={styles.header}>
                <View style={styles.backIcon}>
                    <TouchableOpacity onPress={() => goBack()}>
                        <EvilIcons name="chevron-left" color="#000" size={40} />
                    </TouchableOpacity>
                </View>
                <View >
                    <Text style={styles.headerText}>Test Information</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>

                
                <View style={styles.infoContainerChild}>
                <View style={styles.patientInfo}>

                    <ImageBackground
            source={activeCertificationBg}
            style={styles.imagepatientInfo}>

                        <View style={styles.patientInfoR1}>
                            <Text style={styles.patientId}>P-1234</Text>
                        </View>
                        <View style={styles.patientInfoR2}>
                            <View style={styles.nameAndTestPoint}>
                                <Text style={styles.textSize}>Zeitfenster auswahlen</Text>
                                <Text style={styles.textSize}>Test Point 1</Text>
                            </View>
                            <View style={styles.dateAndTime}>
                                <Text style={styles.textSize}>12 May 2021</Text>
                                <Text style={styles.textSize}>10:41</Text>
                            </View>
                        </View>
                        </ImageBackground>
                        </View>


                    <View >
                        <View style={{ marginTop: 30, marginBottom: 10 }}>
                            <Text style={{ ...styles.textSize, color: BLACK_COLOR }}>Test Result</Text>
                        </View>
                        <TouchableOpacity style={styles.inputStyle1} onPress={() => setResult("positive")}>
                            <View style={styles.testOption}>
                                <Text>Positive</Text>
                                {result === "positive" && <Ionicons name="checkmark-circle" color={GREEN_COLOR} size={15} />}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.inputStyle1} onPress={() => setResult("negative")}>
                            <View style={styles.testOption}>
                                <Text>Negative</Text>
                                {result === "negative" && <Ionicons name="checkmark-circle" color={GREEN_COLOR} size={15} />}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.inputStyle1} onPress={() => setResult("invalid")}>
                            <View style={styles.testOption}>
                                <Text>Invalid</Text>
                                {result === "invalid" && <Ionicons name="checkmark-circle" color={GREEN_COLOR} size={15} />}
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.switchMain}>
                        <View style={styles.switchTextView}>
                            <Text style={styles.switchText}>Send Email notification to relevant authority</Text>
                        </View>
                        <View style={styles.switchView}>
                            <Switch
                                trackColor={{ false: "#4a9b8b", true: "#4a9b8b" }}
                                thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                    </View>

                    <View>
                        <TouchableOpacity
                            style={[styles.btnStyle, styles.submitButton]}
                            
                            onPress={() => moveToMainScreen(navigation)}>
                            
                                
                            <Text style={styles.submitText}>Issue Certificate</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity
                            style={{ width: "100%",marginTop:16 }}>
                            <Text style={styles.scanAnotherQRcode}>Scan Another QR Code</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        </View>
    );
}


const styles = StyleSheet.create({

    switchMain: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,

    },
    switchTextView: {
        // width: width * 0.7
        flex: 2
    },
    switchText: {
        color: "#c0c0c0",
        fontSize: RFValue(14, 580),
    },
    switchView: {
        // width: width * 0.2
        flex: 1
    },
    testOption: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    textSize: {
        fontSize: RFValue(12, 580),
        color: WHITE_COLOR
    },
    nameAndTestPoint: {
        flex: 1
    },
    dateAndTime: {
        flex: 1,
        alignItems: "flex-end"
    },
    patientInfoR2: {
        flexDirection: "row"
    },
    header: {
        flexDirection: "row",
        height: height * 0.1,
        paddingTop:30,
        alignItems: "center",
        width,
    },
    infoContainerChild: {
        paddingTop: 30,
        borderWidth: 1,
        marginTop:20,
        borderColor: "#f2f4f3",
        backgroundColor:'#fff',
        height: height * 0.9,
        width,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingHorizontal: 10
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
    infoContainer: {
        height: height * 0.9,
        alignItems: "center",
        justifyContent: "center",
    },
    sectionContainer: {
        backgroundColor: Colors.black,
    },

    MainContainer: {
        height,
        width,
        backgroundColor: "#F5F9F8",
    },

    patientInfo: {
        borderRadius: 10,
    
        display: 'flex',
        flexDirection: 'column',
        resizeMode: 'cover',
        overflow: 'hidden',
    },
    
    imagepatientInfo: {
        borderRadius: 10,
        padding:10,
    
        display: 'flex',
        flexDirection: 'column',
        resizeMode: 'cover',
        overflow: 'hidden',
        marginEnd: 10,
    }
    , patientId: {
        marginVertical: 12,
        fontSize: RFValue(20, 580),
        color: WHITE_COLOR
    },
    inputStyle1: {
        display: 'flex',

        backgroundColor: '#ffffff',
        borderRadius: 6,
        fontSize: RFValue(14, 580),
        color: '#1d1c1c',
        paddingTop: '4%',
        paddingBottom: '4%',
        paddingLeft: '5%',
        paddingRight: '5%',
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#e0dfdf"
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
       
        paddingHorizontal: 5,
        width: "100%",
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 8,
        marginTop: '20%'
    },
    submitText: {
        color: WHITE_COLOR,
        fontSize: RFValue(14, 580),
    },
    scanAnotherQRcode: {
        fontSize: RFValue(14, 580),
        color: GREEN_COLOR,
        textAlign: "center",
        marginTop: 5
    },

});

const mapDispatchToProps = dispatch => {
    return {
      moveToMainScreen: navigation => moveToMainScreenAction(navigation),
    };
  };
  
  const mapStateToProps = state => {
    return {};
  };
export default connect(mapStateToProps, mapDispatchToProps)(TestInformation);

