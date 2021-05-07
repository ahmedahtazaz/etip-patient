import {RESET_EMAIL_UPDATED} from '../../commons/Constants';

export const resetEmailUpdatedAction = status => {
  return {
    type: RESET_EMAIL_UPDATED,
    status,
  };
};
