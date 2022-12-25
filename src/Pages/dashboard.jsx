import React from "react";
import Dashboard from "../Components/Dashboard";

const MainDashboard = () => {
	let usersArr = [
		{
			name: "wallet balance",
			number: 12000,
			color: "linear-gradient(90deg, #DE0DE2 16.14%, #0E102D 101.45%)",
			link: "/wallets",
			type: "amount",
		},
		{
			name: "Notification",
			number: 20,
			color: "linear-gradient(90deg, #F45F83 16.14%, #9E1A2A 101.45%)",
			link: "/notifications",
		},
		{
			name: "total products",
			number: 50,
			color: "linear-gradient(90.18deg, #3199B7 -52.19%, #144468 81.92%)",
			link: "/products",
		},
		{
			name: "total expenses",
			number: 4000,
			color: "linear-gradient(90.18deg, #84C7DB -52.19%, #377FB6 81.92%)",
			link: "/transactions",
		},
	];
	return <Dashboard usersArr={usersArr} />;
};

export default MainDashboard;
