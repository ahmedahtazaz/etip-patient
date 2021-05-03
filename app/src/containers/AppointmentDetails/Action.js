import { GET_PROFILE } from "../../commons/Constants"

export const getProfileInfoAction = (data) => {
    return {
        type: GET_PROFILE,
        payload: data
    }
}