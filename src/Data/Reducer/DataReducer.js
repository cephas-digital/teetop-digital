import {
  ADD_DATA,
  ADD_DATA_FAIL,
  GET_DATA,
  GET_DATA_FAIL,
  GET_DATA_LOADING,
  UPDATE_DATA,
} from "../Actions/ActionTypes";

const initialState = {
  isLoading: false,
  data: [],
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};
const DataReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_DATA:
      return {
        ...state,
        isAdded: true,
        data: [{ ...payload }, ...state.data],
      };
    case ADD_DATA_FAIL:
      return {
        ...state,
        isAdded: false,
        isUpdated: false,
        isDeleted: false,
      };
    case UPDATE_DATA:
      return {
        ...state,
        isUpdated: true,
        data: EditData(state.data, payload),
      };
    case GET_DATA:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    case GET_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case GET_DATA_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default DataReducer;

export const EditData = (data, payload) => {
  let updatateData = data.map((item) =>
    item._id !== payload._id ? item : payload
  );
  return updatateData;
};

export const DeleteData = (data, payload) => {
  let filterItem = [...data.filter((item) => item._id !== payload._id)];
  return filterItem;
};
