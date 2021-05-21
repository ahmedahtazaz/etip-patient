import { GET_CONDUCTED_TESTS } from "../../commons/Constants"


export const getConductedTestsAction = (data) => {
    return {
        type: GET_CONDUCTED_TESTS,
        payload: data
    }
}