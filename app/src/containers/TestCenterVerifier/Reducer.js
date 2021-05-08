import { GET_TEST_POINTS, GET_TEST_POINTS_FAILURE, GET_TEST_POINTS_SUCCESS, SET_TEST_POINT } from '../../commons/Constants';

const INITIAL_STATE = {
    testPoints: [],
    loader: false,
    errMessage: undefined,
    selectedTestPoint: null
};

export default function testCenterVerifierReducer() {
    return function reducer(state = INITIAL_STATE, action) {
        switch (action.type) {
            case GET_TEST_POINTS:
                return {
                    ...state,
                    loader: true,
                    errMessage: undefined
                }

            case GET_TEST_POINTS_SUCCESS:
                return {
                    ...state,
                    loader: false,
                    testPoints: action.payload,
                    errMessage: undefined
                }

            case GET_TEST_POINTS_FAILURE:
                return {
                    ...state,
                    loader: false,
                    errMessage: action.errMessage
                }

            case SET_TEST_POINT:
                return {
                    ...state,
                    selectedTestPoint: action.payload
                }

            default:
                return state;
        }
    };
}
