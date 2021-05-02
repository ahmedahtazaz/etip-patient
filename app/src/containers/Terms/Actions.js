
import { GET_TERMS } from "../../commons/Constants";


export const getterms = url => {
  return {
    type: GET_TERMS,
    url
  };
};