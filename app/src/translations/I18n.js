import I18n from 'react-native-i18n';
import store from '../../store'
I18n.fallbacks = true;
console.log('state--------------------------');
// const languageReducer = store.getState();
// const language = languageReducer.LanguageReducer.langData;
// const languageData = languageReducer.LanguageReducer.langData.keys;

I18n.translations = {
  // 'en': require('./en'),
  // 'fr': require('./fr'),
 [language.lang ]: language.keys
};




const translate = I18n
export default I18n
