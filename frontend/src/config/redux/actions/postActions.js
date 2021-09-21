import {
    GET_USER_POSTS_SUCCESS,
    GET_USER_POSTS_REQUEST,
    GET_USER_POSTS_FAIL,
    GET_USER_POSTS_PROFILE_SUCCESS,
    GET_USER_POSTS_PROFILE_REQUEST,
    GET_USER_POSTS_PROFILE_FAIL,
    GET_USER_FOLLOWING_REQUEST,
    GET_USER_FOLLOWING_FAIL,
    GET_USER_FOLLOWING_SUCCESS,
    GET_USER_FOLLOWING_LIKE_REQUEST,
    GET_USER_FOLLOWING_LIKE_FAIL,
} from '../constants'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { getUserProfile } from '../actions'

export const listPost = () => (dispatch) => {
    dispatch({ type: GET_USER_POSTS_REQUEST })
    try {
        firestore()
            .collection('posts')
            .doc(auth().currentUser.uid)
            .collection('userPosts')
            .orderBy('createAt', 'desc')
            .onSnapshot((snapshot) => {
                let getData = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                dispatch({ type: GET_USER_POSTS_SUCCESS, payload: getData })
            })
    } catch (error) {
        dispatch({ type: GET_USER_POSTS_FAIL, payload: error })
    }
}

export const fetchUserFollowing = () => async (dispatch) => {
    dispatch({ type: GET_USER_FOLLOWING_REQUEST })
    try {
        firestore()
            .collection('following')
            .doc(auth().currentUser.uid)
            .collection("userFollowing")
            .onSnapshot((snapshot) => {
                let data = snapshot.docs.map(doc => {
                    const id = doc.id;
                    return id
                })
                
                dispatch({ type: GET_USER_FOLLOWING_SUCCESS, payload: data });
                for (let i = 0; i < data.length; i++) {
                    dispatch(getUserProfile(data[i], true))
                }
            })
    } catch (error) {
        dispatch({ type: GET_USER_FOLLOWING_FAIL, payload: error })
    }
}

export const listPostProfile = (uid) => (dispatch) => {
    dispatch({ type: GET_USER_POSTS_PROFILE_REQUEST })
    try {
        firestore()
            .collectionGroup('userPosts')
            .where("uid", "==", uid)
            .orderBy('createAt', 'desc')
            .onSnapshot((snapshot) => {
                let getData = snapshot.docs.map(doc => {
                    const data = doc.data()
                    const id = doc.id
                    return { id, ...data }
                })
                // for(let i = 0; i < getData.length; i++){
                //     dispatch(fetchUserFollowingLikes(uid, getData[i].id))
                // }
                dispatch({ type: GET_USER_POSTS_PROFILE_SUCCESS, payload: getData })
            })    
    } catch (error) {
        dispatch({ type: GET_USER_POSTS_PROFILE_FAIL, payload: error })
    }
}

// export const fetchUserFollowingLikes(uid, postId) => async (dispatch) => {
//     dispatch({ type: GET_USER_FOLLOWING_LIKE_REQUEST })
//     try {
//         firestore()
//         .collection
//     } catch (error) {
//         dispatch({ type: GET_USER_FOLLOWING_LIKE_FAIL, payload: error })
//     }
// }