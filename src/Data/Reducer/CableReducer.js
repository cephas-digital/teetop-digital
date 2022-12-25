import {
	ADD_CABLE,
	ADD_CABLE_FAIL,
	GET_CABLE,
	GET_CABLE_FAIL,
	GET_CABLE_LOADING,
	UPDATE_CABLE,
} from "../Actions/ActionTypes";
import { EditData } from "./DataReducer";

const initialState = {
	isLoading: false,
	cable: [],
	isAdded: false,
	isUpdated: false,
	isDeleted: false,
};
const CableReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case ADD_CABLE:
			return {
				...state,
				isAdded: true,
				cable: [{ ...payload }, ...state.cable],
			};
		case ADD_CABLE_FAIL:
			return {
				...state,
				isAdded: false,
				isUpdated: false,
				isDeleted: false,
			};
		case UPDATE_CABLE:
			return {
				...state,
				isUpdated: true,
				cable: EditData(state.cable, payload),
			};
		case GET_CABLE:
			return {
				...state,
				isLoading: false,
				cable: payload,
			};
		case GET_CABLE_FAIL:
			return {
				...state,
				isLoading: false,
			};
		case GET_CABLE_LOADING:
			return {
				...state,
				isLoading: true,
			};
		default:
			return state;
	}
};

export default CableReducer;
