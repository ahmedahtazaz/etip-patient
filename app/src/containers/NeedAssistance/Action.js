import { GET_NEED_ASSISTANCE} from '../../commons/Constants';

export const getNeedAssistanceAction = payload => {
  return {
    type: GET_NEED_ASSISTANCE,
    payload,
  };
};
