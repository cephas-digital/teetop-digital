// Root reducer to combine all reducers in the app

import AuthReducer from "./AuthReducer";

import { combineReducers } from "redux";
import CableReducer from "./CableReducer";
import DataReducer from "./DataReducer";
import NetworkPlanReducer from "./NetworkPlanReducer";
import ElectricityReducer from "./ElectricityReducer";
import AirtimeReducer from "./AirtimeReducer";
import ErrorReducer from "./ErrorReducer";

export default combineReducers({
  auth: AuthReducer,
  cables: CableReducer,
  data: DataReducer,
  general: NetworkPlanReducer,
  electricity: ElectricityReducer,
  airtimes: AirtimeReducer,
  errors: ErrorReducer,
});
