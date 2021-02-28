import {
    CREATE_ACCOUNT_FAILURE,
    CREATE_ACCOUNT_REQUEST,
    CREATE_ACCOUNT_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOG_OUT,
    USER_DATA
} from "./actionTypes"
import { loadData, saveData } from "../../Utils"


const utils = loadData("todoAdvance")
if (utils === null) {
    const tokenUpdated = {auth: false, token: "", username: ""};
    saveData("todoAdvance", tokenUpdated)
}
// console.log(aut)

const initState = {
    message: "",
    token: loadData("todoAdvance").token||"",
    username: loadData("todoAdvance").username||'',
    isError: false,
    isLoading: false,
    regAuth: false,
    auth: loadData("todoAdvance").loggedIn || false,
    userData: []
}
const register_reducer = (state = initState, { type, data, token, username, userDetails}) => {
    switch (type) {
        case CREATE_ACCOUNT_REQUEST:
            return {
                ...state,
                isError: false,
                isLoading: true
            }
        case CREATE_ACCOUNT_SUCCESS:
            
            return {
                ...state,
                message: data.message,
                regAuth: true,
                isError: false,
                isLoading: false
            }
        case CREATE_ACCOUNT_FAILURE:
            return {
                ...state,
                isError: data,
                isLoading: false
            }
        
// Login
        case LOGIN_REQUEST:
            return {
                ...state,
                isError: false,
                isLoading: true
            }
        case LOGIN_SUCCESS:
            {
                const tokenUpdated = {loggedIn : true,token: token.token, username: username};
                saveData("todoAdvance", tokenUpdated)
            return {
                ...state,
                token: tokenUpdated.token,
                username: tokenUpdated.username,
                auth: tokenUpdated.loggedIn,
                isError: false,
                isLoading: false
            }}
        case LOGIN_FAILURE:
            return {
                ...state,
                isError: data,
                isLoading: false
            }
        case LOG_OUT:
            {const tokenUpdated = {loggedIn : false,token: '', username: ''};
            saveData("todoAdvance", tokenUpdated)
            return {
                ...state,
                auth: tokenUpdated.loggedIn,
                isError: false,
                isLoading: false
            }}
        case USER_DATA:
            return {
                ...state,
                userData: userDetails,
                isError: data,
                isLoading: false
            }
        default: return state
    }
} 
export {register_reducer}