import axios from 'axios'
import { Dispatch } from 'redux'
import {
    BUSINESSES_LOADING, BUSINESSES_FAIL, BUSINESSES_SUCCESS, CATEGORIES_STATES_FAIL, CATEGORIES_STATES_SUCCESS, CATEGORIES_STATES_LOADING, SELECT_CATEGORY, SELECT_STATE, AppActions, AllFiltersType, COUNTS_LOADING, COUNTS_SUCCESS, COUNTS_FAIL, SET_MARKER_COORDINATES
    , MATCHED_CATEGORIES_FAIL, MATCHED_CATEGORIES_LOADING, MATCHED_CATEGORIES_SUCCESS,
    MATCHED_CITIES_FAIL, MATCHED_CITIES_LOADING, MATCHED_CITIES_SUCCESS, SET_PAGE_NUMBER, SET_CATEGORY_SEARCH_KEY, SET_CITY, SET_ZIPCODE,
    GET_ZIPCODES,SET_BUSINESS_NAME, ADD_BUSINESSES
} from './types/businessActionTypes'
import { DefaultStateI } from '../reducers/businessReducer'
// const url_api = 'http://localdata-api.ak7bxnvrmf-ez94d2q283mr.p.runcloud.link/'
const url_api = 'https://vb.intenwin.com/api/'
export const GetCategoriesAndStates = () => async (dispatch) => {
    try {
        dispatch({
            type: CATEGORIES_STATES_LOADING
        })
        const res = await axios.get(url_api + 'a')
        let categoriesSelected = res.data.categories.map(() => false)
        let statesSelected = res.data.states.map(() => false)
        dispatch({
            type: CATEGORIES_STATES_SUCCESS,
            payload: {
                categoriesStates: res.data,
            }
        })
    }
    catch (e) {
        dispatch({
            type: CATEGORIES_STATES_FAIL
        })
    }
}
export const GetBusinesses = (filterObj) => async (dispatch) => {
    try {
        dispatch({
            type: BUSINESSES_LOADING
        })
        const res = await axios.post(url_api + 'businessPartial', filterObj)
        console.log("res", res.data)
        dispatch({
            type: BUSINESSES_SUCCESS,
            payload: {
                businesses: res.data.businesses,
            }
        })
    }
    catch (e) {
        dispatch({
            type: BUSINESSES_FAIL
        })
    }
}
export const SelectCategoryAndFetch = (filterObj, categoryInserted) => async (dispatch) => {
    
    try {
        dispatch({
            type: BUSINESSES_LOADING
        })
        // dispatch({
        //     type: COUNTS_LOADING
        // })
        dispatch({
            type: SELECT_CATEGORY,
            payload: {
                sic_code: categoryInserted.sic_code,
                category_name: categoryInserted.category_name
            }
        })

        const res = await axios.post(url_api + 'businessPartial', filterObj)
        console.log(res)
        dispatch({
            type: BUSINESSES_SUCCESS,
            payload: res.data.businesses,
        })
        // try {

        //     const res = await axios.post(url_api + 'businessCounts', filterObj)
        //     console.log(res.data)
        //     dispatch({
        //         type: COUNTS_SUCCESS,
        //         payload: {
        //             businessCount: res.data.count,
        //             emailCount: res.data.countEmail,
        //             facebookCount: res.data.countFacebook,
        //             twitterCount: res.data.countTwitter,
        //             websiteCount: res.data.countWebsite,
        //             reviewedCount: res.data.countReviews,
        //             faxCount: res.data.countFax
        //         }
        //     })
        // }
        // catch (e) {
        //     dispatch({
        //         type: COUNTS_FAIL
        //     })
        // }
    }
    catch (e) {
        dispatch({
            type: BUSINESSES_FAIL
        })
    }
}
export const SelectStateAndFetch = (filterObj, stateInserted) => async (dispatch) => {

    try {
        dispatch({
            type: BUSINESSES_LOADING
        })
        // dispatch({
        //     type: COUNTS_LOADING
        // })
        dispatch({
            type: SELECT_STATE,
            payload: stateInserted
        })

        const res = await axios.post(url_api + 'businessPartial', filterObj)
        dispatch({
            type: BUSINESSES_SUCCESS,
            payload: res.data.businesses,

        })
        // try {

        //     const res = await axios.post(url_api + 'businessCounts', filterObj)
        //     console.log(res.data)
        //     dispatch({
        //         type: COUNTS_SUCCESS,
        //         payload: {
        //             businessCount: res.data.count,
        //             emailCount: res.data.countEmail,
        //             facebookCount: res.data.countFacebook,
        //             twitterCount: res.data.countTwitter,
        //             websiteCount: res.data.countWebsite,
        //             reviewedCount: res.data.countReviews,
        //             faxCount: res.data.countFax
        //         }
        //     })
        // }
        // catch (e) {
        //     dispatch({
        //         type: COUNTS_FAIL
        //     })
        // }
    }
    catch (e) {
        dispatch({
            type: BUSINESSES_FAIL
        })
    }
}
export const SetMarkerCoordinates = (lat, lon) => {
    return {
        type: SET_MARKER_COORDINATES,
        payload: {
            lat: lat,
            lon: lon
        }
    }
}

