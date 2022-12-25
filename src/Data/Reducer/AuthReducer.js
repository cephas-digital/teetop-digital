import {
	GET_USER,
	GET_USER_FAIL,
	GET_USER_LOADING,
	LOGIN_USER,
	LOGIN_USER_FAIL,
	LOGOUT,
	REGISTER_USER,
	REGISTER_USER_FAIL,
	TOKEN,
	TOKEN_TEMP,
	TOKEN_TEMP_AUTH,
	UPDATE_USER,
	UPDATE_USER_FAIL,
} from "../Actions/ActionTypes";

const initialState = {
	user: null,
	token: localStorage.getItem(TOKEN),
	isAuth: false,
	loading: false,
	isLoading: false,
	isValidate: false,
	isOtp: false,
	isFeed: false,
	isLoggedIn: false,
	isThirdPartyLoading: false,
	isDashboard: false,
	isUpdated: false,
	follow: "",
	isAdminAdded: false,
	temp_auth: localStorage.getItem(TOKEN_TEMP),
};

const AuthReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case TOKEN_TEMP_AUTH:
			return { ...state, temp_auth: payload };
		case LOGIN_USER:
			localStorage.setItem(TOKEN, payload.token);
			return {
				...state,
				isLoggedIn: true,
				token: payload.token,
				registerToken: null,
				isValidate: null,
				isOtp: null,
				isThirdPartyLoading: false,
			};
		case LOGIN_USER_FAIL:
			return { ...state, isLoggedIn: false, isThirdPartyLoading: false };
		case GET_USER:
			if (payload?.token) {
				localStorage.setItem(TOKEN, payload?.token);
			}
			return {
				...state,
				user: payload?.data ? payload?.data : null,
				isAuth: payload?.data ? true : false,
				loading: false,
			};
		case GET_USER_FAIL:
			return {
				...state,
				loading: false,
				isAuth: false,
			};
		case GET_USER_LOADING:
			return {
				...state,
				loading: true,
			};
		case REGISTER_USER:
			return {
				...state,
				isAdminAdded: true,
			};
		case UPDATE_USER:
			return {
				...state,
				isUpdated: true,
				user: payload?.data,
			};
		case UPDATE_USER_FAIL:
			return { ...state, isUpdated: false };
		case REGISTER_USER_FAIL:
			return { ...state, isAdminAdded: false };
		case LOGOUT:
			localStorage.removeItem(TOKEN);
			return initialState;
		default:
			return state;
	}
};

export default AuthReducer;
