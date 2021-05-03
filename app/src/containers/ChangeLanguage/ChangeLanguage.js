import React, { useEffect, useState } from 'react';
import {
  Platform, StyleSheet, TouchableOpacity, Text, ScrollView, View, SafeAreaView, FlatList, Checkbox, Dimensions,
  Image
} from 'react-native';
import { exp } from 'react-native-reanimated';
import I18n from '../../translations/I18n';

import { connect } from 'react-redux';
import { LanguageChangeAction, GetLanguage,GetLanguageByLang } from './Actions';
import { get_lang_by_lang_url, get_lang_url } from '../../commons/environment';

import { BLACK_COLOR, GREEN_COLOR, WHITE_COLOR } from '../../theme/Colors';
const { width, height } = Dimensions.get('window');

import AsyncStorage from '@react-native-community/async-storage'

import { Colors } from 'react-native/Libraries/NewAppScreen';
import Orientation from 'react-native-orientation-locker';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { STORAGE_KEY } from '../../commons/Constants';


// Enable fallbacks if you want `en-US`
// and `en-GB` to fallback to `en`
const language = [
  { lang: "English", code: "en" },
  { lang: "German", code: "fr" },

]

function ChangeLanguage({ LanguageChangeAction, GetLanguage, navigation, initLoaded ,GetLanguageByLang,langData}) {
  const [languages, setlanguages] = useState([]);
  const [languages2, setlanguages2] = useState([]);

  const [value, setvalue] = useState(false);
  const [select, setselect] = useState('Select Language');
  const [langValue, setlangValue] = useState('en');
  const [checked, setChecked] = React.useState(false);
  const [result, setResult] = useState('false');
  const [selectedIndex, setSelectedIndex] = useState([]);

  const [selectedlang, setSelectedLang] = useState(null);

  useEffect(() => {
    // I18n.locale = "en";
    // i18n.defaultLocale = "en";
    GetLanguage(get_lang_url);
    setlanguages(initLoaded);
  
  }, []);
 


  const onSelectLanguage = () => {
    return (
      language.map((data, i) => {
        return (
          <View key={i} style={styles.dropDownView}>
            <TouchableOpacity onPress={() => onSelectedLang(data)}>
              <Text style={styles.dropDownText}>{data._id}</Text>
            </TouchableOpacity>
          </View>
        )
      })
    )
  }
  const saveData = async (data) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, data)
    } catch (e) {
    }
  }

  const onSelectedLang = (text) => {

    setvalue(false);

    setselect(text.lang);
    // I18n.locale = text.code;
    LanguageChangeAction(text.code);
  }

  const onLanguage = () => {
    setvalue(true);

  }
  const englishClick = (item) => {
    item.status = 'false';
    // I18n.locale = '';

    // I18n.locale = item.lang;
    setSelectedLang(item.lang);
    saveData(item.lang);
    GetLanguageByLang(get_lang_by_lang_url+item.lang);
  //  init();
   
  }

  const renderItem = ({ item }) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.inputStyle1}
          onPress={()=>englishClick(item)}>
          <View style={styles.testOption}>
            <Text>{item.description}</Text>
            {item.status === 'true' && (
              <Ionicons
                name="checkmark-circle"
                color={GREEN_COLOR}
                size={15}
              />
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
            <EvilIcons name="chevron-left" color="#000" size={30} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.headerText}>Change Language</Text>
        </View>
      </View>

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
    backgroundColor: 'white',
  },
  imageThumbnail: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  subContainer: {
    flexDirection: "row",
  },
  mainTitle: {
    color: "#3b5998",
    fontSize: 30,
    marginBottom: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  buttonView: {
    backgroundColor: "#3b5998",
    padding: 10,
  },
  block: {
    width: 230,
  },
  textStyle: {
    marginTop: 10,
  },
  buttontext: {
    color: "#fff",
  },
  dropDownView: {
    backgroundColor: "#8b9dc3",
    padding: 10,
  },
  dropDownText: {
    paddingTop: 2,
    color: "#fff",
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
    height: '11%',
    paddingTop: 30,
    alignItems: 'center',
    width,
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
    height: '95%'
  },
  backIcon: {
    marginHorizontal: 5,
    width: width * 0.1,
  },
  headerText: {
    fontSize: RFValue(16, 580),
    width: width * 0.8,
    textAlign: 'center',
  },
  infoContainer: {

  },
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
    bottom: '12%'

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
    borderColor: '#e0dfdf',
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