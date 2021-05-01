
import { GET_POLICY } from "../../commons/Constants";


export const getPolicy = (url) => {
  return {
    type: GET_POLICY,
    url
  };
};