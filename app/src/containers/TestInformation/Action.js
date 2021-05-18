import { ISSUE_CERTIFICATE, RESET_CERTIFICATE_ISSUED } from "../../commons/Constants";

export const moveToMainScreenAction = navigation => {
  return navigation.replace('TestCenterInfo');
};


export const issueCertificateAction = (data) => {
  return {
    type: ISSUE_CERTIFICATE,
    payload: data
  }
}


export const resetIsCertificateIssuedAction = () => {
  return {
    type: RESET_CERTIFICATE_ISSUED
  }
}