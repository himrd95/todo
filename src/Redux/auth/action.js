import {
    CREATE_ACCOUNT_REQUEST,
    CREATE_ACCOUNT_SUCCESS,
    CREATE_ACCOUNT_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_AUTH,
    CREATE_ACCOUNT_AUTH,
    LOG_OUT, USER_DATA
} from "./actionTypes"
import axios from 'axios';
const create_account_request = () => {
    return {
        type: CREATE_ACCOUNT_REQUEST
    }
}
const create_account_success = (data) => {
    return {
        type: CREATE_ACCOUNT_SUCCESS,
        data:data
    }
}
const create_account_auth = (reg_auth) => {
    return {
        type: CREATE_ACCOUNT_AUTH,
        reg_auth:reg_auth
    }
}
const create_account_failure = () => {
    return {
        type: CREATE_ACCOUNT_FAILURE
    }
}

export { create_account_request, create_account_success, create_account_failure, create_account_auth };

export const create_account = (details) => async dispatch => {
    try {
        const res = await axios.post('https://masai-api-mocker.herokuapp.com/auth/register', {
            ...details
        });
        dispatch(create_account_success(res.data));
        dispatch(create_account_auth(true));
        return {
            success: true
        };
    } catch (err) {
        return dispatch(create_account_failure(err));
    }
}


const login_request = () => {
    return {
        type: LOGIN_REQUEST
    }
}
const login_auth = (auth) => {
    return {
        type: LOGIN_AUTH,
        auth
    }
}
const login_success = (token, username) => {
    return {
        type: LOGIN_SUCCESS,
        token,
        username
    }
}
const login_failure = () => {
    return {
        type: LOGIN_FAILURE
    }
}
const isLogOut = () => {
    return {
        type: LOG_OUT
    }
}
const userData = (userDetails) => {
    return {
        type: USER_DATA,
        userDetails
    }
}
export { login_request, login_success, login_failure, login_auth, isLogOut, userData };

export const login = (username, password) => async dispatch => {
    try {
        const res = await axios.post('https://masai-api-mocker.herokuapp.com/auth/login', {
            password,
            username
        });
        dispatch(login_success(res.data, username));
        dispatch(login_auth(true));
        return {
            success: true
        };
    } catch (err) {
        return alert("Username or password is wrong");
    }
}

export const getUserData = (username, token) => async dispatch => {
    try {
        const res = await axios.get(
            `https://masai-api-mocker.herokuapp.com/user/${username}`, {
            headers: {
                Accept: `application/json`,
                Authorization: `Bearer ${token}`
            }
        })
        dispatch(userData(res.data))
    }
    catch(err) {
        console.log(err)
    }
}