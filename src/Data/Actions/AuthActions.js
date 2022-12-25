import {
	TOKEN_TEMP,
	TOKEN_TEMP_AUTH,
	LOGIN_USER,
	LOGIN_USER_FAIL,
	LOGOUT,
	TOKEN,
	GET_USER,
	GET_USER_LOADING,
	GET_USER_FAIL,
	GET_ERRORS_TEXT,
	REGISTER_USER,
	UPDATE_USER,
	REGISTER_USER_FAIL,
} from "./ActionTypes";
import { SetAuthToken } from "../Config";
import axios from "axios";
import { toast } from "react-toastify";
import { clearErrors, returnErrors } from "../Reducer/ErrorReducer";

// LOGOUT
export const LogoutToken = () => async dispatch => {
	dispatch({ type: LOGOUT });
};

// GET USER INFO
export const loadUser = () => async dispatch => {
	if (localStorage.getItem(TOKEN)) {
		SetAuthToken(localStorage.getItem(TOKEN));
	}
	dispatch(clearErrors());
	dispatch({ type: GET_USER_LOADING });

	try {
		let res = await axios.get(
			`/users/profile?populate=avatar&populate=wallet&populate=bankAccounts&populate=driverLicense&populate=officeFrontView&populate=vehicleRegistration`
		);
		// console.log({ res: res.data });
		dispatch({
			type: GET_USER,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		dispatch({ type: GET_USER_FAIL });
		dispatch({
			type: GET_ERRORS_TEXT,
			payload: err?.response ? err?.response?.data?.message : err?.message,
		});
	}
};

// LOGIN ACTION
export const loginUser = userData => async dispatch => {
	// Set body
	let body = userData;
	try {
		let res = await axios.post(`/auth/login`, body);

		dispatch({
			type: LOGIN_USER,
			payload: res.data?.data,
		});
		dispatch(loadUser());
		toast.success(res.data.message, { autoClose: 5000 });
	} catch (err) {
		console.log({ err: err.response });
		dispatch(
			returnErrors({
				error: err?.response?.data?.data,
				status: err?.response?.status,
			})
		);
		toast.error(err?.response ? err?.response?.data?.message : err?.message);
		dispatch({ type: LOGIN_USER_FAIL });
	}
};

// REGISTER ACTION
export const registerUser = userData => async dispatch => {
	try {
		let res = await axios.post(
			`/auth/register`,
			{
				...userData,
				// ...data,
			},
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);

		dispatch({
			type: REGISTER_USER,
			payload: res.data,
		});

		toast.success(res.data.message, { autoClose: false });
	} catch (err) {
		console.log({ err: err.response });
		dispatch(
			returnErrors({
				error: err?.response?.data?.data,
				status: err?.response?.status,
			})
		);
		toast.error(err?.response ? err?.response?.data?.message : err?.message);
		dispatch({ type: REGISTER_USER_FAIL });
	}
};

export const updateUser = (data, type) => async dispatch => {
	try {
		var res;

		if (type === "profile")
			res = await axios.put(`/users/${type}`, { ...data });
		else if (type === "change-password")
			res = await axios.post(`/auth/${type}`, { ...data });
		else if (type === "profile-image")
			res = await axios.post(
				`/users/${type}`,
				{ ...data },
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

		dispatch({
			type: UPDATE_USER,
			payload: res.data?.data,
		});

		toast.success(res.data.message, {
			autoClose: 5000,
		});
	} catch (err) {
		console.log({ err: err.response });
		dispatch(
			returnErrors({
				error: err?.response?.data?.data,
				status: err?.response?.status,
			})
		);
		toast.error(err?.response ? err?.response?.data?.message : err?.message);
		dispatch({ type: LOGIN_USER_FAIL });
	}
};

export const imageUpload = async images => {
	let imgArr = [];
	for (const item of images) {
		let logo = new FormData();
		logo.append(`logo`, item);

		try {
			let res = await axios.post(`/v1/upload`, logo, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			const data = await res.data.url;
			imgArr.push(data);
		} catch (error) {
			console.log({ errorImg: error });
		}
	}
	return imgArr;
};

export const getSetTempUser = data => async dispatch => {
	try {
		console.log({ data });
		if (data) {
			localStorage.setItem(TOKEN_TEMP, data);
		}
		dispatch({
			type: TOKEN_TEMP_AUTH,
			payload: data ? data : localStorage.getItem(TOKEN_TEMP),
		});
	} catch (error) {}
};
