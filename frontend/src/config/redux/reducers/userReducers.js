import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    GET_USER_DATA_REQUEST,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_FAIL,
    GET_USER_PROFILE_REQUEST,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAIL,
} from '../constants'

const initialState = {
    loading: false,
    user: {},
    error: ''
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_DATA_REQUEST:
            return { loading: true }
        case GET_USER_DATA_SUCCESS:
            return { loading: false, user: action.payload }
        case GET_USER_DATA_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userDataProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_PROFILE_REQUEST:
            return { loading: true }
        case GET_USER_PROFILE_SUCCESS:
            return { loading: false, user: action.payload }
        case GET_USER_PROFILE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}