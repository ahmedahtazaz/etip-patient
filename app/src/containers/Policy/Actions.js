
import { GET_POLICY } from "../../commons/Constants";







export const getpolicy = (payload) => {
  return {
    type: GET_POLICY,
    payload
  };
};