// Root reducer to combine all reducers in the app

import AuthReducer from "./AuthReducer";

import { combineReducers } from "redux";

export default combineReducers({
	auth: AuthReducer,
});
