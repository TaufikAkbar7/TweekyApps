import {
    GET_USER_POSTS_SUCCESS,
    GET_USER_POSTS_REQUEST,
    GET_USER_POSTS_FAIL,
    GET_USER_POSTS_LIKES
} from '../constants'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

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