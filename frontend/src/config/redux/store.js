import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { listPostReducer } from "./reducers/postReducers"
import {
    loginReducer,
    registerReducer,
    userDataReducer
} from "./reducers/userReducers"

// const initialState = {
//     userLogin: {
//         user: AsyncStorage.getItem('UserData')
//         ? JSON.parse(AsyncStorage.getItem("UserData"))
//         : null
//     }
// }

const reducer = combineReducers({
    userLogin: loginReducer,
    userRegister: registerReducer,
    userListPost: listPostReducer,
    userData: userDataReducer,
})
const store = createStore(
    reducer,
    // initialState,
    applyMiddleware(thunk)
);

export default store;