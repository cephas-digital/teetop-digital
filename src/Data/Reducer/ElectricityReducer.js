import {
	ADD_ELECTRICITY,
	ADD_ELECTRICITY_FAIL,
	GET_ELECTRICITY,
	GET_ELECTRICITY_FAIL,
	GET_ELECTRICITY_LOADING,
	UPDATE_ELECTRICITY,
} from "../Actions/ActionTypes";
import { EditData } from "./DataReducer";

const initialState = {
	isLoading: false,
	electricity: [],
	isAdded: false,
	isUpdated: false,
	isDeleted: false,
};
const ElectricityReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case ADD_ELECTRICITY:
			return {
				...state,
				isAdded: true,
				electricity: [{ ...payload }, ...state.electricity],
			};
		case ADD_ELECTRICITY_FAIL:
			return {
				...state,
				isAdded: false,
				isUpdated: false,
				isDeleted: false,
			};
		case UPDATE_ELECTRICITY:
			return {
				...state,
				isUpdated: true,
				electricity: EditData(state.electricity, payload),
			};
		case GET_ELECTRICITY:
			return {
				...state,
				isLoading: false,
				electricity: payload,
			};
		case GET_ELECTRICITY_FAIL:
			return {
				...state,
				isLoading: false,
			};
		case GET_ELECTRICITY_LOADING:
			return {
				...state,
				isLoading: true,
			};
		default:
			return state;
	}
};

export default ElectricityReducer;
