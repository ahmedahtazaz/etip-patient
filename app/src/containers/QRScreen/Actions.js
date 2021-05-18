import {
    GET_START_APPLICATION,
    RESET_IS_APPLICATION_STARTED
} from "../../commons/Constants"


export const getStartApplicationAction = (payload) => {
    return {
        type: GET_START_APPLICATION,
        payload
    }
}


export const resetIsApplicationStartedAction = () => {
    return {
        type: RESET_IS_APPLICATION_STARTED,
    }
}