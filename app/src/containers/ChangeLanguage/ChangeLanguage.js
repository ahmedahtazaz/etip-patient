import React, { useEffect,useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, Text, ScrollView, View } from 'react-native';
import { exp } from 'react-native-reanimated';
import I18n from '../../translations/I18n';
import {connect} from 'react-redux';
import {LanguageChangeAction} from './Actions';



// Enable fallbacks if you want `en-US`
// and `en-GB` to fallback to `en`
const language = [
      {lang: "English", code: "en"},
      {lang: "German", code: "fr"},
     
    ]

function ChangeLanguage({LanguageChangeAction}) {
    const [languages, setlanguages] = useState([]);
    const [value, setvalue] = useState(false);
    const [select, setselect] = useState('Select Language');
    const [langValue, setlangValue] = useState('en');


  useEffect(() => {
       I18n.locale = "en";

  }, []);


  const onSelectLanguage=()=> {
    return(
      language.map((data, i)=>{
        return (
           <View key={i} style={styles.dropDownView}>
             <TouchableOpacity onPress={()=>onSelectedLang(data)}>
               <Text style={styles.dropDownText}>{data.lang}</Text>
             </TouchableOpacity>
           </View>
        )
      })
    )
  }

  const onSelectedLang=(text)=> {
  
    setvalue(false);

    setselect(text.lang);
        I18n.locale = text.code;
        LanguageChangeAction(text.code);
  }
     
  const onLanguage=()=> {
          setvalue(true);
        
      }
      

  
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.block}>
            <Text style={styles.title}>Change Langauge</Text>
            <Text style={styles.textStyle}>{I18n.t('hello world')}</Text>
            <Text style={styles.textStyle}>{I18n.t('thank you')}</Text>
            <Text style={styles.textStyle}>{I18n.t('Bye')}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={onLanguage}>
              <View style={styles.buttonView}>
                <Text style={styles.buttontext}>{select}</Text>
              </View>
           </TouchableOpacity>
           <View>
            {(value) ? onSelectLanguage() : null}
           </View>
        </View>
     </View>
    </View>
   );
  }

  
const mapDispatchToProps = dispatch => {
    return {
        LanguageChangeAction: lang =>dispatch( LanguageChangeAction(lang)),
    };
  };
  
  const mapStateToProps = state => {
    return {};
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ChangeLanguage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 24,
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
  }
});