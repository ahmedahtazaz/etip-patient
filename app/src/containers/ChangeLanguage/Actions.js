
import { GET_LANG,GET_LANG_BY_LANG } from "../../commons/Constants";

export const LanguageChangeAction = text_code => {
     return {
      type: 'LANGUAGE_CHANGE',
      text_code,
    };
    
  };

 
export const GetLanguage = (payload) => {
  return {
    type: GET_LANG,
    payload
  };
};

export const GetLanguageByLang = (payload) => {
  return {
    type: GET_LANG_BY_LANG,
    payload
  };
};