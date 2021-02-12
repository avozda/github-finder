import { SEARCH_USERS, SET_LOADING, SET_ALERT, GET_REPOS, GET_USER, CLEAR_USERS } from "../types"

const Reducer = (state, action) => {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                user:action.payload,
                loading:false
            }
       case CLEAR_USERS:
           return{
            ...state,
            users:[],
            loading:false
           }
        case SEARCH_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case SET_LOADING:
            return {...state, loading: true }
        default:
            return state;
    }
}

export default Reducer