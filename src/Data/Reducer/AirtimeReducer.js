import {
	ADD_AIRTIME,
	ADD_AIRTIME_FAIL,
	GET_AIRTIME,
	GET_AIRTIME_FAIL,
	GET_AIRTIME_LOADING,
	UPDATE_AIRTIME,
} from "../Actions/ActionTypes";
import { EditData } from "./DataReducer";

const initialState = {
	isLoading: false,
	airtime: [],
	isAdded: false,
	isUpdated: false,
	isDeleted: false,
};
const AirtimeReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case ADD_AIRTIME:
			return {
				...state,
				isAdded: true,
				airtime: [{ ...payload }, ...state.airtime],
			};
		case ADD_AIRTIME_FAIL:
			return {
				...state,
				isAdded: false,
				isUpdated: false,
				isDeleted: false,
			};
		case UPDATE_AIRTIME:
			return {
				...state,
				isUpdated: true,
				airtime: EditData(state.airtime, payload),
			};
		case GET_AIRTIME:
			return {
				...state,
				isLoading: false,
				airtime: payload,
			};
		case GET_AIRTIME_FAIL:
			return {
				...state,
				isLoading: false,
			};
		case GET_AIRTIME_LOADING:
			return {
				...state,
				isLoading: true,
			};
		default:
			return state;
	}
};

export default AirtimeReducer;
