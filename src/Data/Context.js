import React, { createContext } from "react";
import { connect, useSelector } from "react-redux";

export const GlobalState = createContext();

const DataProvider = ({ children }) => {
	const { auth } = useSelector(state => state);

	let numberWithCommas = x => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	let headerList = [
		{
			name: "Home",
			url: "/",
		},
		{
			name: "About",
			url: "/about",
		},
		{
			name: "Services",
			url: "/services",
		},
		{
			name: "Contact",
			url: "/contact",
		},
		{
			name: "Our blog",
			url: "/blogs",
		},
	];

	const state = {
		numberWithCommas,
		headerList,

		auth,
	};

	return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};

export default connect(null, {})(DataProvider);
