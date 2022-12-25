import React, { createContext, useState } from "react";
import { connect, useSelector } from "react-redux";
import { BiHomeAlt } from "react-icons/bi";
import { TbUsers } from "react-icons/tb";
import { VscBellDot, VscArrowSwap } from "react-icons/vsc";
import { GiChart, GiWallet, GiHumanPyramid } from "react-icons/gi";
import { IoCardOutline } from "react-icons/io5";
import { CiTimer } from "react-icons/ci";
import { CgController } from "react-icons/cg";
import { BsBoxSeam } from "react-icons/bs";

import { getSetTempUser } from "./Actions/AuthActions";

export const GlobalState = createContext();

const DataProvider = ({ children, getSetTempUser }) => {
	const { auth, cables, general, electricity, airtimes, data, errors } =
		useSelector(state => state);
	let [stateName, setStateName] = useState("");

	let numberWithCommas = x => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	let headerList = [
		{
			name: "Home",
			url: "/",
		},
		{
			name: "About us",
			url: "/about",
		},
		{
			name: "Services",
			url: "/services",
		},
		{
			name: "Contact us",
			url: "/contact",
		},
		{
			name: "Our blog",
			url: "/blogs",
		},
	];

	let sidebarList = [
		{
			name: "Dashboard",
			url: "/dashboard",
			icon: <BiHomeAlt className="icon" size={24} />,
		},
		{
			name: "Users",
			url: "/users",
			icon: <TbUsers className="icon" size={24} />,
		},
		{
			name: "Transactions",
			url: "/transactions",
			icon: <GiChart className="icon" size={24} />,
		},
		{
			name: "Products",
			url: "/products",
			icon: <IoCardOutline className="icon" size={24} />,
		},
		{
			name: "Converter",
			url: "/converter",
			icon: <VscArrowSwap className="icon" size={24} />,
		},
		{
			name: "Notification",
			url: "/notifications",
			icon: <VscBellDot className="icon" size={24} />,
		},
		{
			name: "Walllet history",
			url: "/wallets",
			icon: <GiWallet className="icon" size={24} />,
		},
		{
			name: "Employee",
			url: "/administration",
			icon: <GiHumanPyramid className="icon" size={24} />,
		},
		{
			name: "Reports",
			url: "/reports",
			icon: <CiTimer className="icon" size={24} />,
		},
		{
			name: "Bundles",
			url: "/bundles",
			icon: <BsBoxSeam className="icon" size={24} />,
		},
		{
			name: "Control",
			url: "/controls",
			icon: <CgController className="icon" size={24} />,
		},
	];
	let sidebarListUser = [
		{
			name: "Dashboard",
			url: "/dashboard",
			icon: <BiHomeAlt className="icon" size={24} />,
		},
		{
			name: "Transactions",
			url: "/transactions",
			icon: <GiChart className="icon" size={24} />,
		},
		{
			name: "Products",
			url: "/products",
			icon: <IoCardOutline className="icon" size={24} />,
		},
		{
			name: "Converter",
			url: "/converter",
			icon: <VscArrowSwap className="icon" size={24} />,
		},
		{
			name: "Notification",
			url: "/notifications",
			icon: <VscBellDot className="icon" size={24} />,
		},
		{
			name: "Walllet history",
			url: "/wallets",
			icon: <GiWallet className="icon" size={24} />,
		},
		{
			name: "Bundles",
			url: "/bundles",
			icon: <BsBoxSeam className="icon" size={24} />,
		},
	];

	const state = {
		numberWithCommas,
		headerList,
		sidebarList,
		sidebarListUser,
		stateName,
		setStateName,

		auth,
		getSetTempUser,

		cables,
		general,
		electricity,
		airtimes,
		data,

		errors,
	};

	return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};

export default connect(null, { getSetTempUser })(DataProvider);
