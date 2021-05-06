import {GET_ABOUT_APP} from '../../commons/Constants';

export const getAboutAction = payload => {
  return {
    type: GET_ABOUT_APP,
    payload,
  };
};
