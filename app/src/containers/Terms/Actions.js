
import { GET_TERMS } from "../../commons/Constants";


export const Getterms = (url) => {
  return {
    type: GET_TERMS,
    url
  };
};