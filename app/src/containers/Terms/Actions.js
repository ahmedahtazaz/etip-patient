
import { GET_TERMS } from "../../commons/Constants";


export const getterms = (payload) => {
  return {
    type: GET_TERMS,
    payload
  };
};