import React, { useContext, useEffect, useState } from "react";
import { Container } from "reactstrap";
import { Buttons } from "../Utils";
import img1 from "../Assets/Group 42924.png";
import moment from "moment";
import { GlobalState } from "../Data/Context";

const MainConvert = () => {
	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("airtime converter");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="bg-white aboutScreen">
			<Container>
				<ConvertTop />
				<ConverterHistory />
			</Container>
		</div>
	);
};

export default MainConvert;

const ConvertTop = () => {
	let init = {
		bank_account: "",
		bank_name: "",
		airtime_reference: "",
	};
	let [state, setState] = useState(init),
		textChange =
			name =>
			({ target: { value } }) => {
				setState({ ...state, [name]: value });
			};
	return (
		<section className="row mx-0">
			<form className="mt-4 col-md-4">
				<div className="mb-md-5 mb-3">
					<label className="text-capitalize" htmlFor="name">
						Airtime reference
					</label>
					<input
						type="text"
						required
						name="airtime_reference"
						className="form-control py-3 py-md-4 bg-transparent"
						value={state?.airtime_reference}
						onChange={textChange("airtime_reference")}
						style={{ borderRadius: "30px" }}
					/>
				</div>
				<div className="mb-md-5 mb-3">
					<label className="text-capitalize" htmlFor="name">
						Bank account
					</label>
					<input
						type="number"
						required
						name="bank_account"
						className="form-control py-3 py-md-4 bg-transparent"
						value={state?.bank_account}
						onChange={textChange("bank_account")}
						style={{ borderRadius: "30px" }}
					/>
				</div>
				<div className="mb-md-5 mb-3">
					<label className="text-capitalize" htmlFor="name">
						Amount
					</label>
					<input
						type="text"
						required
						name="bank_name"
						className="form-control py-3 py-md-4 bg-transparent"
						value={state?.bank_name}
						onChange={textChange("bank_name")}
						style={{ borderRadius: "30px" }}
					/>
				</div>
				<Buttons
					title={"convert"}
					css="btn-primary1 text-capitalize py-3 w-50 my-4"
					width={"w-50"}
					style={{ borderRadius: "30px" }}
				/>
			</form>
			<div className="col-lg-8 h-100 my-auto d-none d-md-flex">
				<img src={img1} alt="Banner" className="img-fluid mx-auto" />
			</div>
		</section>
	);
};

const ConverterHistory = () => {
	let historyList = [
		{
			id: "CONV-12",
			reference: "1234567876543",
			date: Date.now(),
			telephone: "081234567890",
			amount: 5000,
			status: "delivered",
			network: "MTN",
		},
	];

	return (
		<div className="pb-5 my-5">
			<div className="bland row mx-0 p-3 text-capitalize">
				<div className="col textTrunc d-none d-md-flex">ID</div>
				<div className="col textTrunc d-none d-md-flex">Reference</div>
				<div className="col textTrunc d-none d-md-flex">date</div>
				<div className="col textTrunc">number</div>
				<div className="col textTrunc">amount</div>
				<div className="col textTrunc">network </div>
				<div className="col textTrunc">status</div>
			</div>
			<div className="bg-white row mx-0">
				{historyList?.map((item, index) => (
					<div key={index} className="row mx-0 p-3">
						<div className="col d-none d-md-flex textTrunc my-auto">
							{item?.id}
						</div>
						<div className="col d-none d-md-flex textTrunc my-auto">
							{item?.reference}
						</div>
						<div className="col d-none d-md-flex textTrunc my-auto">
							{moment(item?.createdAt).format("L")}
						</div>
						<div className="col textTrunc my-auto">{item?.telephone}</div>
						<div className="col textTrunc my-auto">{item?.amount}</div>
						<div className="col textTrunc my-auto">{item?.network}</div>
						<div className="col textTrunc my-auto">{item?.status}</div>
					</div>
				))}
			</div>
		</div>
	);
};
