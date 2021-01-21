import { PASS_TO_NAME_PAGE } from '../actions/types/passbetweenTypes'
const initialState= {
    searchByName: false
}
export const passbetweenReducer = (state = initialState, action) => {
    switch (action.type) {
        case PASS_TO_NAME_PAGE:
            return {
                ...state,
                searchByName: !state.searchByName,
 
            }
        default:
            return state;
    }
}