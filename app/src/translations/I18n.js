// import I18n from 'react-native-i18n';
// I18n.fallbacks = true;
// // const languageReducer = store.getState();
// // const language = languageReducer.LanguageReducer.langData;
// // const languageData = languageReducer.LanguageReducer.langData.keys;

// I18n.translations = {
//   // 'en': require('./en'),
//   // 'fr': require('./fr'),
// // [language.lang ]: language.keys
// };

class i18n {
  constructor(){}
   t = params => {
    return params;
  };
}

const I18n = new i18n();

export default I18n;