import {GET_POLICY} from '../../commons/Constants';

export const getpolicyAction = payload => {
  return {
    type: GET_POLICY,
    payload,
  };
};
