import { GET_PENDING_APPLICATIONS } from "../../commons/Constants"



export const getPendingApplicationsAction = (payload) => {
    return {
        type: GET_PENDING_APPLICATIONS,
        payload
    }
}