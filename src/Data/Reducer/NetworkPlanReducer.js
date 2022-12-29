import {
  GET_NETWORK,
  GET_NETWORK_FAIL,
  GET_NETWORK_LOADING,
  GET_PLANS,
  GET_PLANS_FAIL,
  GET_PLANS_LOADING,
} from "../Actions/ActionTypes";

const initialState = {
  isLoading: false,
  networks: [],
  isLoading2: false,
  plans: [],
};
const NetworkPlanReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PLANS:
      return {
        ...state,
        isLoading2: false,
        plans: payload,
      };
    case GET_PLANS_LOADING:
      return {
        ...state,
        isLoading2: true,
      };
    case GET_PLANS_FAIL:
      return {
        ...state,
        isLoading2: false,
      };
    case GET_NETWORK:
      return {
        ...state,
        isLoading: false,
        networks: payload,
      };
    case GET_NETWORK_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_NETWORK_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default NetworkPlanReducer;
