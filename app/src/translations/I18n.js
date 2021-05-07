// import I18n from 'react-native-i18n';
// import { store } from '../../App';
// I18n.fallbacks = true;
// // const languageReducer = store.getState();
// const state = store.getState();
// const data = state.welcomeReducer.defaultLangData;

// console.log('data.lang:: ', data.lang, ' data.keys::: ', data.keys);

// I18n.translations = {
//   [data.lang]: data.keys
// };



class i18n {
  constructor() { }
  t = params => {
    return params;
  };
}

const I18n = new i18n();

export default I18n;
