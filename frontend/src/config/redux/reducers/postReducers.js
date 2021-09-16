import {
    GET_USER_POSTS_FAIL,
    GET_USER_POSTS_REQUEST,
    GET_USER_POSTS_SUCCESS,
    GET_USER_POSTS_LIKES
} from '../constants'

const initialState = {
    loading: false,
    listUserPost: {},
    error: ''
}

export const listPostReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_POSTS_REQUEST:
            return { loading: true }
        case GET_USER_POSTS_SUCCESS:
            return { loading: false, listUserPost: action.payload }
        case GET_USER_POSTS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}