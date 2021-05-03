
import { GET_ABOUT_APP } from "../../commons/Constants";


  export const getAbout = (url) => {
    return {
      type: GET_ABOUT_APP,
      url
    };
  };