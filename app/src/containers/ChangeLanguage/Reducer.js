const INITIAL_STATE = {
    textCode: 'en',
  
  };
  
export default function LanguageReducer() {
    return function reducer(state = INITIAL_STATE, action) {
        console.log(action);
        console.log('reducer');
      switch (action.type) {
        case 'LANGUAGE_CHANGE':
          return {
            ...state,
            textCode: action.payLoad,
            
          };
  
        default:
          return state;
      }
    };
  }
  