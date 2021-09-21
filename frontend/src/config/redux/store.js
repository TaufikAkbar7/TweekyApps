import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { 
    listPostReducer,
    listPostProfileReducer,
    userFollowingReducer
} from "./reducers/postReducers"
import {
    loginReducer,
    registerReducer,
    userDataReducer,
    userDataProfileReducer,
} from "./reducers/userReducers"

// const initialState = {
//     userLogin: {
//         user: AsyncStorage.getItem('UserData')
//         ? JSON.parse(AsyncStorage.getItem("UserData"))
//         : null
//     }
// }

// const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const reducer = combineReducers({
    userLogin: loginReducer,
    userRegister: registerReducer,
    userListPost: listPostReducer,
    userData: userDataReducer,
    userProfile: userDataProfileReducer,
    userPostProfile: listPostProfileReducer,
    userFollowing: userFollowingReducer,
})
const store = createStore(
    reducer,
    // composeEnhancers(applyMiddleware(thunk)),
    applyMiddleware(thunk)
);

export default store;