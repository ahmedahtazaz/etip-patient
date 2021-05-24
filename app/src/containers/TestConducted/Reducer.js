import { GET_CONDUCTED_TESTS, GET_CONDUCTED_TESTS_FAILURE, GET_CONDUCTED_TESTS_SUCCESS, GET_TEST_POINTS, GET_TEST_POINTS_FAILURE, GET_TEST_POINTS_SUCCESS, SET_TEST_POINT } from '../../commons/Constants';

const INITIAL_STATE = {
    conductedTests: [],
    loader: false,
    errMessage: undefined,
};

export default function testConductedReducer() {
    return function reducer(state = INITIAL_STATE, action) {
        switch (action.type) {
            case GET_CONDUCTED_TESTS:
                return {
                    ...state,
                    loader: true,
                    errMessage: undefined
                }

            case GET_CONDUCTED_TESTS_SUCCESS:
                return {
                    ...state,
                    loader: false,
                    conductedTests: action.payload,
                    errMessage: undefined
                }

            case GET_CONDUCTED_TESTS_FAILURE:
                return {
                    ...state,
                    loader: false,
                    errMessage: action.errMessage
                }

            default:
                return state;
        }
    };
}
