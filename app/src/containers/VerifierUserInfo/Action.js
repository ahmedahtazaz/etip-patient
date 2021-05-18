import { CREATE_USRE, RESET_IS_USER_CREATED } from "../../commons/Constants"

export const createUserAction = (data) => {
    return {
        type: CREATE_USRE,
        payload: data
    }
}

export const resetIsUserCreatedAction = () => {
    return {
        type: RESET_IS_USER_CREATED
    }
}