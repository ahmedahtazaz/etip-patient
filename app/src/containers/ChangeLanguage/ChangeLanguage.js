import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  Dimensions,
} from 'react-native';

import {connect} from 'react-redux';
import {LanguageChangeAction, GetLanguage, GetLanguageByLang} from './Actions';
import {get_lang_by_lang_url, get_lang_url} from '../../commons/environment';

import {GREEN_COLOR, WHITE_COLOR} from '../../theme/Colors';
const {width, height} = Dimensions.get('window');

import AsyncStorage from '@react-native-community/async-storage';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {LANGUAGE_KEY} from '../../commons/Constants';
const languages = [{
  Id: 0,
  description: 'English',
  status:'true',
  },
  {
  Id: 1,
  description: 'German'
  }]
function ChangeLanguage({
  GetLanguage,
  navigation,
  initLoaded,
  GetLanguageByLang,
}) {
 // const [languages, setlanguages] = useState([]);

  useEffect(() => {
    GetLanguage(get_lang_url);
    //setlanguages(initLoaded);
  }, []);

  const saveData = async data => {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, data);
    } catch (e) {}
  };
  const englishClick = item => {
    item.status = 'false';
    setSelectedLang(item.lang);
    saveData(item.lang);
    GetLanguageByLang(get_lang_by_lang_url + item.lang);
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.inputStyle1}
          onPress={() => englishClick(item)}>
          <View style={styles.testOption}>
            <Text>{item.description}</Text>
            {item.status === 'true' && (
              <Ionicons name="checkmark-circle" color={GREEN_COLOR} size={25} />
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    //   <View style={styles.container}>
    //     <View style={styles.subContainer}>

    //       <View>
    //         <TouchableOpacity onPress={onLanguage}>
    //           <View style={styles.buttonView}>
    //             <Text style={styles.buttontext}>{select}</Text>
    //           </View>
    //        </TouchableOpacity>
    //        <View>
    //         {(value) ? onSelectLanguage() : null}
    //        </View>
    //     </View>
    //  </View>
    // </View>
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.backIcon}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <EvilIcons
              name="chevron-left"
              color="#000"
              size={40}
              style={{fontWeight: 'bold'}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerTextView}>
          <Text style={styles.headerText}>Change Language</Text>
        </View>
      </View>
      
      <View style={styles.appoinmentDivBg}>
      <View style={styles.mainDivPad}>
      <FlatList
        data={languages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {/* <TouchableOpacity
              style={styles.inputStyle1}
              onPress={englishClick}>
              <View style={styles.testOption}>
                <Text>English</Text>
                {result === 'positive' && (
                  <Ionicons
                    name="checkmark-circle"
                    color={GREEN_COLOR}
                    size={15}
                  />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.inputStyle1}
              onPress={germanClick}>
              <View style={styles.testOption}>
                <Text>German</Text>
                {result === 'negative' && (
                  <Ionicons
                    name="checkmark-circle"
                    color={GREEN_COLOR}
                    size={15}
                  />
                )}
              </View>
            </TouchableOpacity> */}
            </View>
            </View>
    </View>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    GetLanguage: lang => dispatch(GetLanguage(lang)),
    LanguageChangeAction: lang => dispatch(LanguageChangeAction(lang)),
    GetLanguageByLang: lang => dispatch(GetLanguageByLang(lang)),
  };
};

const mapStateToProps = state => {
  return {
    initLoaded: state.LanguageReducer.initPayLoad,
    langData: state.LanguageReducer.langData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeLanguage);

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#F5FCFF',
  //   padding: 24,
  // },
  container: {
    height,
    backgroundColor: '#f8fbfa',
  },
  imageThumbnail: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  subContainer: {
    flexDirection: 'row',
  },
  mainTitle: {
    color: '#3b5998',
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  buttonView: {
    backgroundColor: '#3b5998',
    padding: 10,
  },
  block: {
    width: 230,
  },
  textStyle: {
    marginTop: 10,
  },
  buttontext: {
    color: '#fff',
  },
  dropDownView: {
    backgroundColor: '#8b9dc3',
    padding: 10,
  },
  dropDownText: {
    paddingTop: 2,
    color: '#fff',
  },
  nameTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 8,
    marginHorizontal: 16,
    display: 'flex',
    borderRadius: 4,
    flexDirection: 'column',
    backgroundColor: '#F9F9F9',
    padding: 10,
  },
  switchMain: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  switchTextView: {
    // width: width * 0.7
    width: '88%',
  },
  switchText: {
    color: '#c0c0c0',
    fontSize: RFValue(14, 580),
  },
  switchView: {
    // width: width * 0.2
  },
  testOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textSize: {
    fontSize: RFValue(12, 580),
    color: WHITE_COLOR,
  },
  nameAndTestPoint: {
    flex: 1,
  },
  dateAndTime: {
    flex: 1,
    alignItems: 'flex-end',
  },
  patientInfoR2: {
    flexDirection: 'row',
  },
  header: {
    flexDirection: 'row',
    height: height * 0.1,
    alignItems: 'center',
    paddingTop: '7%',
    width,
  },
  backIcon: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerTextView: {
    flex: 9,
    alignItems: 'center',
    paddingRight: width * 0.1,
  },
  headerText: {
    fontSize: RFValue(16, 580),
  },
  appoinmentDivBg: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    height:'88%',
    marginTop: '5%',
  },
  mainDivPad: {
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingTop:50,
  },
  infoContainerChild: {
    paddingTop: 30,
    borderWidth: 1,
    marginTop: 20,
    borderColor: '#f2f4f3',
    backgroundColor: '#ffffff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingLeft: 15,
    paddingRight: 15,
    height: '95%',
  },

  infoContainer: {},
  sectionContainer: {
    backgroundColor: Colors.black,
  },

  MainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F9F8',
  },

  patientInfo: {
    borderRadius: 10,
    backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    resizeMode: 'cover',
    overflow: 'hidden',
  },

  imagepatientInfo: {
    borderRadius: 10,
    padding: 10,
    display: 'flex',

    flexDirection: 'column',
    resizeMode: 'cover',
    overflow: 'hidden',
    paddingBottom: 15,
  },
  patientId: {
    marginVertical: 12,
    fontSize: RFValue(20, 580),
    color: WHITE_COLOR,
  },
  bottomBtnDiv: {
    position: 'absolute',
    width: '98%',
    left: '5%',
    bottom: '12%',
  },
  inputStyle1: {
    display: 'flex',

    backgroundColor: '#F9F9F9',
    borderRadius: 4,
    fontSize: RFValue(14, 580),
    color: '#1d1c1c',
    paddingLeft: '5%',
    paddingRight: '5%',
    height:60,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e0dfdf',
    justifyContent:'center'
  },
  btnStyle: {
    backgroundColor: GREEN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,

    height: '65%',

    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 8,
  },
  submitText: {
    color: WHITE_COLOR,
    fontSize: RFValue(14, 580),
  },
  scanAnotherQRcode: {
    fontSize: RFValue(14, 580),
    color: GREEN_COLOR,
    textAlign: 'center',
    marginTop: 5,
  },
});
