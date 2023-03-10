import {
	ADD_CABLE,
	ADD_CABLE_FAIL,
	GET_CABLE,
	GET_CABLE_DIRECT_PACKAGE,
	GET_CABLE_DIRECT_TYPE,
	GET_CABLE_FAIL,
	GET_CABLE_LOADING,
	LOGOUT,
} from "../Actions/ActionTypes";

const initialState = {
	isLoading: false,
	cable: [],
	cable_direct: [],
	cable_package: null,
	isAdded: false,
	isDeleted: false,
};
const CableReducer = (state = initialState, action) => {
	const { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case ADD_CABLE:
			return {
				...state,
				isAdded: true,
				cable: [data, ...state.cable],
				paginate: {
					...state?.paginate,
					result: state?.paginate?.result + 1,
					total: state?.paginate?.total + 1,
				},
			};
		case ADD_CABLE_FAIL:
			return {
				...state,
				isAdded: false,
				isDeleted: false,
			};
		case GET_CABLE:
			return {
				...state,
				isLoading: false,
				cable: data,
				paginate: payload?.paginate,
			};
		case GET_CABLE_DIRECT_PACKAGE:
			return {
				...state,
				cable_package: data,
			};
		case GET_CABLE_DIRECT_TYPE:
			return {
				...state,
				cable_direct: data,
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
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};

export default CableReducer;
