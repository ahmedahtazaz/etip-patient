import { GET_TEST_CENTERS } from "../../commons/Constants";

export const GETTestCenters = (payload) => {
    return {
      type: GET_TEST_CENTERS,
      payload
    };
  };