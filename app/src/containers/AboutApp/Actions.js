
import { GET_ABOUT_APP } from "../../commons/Constants";


  export const GetABoutApp = (url) => {
    return {
      type: GET_ABOUT_APP,
      url
    };
  };