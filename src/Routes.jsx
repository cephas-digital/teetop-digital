import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Footer, Header } from "./Components";
import PageRender from "./PageRender";
import Home from "./Screens/home";

const Routers = () => {
	return (
		<>
			<ToastContainer />
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/:page" element={<PageRender />} />
				<Route path="/:page/:id" element={<PageRender />} />
				<Route path="/:page/:id/:step" element={<PageRender />} />
			</Routes>
			<Footer />
		</>
	);
};

export default Routers;
