import {
    BUSINESS_BY_NAME_LOADING, BUSINESS_BY_NAME_SUCCESS, BUSINESS_BY_NAME_FAIL, INCLUDED_LOCATIONS_FAIL, INCLUDED_LOCATIONS_LOADING, INCLUDED_LOCATIONS_SUCCESS,
    SET_BUSINESS_NAME, GET_STATE_LIST, SET_LOCATION_STATE, SET_LOCATION_CITY, SET_LOCATION_ZIPCODE
} from '../actions/types/searchNameActionTypes'
const initialState = {
    businessesLoading: false,
    locationsLoading: false,
    businesses: [],
    business_name: "",
    locations: {},
    insertedState: "",
    insertedCity: "",
    insertedZipCode: 0,
    stateList: {}
}
const url_api = 'https://vb.intenwin.com/api/'


export const searchNameReducer = (state = initialState, action) => {
    switch (action.type) {
        case BUSINESS_BY_NAME_LOADING:
            return {
                ...state,
                businessesLoading: true,

            }
        case BUSINESS_BY_NAME_FAIL:
            return {
                ...state,
                businessesLoading: false,
            }
        case BUSINESS_BY_NAME_SUCCESS:
            return {
                ...state,
                businessesLoading: false,
                businesses: action.payload,
            }
        case SET_BUSINESS_NAME:
            return {
                ...state,
                business_name: action.payload
            }
        case INCLUDED_LOCATIONS_LOADING:
            return {
                ...state,
                locationsLoading: false,
            }
        case INCLUDED_LOCATIONS_FAIL:
            return {
                ...state,
                locationsLoading: false,
            }
        case INCLUDED_LOCATIONS_SUCCESS:
            return {
                ...state,
                locationsLoading: false,
                locations: Object.assign({}, action.payload),
            }
        case GET_STATE_LIST:
            return {
                ...state,
                stateList: Object.assign({}, action.payload)
            }
        case SET_LOCATION_STATE:
            return {
                ...state,
                insertedState: action.payload
            }
        case SET_LOCATION_CITY:
            return {
                ...state,
                insertedCity: action.payload
            }
        case SET_LOCATION_ZIPCODE:
            return {
                ...state,
                insertedZipCode: action.payload
            }
        default:
            return state;
    }

}


