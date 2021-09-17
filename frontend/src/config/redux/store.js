import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { 
    listPostReducer,
    listPostProfileReducer 
} from "./reducers/postReducers"
import {
    loginReducer,
    registerReducer,
    userDataReducer,
    userDataProfileReducer
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
    userProfile: userDataProfileReducer,
    userPostProfile: listPostProfileReducer
})
const store = createStore(
    reducer,
    // initialState,
    applyMiddleware(thunk)
);

export default store;