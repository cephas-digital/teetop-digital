import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Header, Sidebar, DefaultHeader, Footer } from "./Components";
import { GlobalState } from "./Data/Context";
import PageRender from "./PageRender";
import Home from "./Screens/home";
import Home2 from "./Pages/home";
import Home3 from "./Views/home";

const Routers = () => {
	const { auth } = useContext(GlobalState);
	return (
		<>
			<ToastContainer />
			{auth?.temp_auth === "user" || auth?.temp_auth === "agent" ? (
				<Sidebar />
			) : (
				<Header />
			)}
			<div
				className={
					auth?.temp_auth === "user" || auth?.temp_auth === "agent"
						? "home"
						: ""
				}>
				{auth?.temp_auth === "user" || auth?.temp_auth === "agent" ? (
					<DefaultHeader />
				) : (
					<></>
				)}
				<Routes>
					<Route
						path="/"
						element={
							auth?.temp_auth === "user" ? (
								<Home2 />
							) : auth?.temp_auth === "agent" ? (
								<Home3 />
							) : (
								<Home />
							)
						}
					/>
					<Route path="/:page" element={<PageRender />} />
					<Route path="/:page/:id" element={<PageRender />} />
					<Route path="/:page/:id/:step" element={<PageRender />} />
				</Routes>
			</div>
			{auth?.temp_auth === "user" || auth?.temp_auth === "agent" ? (
				<></>
			) : (
				<Footer />
			)}
		</>
	);
};

export default Routers;
