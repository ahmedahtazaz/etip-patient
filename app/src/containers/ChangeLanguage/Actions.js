export const LanguageChangeAction = text_code => {
    console.log("actions");
    console.log(text_code);
    return {
      type: 'LANGUAGE_CHANGE',
      text_code,
    };
  };