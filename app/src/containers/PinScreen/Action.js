import { VERIFY_PIN } from "../../commons/Constants";


export const verifyPinAction = (payload) => {
    return {
        type: VERIFY_PIN,
        payload
    }
}