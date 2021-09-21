import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGOUT_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    GET_USER_DATA_REQUEST,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_FAIL,
    GET_USER_PROFILE_REQUEST,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAIL,
    FOREIGN_USER_PROFILE_REQUEST,
    FOREIGN_USER_PROFILE_SUCCESS,
    FOREIGN_USER_PROFILE_FAIL,
    FOREIGN_POST_PROFILE_SUCCESS
} from '../constants'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { listPostProfile } from '../actions'

export const login = (email, password) => async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST });
    let error;
    try {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                let data = {
                    email: email,
                    password: password
                }
                dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
                AsyncStorage.setItem('UserData', JSON.stringify(data))
            })
            .catch((err => {
                switch (err.code) {
                    case 'auth/invalid-email':
                        error += 'Email address is not valid'
                        dispatch({ type: USER_LOGIN_FAIL, payload: error })
                        break;
                    case 'auth/user-disabled':
                        error += 'Email has been disabled'
                        dispatch({ type: USER_LOGIN_FAIL, payload: error })
                        break;
                    case 'auth/user-not-found':
                        error += 'User not found'
                        dispatch({ type: USER_LOGIN_FAIL, payload: error })
                        break;
                    case 'auth/wrong-password':
                        error += 'Password is invalid, try again'
                        dispatch({ type: USER_LOGIN_FAIL, payload: error })
                        break;
                    default:
                        null
                }
            }))
    } catch (error) {
        console.log(error)
    }
}

export const register = (name, username, email, password) => (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST })
    let error;
    try {
        auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            let data = {
                name: name,
                username: username,
                email: email,
                password: password,
                bio: null
            }
            firestore()
            .collection('user')
            .doc(auth().currentUser.uid)
            .set({
                name,
                username,
                email,
                password
            })
                dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
            })
            .catch(err => {
                switch (err.code) {
                    case 'auth/email-already-in-use':
                        error += 'That email address is already in use!'
                        dispatch({ type: USER_REGISTER_FAIL, payload: error })
                        break;
                    case 'auth/invalid-email':
                        error += 'That email address is invalid!'
                        dispatch({ type: USER_REGISTER_FAIL, payload: error })
                        break;
                    default:
                        null
                }
            })
    } catch (error) {
        console.log(error)
    }
}

export const getUser = () => (dispatch) => {
    dispatch({ type: GET_USER_DATA_REQUEST })
    try {
       firestore()
       .collection('user')
       .doc(auth().currentUser.uid)
       .onSnapshot(snapshot => {
           if(snapshot.exists) {
            dispatch({ type: GET_USER_DATA_SUCCESS, payload: snapshot.data()})
           } else {
              console.log('user doest exists')
           }
       })    
    } catch (error) {
        dispatch({ type: GET_USER_DATA_FAIL, payload: error })
    }
}

export const getUserProfile = (uid, getPosts) => (dispatch, getState) => {
    dispatch({ type: GET_USER_PROFILE_REQUEST })
    try {
        firestore()
        .collection('user')
        .doc(uid)
        .onSnapshot(snapshot => {
            if(snapshot.exists) {
             let user = snapshot.data()
             user.id = snapshot.id
             dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: user})
            } else {
               console.log('user doest exists')
            }
        })  
        if(getPosts){
            dispatch(listPostProfile(uid))
        }  
     } catch (error) {
         dispatch({ type: GET_USER_PROFILE_FAIL, payload: error })
     }
}


export const logout = () => (dispatch) => {
    try {
        auth()
            .signOut()
            .then(() => {
                let alert = 'User signed out!'
                dispatch({ type: USER_LOGOUT_SUCCESS, payload: alert })
                AsyncStorage.removeItem('user')
            })

    } catch (error) {
        console.log(error)
    }
}