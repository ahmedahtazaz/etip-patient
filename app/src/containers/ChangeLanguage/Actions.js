
import { GET_LANG } from "../../commons/Constants";

export const LanguageChangeAction = text_code => {
     return {
      type: 'LANGUAGE_CHANGE',
      text_code,
    };
    
  };

  export const GetLanguage = (url) => {
    return {
      type: GET_LANG,
      url
    };
  };