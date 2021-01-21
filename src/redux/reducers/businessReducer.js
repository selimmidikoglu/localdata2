import { CATEGORIES_STATES_FAIL, CATEGORIES_STATES_LOADING, CATEGORIES_STATES_SUCCESS, CategoriesStatesType, SELECT_CATEGORY, AppActions, BUSINESSES_FAIL, BUSINESSES_LOADING, BUSINESSES_SUCCESS, SELECT_STATE, COUNTS_FAIL, COUNTS_LOADING, COUNTS_SUCCESS, CountsType, SET_MARKER_COORDINATES,
    MATCHED_CATEGORIES_FAIL, MATCHED_CATEGORIES_LOADING, MATCHED_CATEGORIES_SUCCESS,
   MATCHED_CITIES_FAIL, MATCHED_CITIES_LOADING, MATCHED_CITIES_SUCCESS, SET_PAGE_NUMBER,SET_CATEGORY_SEARCH_KEY , SET_CITY, SET_ZIPCODE,ADD_BUSINESSES,
   GET_ZIPCODES, SET_BUSINESS_NAME} from '../actions/types/businessActionTypes'
const initialState  = {
   loading: false,
   businessLoading: false,
   countsLoading: false,
   categoriesStates: null,
   stateInserted: "",
   categoryInserted: 0,
   categoryInsertedName: '',
   businesses: [],
   lastPage:1,
   currentPage:1,
   matchedCategories : [],
   matchedCategoriesLoading:false,
   matchedState: '',
   matchedStates: [],
   matchedCities: [],
   insertedCity: '',
   insertedZipcode: 0,
   insertedName:'',
   zipCodes: [],
   locationsLoading: false,
   lastID: 0,
   counts: {
       businessCount: 0,
       emailCount: 0,
       websiteCount: 0,
       faxCount: 0,
       reviewedCount: 0,
       facebookCount: 0,
       twitterCount: 0,
   },
   markerLat:0,
   markerLon:0,
   categorySearchKey : ""
}


export const businessReducer = (state = initialState, action) => {
   switch (action.type) {
       case CATEGORIES_STATES_LOADING:
           return {
               ...state,
               loading: true,

           }
       case CATEGORIES_STATES_FAIL:
           return {
               ...state,
               loading: false,
           }
       case CATEGORIES_STATES_SUCCESS:
           return {
               ...state,
               loading: false,
               categoriesStates: action.payload.categoriesStates,
           }
       case SELECT_CATEGORY:
           console.log("payload",action.payload)
           return {
               ...state,
               categoryInserted: action.payload.sic_code,
               categoryInsertedName: action.payload.category_name
           }
       case SELECT_STATE: {
           return {
               ...state,
               stateInserted : action.payload
           }
       }
       case BUSINESSES_LOADING:
           return {
               ...state,
               businessLoading: true
           }
       case BUSINESSES_FAIL:
           return {
               ...state,
               businessLoading: false
           }
       case BUSINESSES_SUCCESS:
           console.log(action.payload)
           return {
               ...state,
               businessLoading: false,
               businesses: action.payload,
               lastID: action.payload[action.payload.length-1].id
           }
       case COUNTS_FAIL:
           return{
               ...state,
               countsLoading:false
           }
       case COUNTS_LOADING:
           return{
               ...state,
               countsLoading:true
           }
       case COUNTS_SUCCESS:
           return{
               ...state,
               countsLoading: false,
               counts: Object.assign({},state.counts,{
                   businessCount: action.payload.businessCount,
                   emailCount: action.payload.emailCount,
                   facebookCount: action.payload.facebookCount,
                   twitterCount: action.payload.twitterCount,
                   websiteCount: action.payload.websiteCount,
                   reviewedCount: action.payload.reviewedCount,
                   faxCount: action.payload.faxCount
               })
           }
       case SET_MARKER_COORDINATES:
           return{
               ...state,
               markerLat:action.payload.lat,
               markerLon:action.payload.lon
           }
       case MATCHED_CATEGORIES_LOADING:
           return {
               ...state,
               matchedCategoriesLoading: true
           }
       case MATCHED_CATEGORIES_FAIL:
           return {
               ...state,
               matchedCategoriesLoading: false
           }
       case MATCHED_CATEGORIES_SUCCESS:
           return {
               ...state,
               matchedCategoriesLoading: false,
               matchedCategories: action.payload
           }
       case MATCHED_CITIES_LOADING:
           return {
               ...state,
               locationsLoading: true
           }
       case MATCHED_CITIES_FAIL:
           return {
               ...state,
               locationsLoading: false
           }
       case MATCHED_CITIES_SUCCESS:
           return {
               ...state,
               locationsLoading: false,
               matchedCities : action.payload.cities,
               //matchedStates : action.payload.matchedStates
           }
       case SET_PAGE_NUMBER:
           return {
               ...state,
               currentPage: action.payload
           }
       case SET_CATEGORY_SEARCH_KEY:
           return {
               ...state,
               categorySearchKey: action.payload
           }
       case SET_CITY:
           return{
               ...state,
               insertedCity: action.payload
           }
       case SET_ZIPCODE:
           return{
               ...state,
               insertedZipcode:action.payload
           }
       case GET_ZIPCODES:
           console.log("action payload", action.payload)
           return{
               ...state,
               zipCodes: action.payload,
           }
       case SET_BUSINESS_NAME:
           return {
               ...state,
               insertedName:action.payload
           }
        case ADD_BUSINESSES:
            {   
                console.log(action.payloads)
                return{
                    ...state,
                    businessLoading: false,
                    businesses: [...state.businesses,...action.payload],
                    lastID: action.payload[action.payload.length-1].id

                }
            }
       default:
           return state;
   }

}


