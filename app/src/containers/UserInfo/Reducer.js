import {
    ADD_FAMILY_MEMBER,
    ADD_FAMILY_MEMBER_FAILURE,
    ADD_FAMILY_MEMBER_SUCCES,
    EDIT_FAMILY_MEMBER,
    EDIT_FAMILY_MEMBER_FAILURE,
    EDIT_FAMILY_MEMBER_SUCCES,
    SIGNUP,
    SIGNUP_FAILURE,
    SIGNUP_SUCCES
} from '../../commons/Constants';

const INITIAL_STATE = {
    userInfo: {},
    familyMembers: [
        {
            "organizationName": "Systems Ltd",
            "familyId": "608cb93509f619708a009242",
            "firstName": "Asad",
            "lastName": "Shah",
            "gender": "male",
            "dateOfBirth": "2000-01-01",
            "mobileNumber": "+641111234445",
            "email": "asad.shah@systemsltd.com",
            "taxId": "TAX-1234567",
            "relation": "brother",
            "address": {
                "street": "E-4/12",
                "houseNo": "126",
                "city": "Munich",
                "zipCode": "25000"
            }
        },
    ],
    loader: false,
    errMessage: undefined,
};

export default function userInfoReducer() {
    return function reducer(state = INITIAL_STATE, action) {
        switch (action.type) {
            case SIGNUP:
                return {
                    ...state,
                    loader: true,
                    errMessage: undefined
                }

            case SIGNUP_SUCCES:
                return {
                    ...state,
                    loader: false,
                    userInfo: action.payload
                };

            case SIGNUP_FAILURE:
                return {
                    ...state,
                    loader: false,
                    errMessage: action.errMessage
                }

            case ADD_FAMILY_MEMBER:
                return {
                    ...state,
                    loader: true,
                    errMessage: undefined
                }

            case ADD_FAMILY_MEMBER_SUCCES:
                return {
                    ...state,
                    loader: false,
                    familyMembers: [...state.familyMembers, action.payload]
                }

            case ADD_FAMILY_MEMBER_FAILURE:
                return {
                    ...state,
                    loader: false,
                    errMessage: action.errMessage
                }


            case EDIT_FAMILY_MEMBER:
                return {
                    ...state,
                    loader: true
                }

            case EDIT_FAMILY_MEMBER_SUCCES:
                let index = familyMembers.find(member => member.email === action.payload.email);
                familyMembers[index] = action.payload;
                return {
                    ...state,
                    loader: false,
                    familyMembers
                }

            case EDIT_FAMILY_MEMBER_FAILURE:
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