export const SetCategoryKeyAndGet = (key) => async (dispatch) => {
    if (key.length <= 1) {
        dispatch({
            type: MATCHED_CATEGORIES_SUCCESS,
            payload: []
        })
        return;
    }
    try {
        dispatch({
            type: MATCHED_CATEGORIES_LOADING
        })
        dispatch({
            type: SET_CATEGORY_SEARCH_KEY,
            payload: key
        })
        console.log("Bekliyor")
        const res = await axios.get(url_api + 'getMatchCategories' + "?searchKey=" + key)
        console.log(res.data)
        dispatch({
            type: MATCHED_CATEGORIES_SUCCESS,
            payload: res.data.categories
        })

    }
    catch (e) {
        dispatch({
            type: MATCHED_CATEGORIES_FAIL
        })
    }
    //    }
}

export const SetStateAndGetCities = (key) => async (dispatch) => {


    try {
        dispatch({
            type: MATCHED_CITIES_LOADING
        })
        const res = await axios.post(url_api + 'getOnlyCities', { state: key })
        console.log(res.data)
        dispatch({
            type: MATCHED_CITIES_SUCCESS,
            payload: res.data
        })

    }
    catch (e) {
        dispatch({
            type: MATCHED_CITIES_FAIL
        })
    }

}

export const SetPageNumber = page => async (dispatch) => {
    dispatch({
        type: SET_PAGE_NUMBER,
        payload: page
    })
}

export const SetCityAndFetch = (filterObj, cityInserted) => async (dispatch) => {
    try {
        dispatch({
            type: BUSINESSES_LOADING
        })
        dispatch({
            type: SET_CITY,
            payload: cityInserted
        })

        
        
        let res = await axios.post(url_api + 'getOnlyBusinessZipcodes', filterObj)
        console.log("zipcode response",res.data)
        dispatch({
            type:GET_ZIPCODES,
            payload: res.data.zipCodes
        })
        res = await axios.post(url_api + 'businessPartial', filterObj)
        console.log("second res",res.data)
        dispatch({
            type: BUSINESSES_SUCCESS,
            payload: res.data.businesses,

        })
        
        
    }
    catch (e) {
        dispatch({
            type: BUSINESSES_FAIL
        })
    }




}
export const SetZipcodeAndFetch = (filterObj, zipCodeInserted) => async (dispatch) => {
    try {
        dispatch({
            type: BUSINESSES_LOADING
        })
        dispatch({
            type: SET_ZIPCODE,
            payload: zipCodeInserted
        })

        const res = await axios.post(url_api + 'businessPartial', filterObj)
        console.log(res.data)
        dispatch({
            type: BUSINESSES_SUCCESS,
            payload: res.data.businesses,

        })
    }
    catch (e) {
        dispatch({
            type: BUSINESSES_FAIL
        })
    }




}

export const SetNameAndFetch = (key) => async (dispatch) => {
    try {
        dispatch({
            type: BUSINESSES_LOADING
        })
        dispatch({
            type: SET_BUSINESS_NAME,
            payload: key
        })

        const res = await axios.post(url_api + 'getByName', {key:key})
        console.log(res.data)
        dispatch({
            type: BUSINESSES_SUCCESS,
            payload: res.data.businesses,

        })
    }
    catch (e) {
        dispatch({
            type: BUSINESSES_FAIL
        })
    }




}

export const GetNextData = (filterObj) => async(dispatch) => {
    try {
        dispatch({
            type: BUSINESSES_LOADING
        })

        const res = await axios.post(url_api + 'businessPartial', filterObj)
        console.log(res.data)
        dispatch({
            type: ADD_BUSINESSES,
            payload: res.data.businesses,

        })
    }
    catch (e) {
        dispatch({
            type: BUSINESSES_FAIL
        })
    }

}