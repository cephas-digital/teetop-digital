import React, { useContext, useEffect, useState } from "react";
import { Container } from "reactstrap";
import { ModalComponents } from "../../Components";
import { Buttons } from "../../Utils";
import moment from "moment";
import { GlobalState } from "../../Data/Context";

const Data = () => {
	let dataSortTab = [
		{
			name: "data history",
			type: "button",
			link: `detail`,
		},
		{ name: "mtn" },
		{ name: "glo" },
		{ name: "airtel" },
		{ name: "etisalat" },
		{ name: "vodafone" },
		{ name: "multilinks" },
	];
	let dataTab = [
		{ name: "data transfer", type: "button", link: "transfer" },
		{ name: "data pin", type: "button", link: "pin" },
		dataSortTab[0],
	];

	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("data history");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	let [active, setActive] = useState(0),
		[isPin, setIsPin] = useState(false),
		[isTransfer, setIsTransfer] = useState(false),
		togglePin = () => {
			setIsPin(!isPin);
		},
		toggleTransfer = () => {
			setIsTransfer(!isTransfer);
		};
	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<div className="row mx-0 g-2 g-md-3">
					{dataTab?.map((it, i) => (
						<div className="col-6 col-md-4 p-1 p-md-3" key={i}>
							<button
								style={{ borderRadius: "30px" }}
								key={i}
								onClick={() => {
									if (it?.type === "button") {
										if (it?.link === "pin") togglePin();
										if (it?.link === "transfer") toggleTransfer();
										if (it?.link === "detail") setActive(0);
									}
								}}
								className="btn btn-outline-primary1 py-2 py-md-3 text-capitalize w-100 textTrunc">
								<span className="textTrunc">{it?.name}</span>
							</button>
						</div>
					))}
				</div>
				<h4 className="text-capitalize my-3 Lexend">
					{active === 0
						? `${dataTab?.[active]?.name} options`
						: `${dataSortTab?.[active]?.name} data transactions`}
				</h4>
				{active > 0 ? (
					<>
						<TransferHistory active={active} />
						<Buttons
							title={"back"}
							css="btn-primary1 text-capitalize py-md-3 py-2 px-4 px-md-5"
							width={"w-auto"}
							onClick={() => setActive(0)}
							style={{ borderRadius: "30px" }}
						/>
					</>
				) : (
					<div className="row mx-0 g-2 g-md-4">
						{dataSortTab?.map(
							(item, i) =>
								!item?.link && (
									<div className="p-md-3 p-1 col-6 col-md-4" key={i}>
										<div
											onClick={() => setActive(i)}
											className="rounded20 eachProduct shadow2 myCursor p-3 d-flex align-items-center justify-content-center text-white text-uppercase CgWallet"
											style={{
												background: `linear-gradient(90.18deg, #84C7DB -52.19%, #377FB6 81.92%)`,
											}}>
											{item?.name}
										</div>
									</div>
								)
						)}
					</div>
				)}
			</Container>
			<MakePin isOpen={isPin} back={togglePin} />
			<MakeTransfer isOpen={isTransfer} back={toggleTransfer} />
		</div>
	);
};

export default Data;

const MakeTransfer = ({ isOpen, back }) => {
	return (
		<>
			<ModalComponents title="buy data" isOpen={isOpen} back={back}>
				<div className="downH2 d-flex">
					<form className="w-100">
						<div className="mb-4">
							<label htmlFor="Newtwork">Network</label>
							<select
								name="network"
								id="network"
								className="form-control form-select py-3 rounded20">
								<option value="mtn">MTN</option>
							</select>
						</div>
						<div className="mb-4">
							<label htmlFor="value">Value</label>
							<input
								type={"number"}
								placeholder="500"
								className="form-control py-3"
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="telephone">Phone number</label>
							<input
								type={"tel"}
								placeholder="08012345678"
								className="form-control py-3"
							/>
						</div>
						<Buttons
							title={"buy"}
							css="btn-primary1 text-capitalize py-3 px-4 px-lg-5"
							width={"w-25 w25"}
							onClick={back}
							style={{ borderRadius: "30px" }}
						/>
					</form>
				</div>
			</ModalComponents>
		</>
	);
};

const MakePin = ({ isOpen, back }) => {
	return (
		<>
			<ModalComponents title="data pin" isOpen={isOpen} back={back}>
				<div className="downH2 d-flex">
					<form className="w-100">
						<div className="mb-4">
							<label htmlFor="Newtwork">Network</label>
							<select
								name="network"
								id="network"
								className="form-control form-select py-3 rounded20">
								<option value="mtn">MTN</option>
							</select>
						</div>
						<div className="mb-4">
							<label htmlFor="value">Value</label>
							<input
								type={"number"}
								placeholder="500"
								className="form-control py-3"
							/>
						</div>
						<Buttons
							title={"get pin"}
							css="btn-primary1 text-capitalize py-3 px-4 px-lg-5"
							width={"w-50 w50"}
							onClick={back}
							style={{ borderRadius: "30px" }}
						/>
					</form>
				</div>
			</ModalComponents>
		</>
	);
};

const TransferHistory = () => {
	let userList = [
		{
			plan_id: "10",
			createdAt: Date.now(),
			price: "50000",
			amount: "50000",
			reference: "1234567890",
			name: "MTN",
			network: 0,
			validity: 4,
			allowance: 5,
			hw_code: 40,
		},
	];

	return (
		<div className="pb-5 my-5">
			<div className="bland row mx-0 py-3 px-0 text-capitalize">
				<div className="col textTrunc">plan</div>
				<div className="col textTrunc d-none d-md-flex">Date</div>
				<div className="col textTrunc d-none d-md-flex">Txt_rf</div>
				<div className="col textTrunc">Name</div>
				<div className="col textTrunc">Network</div>
				<div className="col textTrunc">Amount</div>
				<div className="col textTrunc">Price</div>
				<div className="col textTrunc">Validity</div>
				<div className="col textTrunc d-none d-md-flex">Allowance</div>
				<div className="col textTrunc d-none d-md-flex">HW Code</div>
				<div className="col textTrunc">Actions</div>
			</div>
			<div className="bland2 row mx-0">
				{userList?.map((item, index) => (
					<div key={index} className="row mx-0 py-3 px-0">
						<div className="col textTrunc my-auto">{item?.plan_id}</div>
						<div className="col textTrunc my-auto  d-none d-md-flex">
							{moment(item?.createdAt).format("L")}
						</div>
						<div className="col textTrunc my-auto  d-none d-md-flex">
							{item?.reference}
						</div>
						<div className="col textTrunc my-auto">{item?.name}</div>
						<div className="col textTrunc my-auto">{item?.network}</div>
						<div className="col textTrunc my-auto">{item?.amount}</div>
						<div className="col textTrunc my-auto">{item?.price}</div>
						<div className="col textTrunc my-auto">{item?.validity}</div>
						<div className="col textTrunc my-auto  d-none d-md-flex">
							{item?.allowance}
						</div>
						<div className="col textTrunc my-auto  d-none d-md-flex">
							{item?.hw_code}
						</div>
						<div className="col textTrunc my-auto">view</div>
					</div>
				))}
			</div>
		</div>
	);
};
