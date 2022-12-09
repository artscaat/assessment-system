import { combineReducers } from "redux";
import { classReducer } from "../reducers/classReducer";
import { userReducer } from "../reducers/userReducer";

export const rootReducer = combineReducers({
    class: classReducer,
    user: userReducer,
})