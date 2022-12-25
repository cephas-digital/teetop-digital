import React, { useContext, useEffect } from "react";
import { GlobalState } from "../Data/Context";
import Calendar from "react-calendar";
import { Container } from "reactstrap";
import "react-calendar/dist/Calendar.css";
import { UserListOne } from "./Users";
import Charts, { LineMixedCharts } from "./Charts";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ usersArr }) => {
	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("dashboard analysis");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<div className="row mx-0 w-100">
					<div className="col-md-8">
						<FourBoxBar list={usersArr} />
						<div className="row mx-0 w-100">
							<div className="h25 col-md-6">
								<Charts
									state={[
										{ month: "Jan", sales: "2000", expenses: "4000" },
										{ month: "Feb", sales: "5000", expenses: "3000" },
										{ month: "Mar", sales: "5000", expenses: "3000" },
										{ month: "Apr", sales: "6000", expenses: "7000" },
										{ month: "May", sales: "9000", expenses: "2000" },
										{ month: "Jun", sales: "1000", expenses: "9000" },
										{ month: "Jul", sales: "8000", expenses: "2000" },
										{ month: "Aug", sales: "4000", expenses: "7000" },
										{ month: "Sep", sales: "2000", expenses: "6000" },
										{ month: "Oct", sales: "8000", expenses: "9000" },
										{ month: "Nov", sales: "5000", expenses: "3000" },
										{ month: "Dec", sales: "10000", expenses: "9500" },
									]}
									dKey={"sales"}
									dKey2={"expenses"}
									dColor="#53f293"
									dColor2="#20afe5"
									xaxis={"month"}
								/>
							</div>
							<div className="h25 col-md-6">
								<LineMixedCharts
									state={[
										{ month: "Jan", sales: "2000", expenses: "4000" },
										{ month: "Feb", sales: "5000", expenses: "3000" },
										{ month: "Mar", sales: "5000", expenses: "3000" },
										{ month: "Apr", sales: "6000", expenses: "7000" },
										{ month: "May", sales: "9000", expenses: "2000" },
										{ month: "Jun", sales: "1000", expenses: "9000" },
										{ month: "Jul", sales: "8000", expenses: "2000" },
										{ month: "Aug", sales: "4000", expenses: "7000" },
										{ month: "Sep", sales: "2000", expenses: "6000" },
										{ month: "Oct", sales: "8000", expenses: "9000" },
										{ month: "Nov", sales: "5000", expenses: "3000" },
										{ month: "Dec", sales: "10000", expenses: "9500" },
									]}
									dKey={"sales"}
									dKey2={"expenses"}
									dColor="#FEC430"
									dColor2="#009688"
									xaxis={"month"}
								/>
							</div>
						</div>
					</div>
					<div className="col-md-4 d-none d-md-flex flex-column">
						<CalenderComponent css="darkPurple rounded20 border-0 p-3 text-white w-100" />
					</div>
				</div>
				<UserListOne />
			</Container>
		</div>
	);
};

export default Dashboard;

export const CalenderComponent = ({ css }) => {
	return (
		<>
			<div className="d-flex w-100">
				<Calendar className={css} showWeekNumbers={true} calendarType="US" />
			</div>
		</>
	);
};

export const FourBoxBar = ({ list }) => {
	let navigate = useNavigate();
	return (
		<>
			<div className="row mx-0 g-2 g-md-4 mb-4 mb-md-5">
				{list?.map((item, index) => (
					<div className="col-6 col-md-3" key={index}>
						<div
							className="row mx-0 p-2 p-md-3 eachProduct rounded20 text-white"
							onClick={() => (item?.link ? navigate(item?.link) : {})}
							style={{
								background: item?.color,
							}}>
							<div className="col my-auto d-none d-md-flex">
								{/* <img src={item?.icon} className="img-fluid" alt="Icon" /> */}
							</div>
							<div className="col my-auto">
								<p className="text2 m-0 fontReduceMini">{item?.number}</p>
								<h6 className="text-capitalize">{item?.name}</h6>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};
