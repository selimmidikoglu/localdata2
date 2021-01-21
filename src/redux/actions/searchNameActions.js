import {BUSINESS_BY_NAME_LOADING,BUSINESS_BY_NAME_SUCCESS,BUSINESS_BY_NAME_FAIL, INCLUDED_LOCATIONS_FAIL,INCLUDED_LOCATIONS_LOADING,INCLUDED_LOCATIONS_SUCCESS,SET_BUSINESS_NAME,
GET_STATE_LIST, SET_LOCATION_STATE,SET_LOCATION_CITY,SET_LOCATION_ZIPCODE} from './types/searchNameActionTypes'
import axios from 'axios'
import { Dispatch } from 'redux'
import _ from 'lodash'
const url_api = 'https://vb.intenwin.com/api/'

export const SetNameAndGetData = (obj) => async (dispatch) => {
    try {
        console.log(obj)
        
        dispatch({
            type: BUSINESS_BY_NAME_LOADING
        })
        if("zipCode" in obj){
            dispatch({
                type:SET_LOCATION_ZIPCODE,
                payload: obj.zipCode
            })
        }
        
        console.log("zipi i geçti")
        if("city" in obj){
            if(obj.city == "")
                dispatch({
                    type:SET_LOCATION_CITY,
                    payload: ""
                })
            else
                dispatch({
                    type:SET_LOCATION_CITY,
                    payload: obj.city
                })
        }
        console.log("city i geçti")
        if("state" in obj ){
            await dispatch({
                type:SET_LOCATION_STATE,
                payload: obj.state
            })
        }
        console.log("state i geçti")
        dispatch({
            type: SET_BUSINESS_NAME,
            payload: obj.key
        })
       

        const res = await axios.post(url_api + 'getByName', obj)
        console.log(res.data)
        dispatch({
            type: BUSINESS_BY_NAME_SUCCESS,
            payload: res.data.businesses,

        })
    }
    catch (e) {
        dispatch({
            type: BUSINESS_BY_NAME_FAIL
        })
    }
}
export const SetNameGetLocations = (key) => async (dispatch) => {
    try {
        
        dispatch({
            type: INCLUDED_LOCATIONS_LOADING
        })
        
        const res = await axios.post(url_api + 'getLocationsInName', {key:key})
        console.log(res.data)
        dispatch({
            type: INCLUDED_LOCATIONS_SUCCESS,
            payload: res.data.locations,

        })
    }
    catch (e) {
        dispatch({
            type: INCLUDED_LOCATIONS_FAIL
        })
    }
}
export const GetStateList = () => async (dispatch) => {
    
        const res = await axios.get(url_api + 'getStateNames', )
        console.log(res.data)
        dispatch({
            type: GET_STATE_LIST,
            payload: res.data.stateObj,

        })
    
}
