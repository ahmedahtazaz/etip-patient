import { GET_TEST_POINTS, SET_TEST_POINT } from "../../commons/Constants"


export const getTestPointsAction = (payload) => {
    return {
        type: GET_TEST_POINTS,
        payload
    }
}

export const setTestPointAction = (payload) => {
    return {
        type: SET_TEST_POINT,
        payload
    }
}