import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../Data/Context";
import { Container } from "reactstrap";
import moment from "moment";
import { BiCopy, BiDotsHorizontalRounded } from "react-icons/bi";
import { RiShieldStarFill } from "react-icons/ri";
import { Buttons } from "../../Utils";
import { Link } from "react-router-dom";
import { RoundCharts } from "../Charts";
import { toast } from "react-toastify";
import { ModalComponents } from "../DefaultHeader";
import { FaCcMastercard } from "react-icons/fa";

let colorArr = ["#E9F9F9", "#C0938E", "#000000", "#B3CEDE"];

const Wallets = () => {
	let { setStateName } = useContext(GlobalState);
	let [isTransfer, setIsTransfer] = useState(false);
	let [isWithdraw, setIsWithdraw] = useState(false);
	let toggleTransfer = () => {
		setIsTransfer(!isTransfer);
	};
	let toggleWithdraw = () => {
		setIsWithdraw(!isWithdraw);
	};
	let [isVirtual, setIsVirtual] = useState(false);
	let [isCard, setIsCard] = useState(false);
	let toggleVirtual = () => {
		setIsVirtual(!isVirtual);
	};
	let toggleCard = () => {
		setIsCard(!isCard);
	};

	useEffect(() => {
		setStateName("my account");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<div className="rounded20 walletDiv p-3 px-md-5">
					<div className="d-md-flex align-items-center h-100">
						<div className="px-3 text-dark h-100 py-3 py-md-5 mx-auto">
							<h3>Wallet balance</h3>
							<h1 className="fw-bold text5 mb-5">NGN 100,000</h1>
							<div className="row mx-0 w-100 mb-5">
								<div className="col text-center">
									<h5 className="fw-bold">28K</h5>
									<small>Commission</small>
								</div>
								<div className="col text-center">
									<h5 className="fw-bold">28K</h5>
									<small>Bonus</small>
								</div>
								<div className="col text-center">
									<h5 className="fw-bold">28K</h5>
									<small>Purchase</small>
								</div>
							</div>
							<div className="d-flex align-items-center justify-content-between">
								<button
									onClick={toggleTransfer}
									className="btn textGradient text-capitalize fw-bold">
									transfer
								</button>
								<button
									onClick={toggleWithdraw}
									className="btn textGradient text-capitalize fw-bold">
									withdraw
								</button>
							</div>
						</div>
						<div className="ms-auto d-md-flex align-items-center h-100">
							<div className="darkBg h-100 rounded10 p-3 py-5 genWalletWidth d-flex flex-column">
								<p className="text2 text-center fw-bold">Wallet ID</p>
								<p className="text-center">1234567890</p>
								<p
									className="mt-auto myCursor"
									onClick={() => {
										navigator.clipboard.writeText("123456789").then(
											() => {
												toast.info("Copied");
											},
											err => {
												toast.warn(`Could not copy: ${err}`);
											}
										);
									}}>
									Copy <BiCopy />{" "}
								</p>
							</div>
							<div className="lilacBg h-100 rounded10 p-3 py-5 genWalletWidth mx-md-4 mx-3 my-3 my-md-0">
								<p className="text2 mb-5 text-dark fw-bold">Fund Wallet</p>
								<Buttons
									onClick={toggleVirtual}
									css={"btn-dark rounded10 text-capitalize my-3 py-3"}
									title="virtual account"
								/>
								<Buttons
									onClick={toggleCard}
									css={"btn-dark rounded10 text-capitalize my-3 py-3"}
									title="debit card"
								/>
							</div>
							<div className="greyBg h-100 rounded10 p-3 py-5 genWalletWidth">
								<p className="text2 text-dark fw-bold">Cards</p>
								<CardList bg />
							</div>
						</div>
					</div>
				</div>{" "}
				<div className="d-flex my-4">
					<Link
						to={`/wallets/commissions`}
						className="rounded20 shadow2 p-md-5 p-4 mx-2 mx-md-3 eachProduct myCursor text-dark text-decoration-none text-center">
						<div>
							<h6>Commission</h6>
							<h5>NGN 2000</h5>
						</div>
					</Link>
					<Link
						to={`/wallets/bonus`}
						className="rounded20 shadow2 p-md-5 p-4 mx-2 mx-md-3 eachProduct myCursor text-dark text-decoration-none text-center">
						<div>
							<h6>Bonus</h6>
							<h5>NGN 2000</h5>
						</div>
					</Link>
				</div>
				<div className="row mx-0 g-4">
					<div className="col-md-9">
						<div className="btn-group">
							<button className="btn text-dark text-capitalize border-bottom fw-bold">
								transfer
							</button>
							<button className="btn text-dark text-capitalize fw-bold text-muted">
								cards
							</button>
						</div>
						<div>
							<TransferList />
						</div>
					</div>
					<div
						className="col-md-3 rounded10 p-3"
						style={{ background: "#FCFCF9" }}>
						<h5 className="fw-bold">Your activity</h5>
						<RoundCharts
							state={[
								{
									name: "expenses",
									value: 500,
									color: "#FEC430",
								},
								{
									name: "commission",
									value: 3000,
									color: "#AD9BB1",
								},
								{ name: "income", value: 4000, color: "#63B0C4" },
								{ name: "sales", value: 1500, color: "#B9BBBC" },
							]}
							type="pie"
							css="h-100 w-100"
							noLegend
						/>
					</div>
				</div>
			</Container>{" "}
			<MakeTransfer isOpen={isTransfer} back={toggleTransfer} />
			<MakeWithdraw isOpen={isWithdraw} back={toggleWithdraw} />
			<MakeCards isOpen={isCard} back={toggleCard} />
			<MakeVirtual isOpen={isVirtual} back={toggleVirtual} />
		</div>
	);
};

export default Wallets;

const MakeWithdraw = ({ isOpen, back }) => {
	return (
		<>
			<ModalComponents isOpen={isOpen} back={back} title="Choose card">
				<form>
					<CardList />
					<Buttons
						title={"withdraw"}
						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
						width={"w-50"}
						style={{ borderRadius: "30px" }}
					/>
				</form>
			</ModalComponents>
		</>
	);
};

const MakeCards = ({ isOpen, back }) => {
	return (
		<>
			<ModalComponents isOpen={isOpen} back={back} title="Choose card">
				<form>
					<CardList />
					<Buttons
						title={"fund"}
						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
						width={"w-50"}
						style={{ borderRadius: "30px" }}
					/>
				</form>
			</ModalComponents>
		</>
	);
};

const MakeVirtual = ({ isOpen, back }) => {
	let accountType = [
		{ name: "Rolex account", number: 1234567890 },
		{ name: "Rolex account", number: 1234567890 },
		{ name: "Rolex account", number: 1234567890 },
		{ name: "Rolex account", number: 1234567890 },
	];
	return (
		<>
			<ModalComponents isOpen={isOpen} back={back} title="Choose accounts">
				<form>
					<div>
						{accountType?.map((it, i) => (
							<div
								key={i}
								className="my-3 d-flex align-items-center rounded10 bg-light p-3">
								<div className="d-flex me-2">
									<div
										className="p-3 d-flex rounded10 align-items-center justify-content-center"
										style={{ background: `${colorArr[i % colorArr?.length]}` }}>
										<RiShieldStarFill
											size={24}
											color={`${
												colorArr[i % colorArr?.length] === "#000000"
													? "#fff"
													: "#000"
											}`}
										/>
									</div>
								</div>
								<div>
									<h6 className="fw-bold text-muted">{it?.name}</h6>
									<h6 className="fw-bold">
										{it?.number}{" "}
										<BiCopy
											size={20}
											className="ms-3 myCursor"
											onClick={() => {
												navigator.clipboard.writeText(it?.number).then(
													() => {
														toast.info("Copied");
													},
													err => {
														toast.warn(`Could not copy: ${err}`);
													}
												);
											}}
										/>{" "}
									</h6>
								</div>
							</div>
						))}
					</div>
					<Buttons
						title={"fund"}
						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
						width={"w-50"}
						style={{ borderRadius: "30px" }}
					/>
				</form>
			</ModalComponents>
		</>
	);
};

const MakeTransfer = ({ isOpen, back }) => {
	return (
		<>
			<ModalComponents isOpen={isOpen} back={back} title="Transfer">
				<form>
					<div className="mb-4">
						<label htmlFor="Newtwork">Select type</label>
						<select
							name="network"
							id="network"
							className="form-control form-select py-3 rounded10">
							<option value="mtn">bouus to wallet</option>
						</select>
					</div>
					<div className="mb-4">
						<label htmlFor="value">Amount</label>
						<input
							type={"number"}
							placeholder="500"
							className="form-control py-3 rounded10"
						/>
					</div>
					<Buttons
						title={"continue"}
						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
						width={"w-50"}
						style={{ borderRadius: "30px" }}
					/>
				</form>
			</ModalComponents>
		</>
	);
};

export const BonusCommission = () => {
	let userList = [
		{
			title: "Honourworld",
			createdAt: Date.now(),
			balance: "50000",
			initial: "80000",
			description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid dolorum delectus libero! Illum suscipit obcaecati numquam consequuntur placeat dolor repellat blanditiis molestiae, aut vitae voluptatem est dolorem ex. At, ea.`,
			type: "credit",
		},
	];

	return (
		<div className="pb-5 my-5">
			<div className="bland row mx-0 py-3 px-0 text-capitalize">
				<div className="col textTrunc">Title</div>
				<div className="col textTrunc d-none d-md-flex">date</div>
				<div className="col textTrunc d-none d-md-flex">Description</div>
				<div className="col textTrunc">Amount</div>
				<div className="col textTrunc">Previous balance</div>
				<div className="col textTrunc">Type</div>
			</div>
			<div className="bland2 row mx-0">
				{userList?.map((item, index) => (
					<div key={index} className="row mx-0 py-3 px-0">
						<div className="col textTrunc my-auto">{item?.title}</div>
						<div className="col textTrunc my-auto d-none d-md-flex">
							{moment(item?.createdAt).format("L")}
						</div>
						<div className="col textTrunc my-auto textTrunc textTrunc3 d-none d-md-flex">
							{item?.description}
						</div>
						<div className="col textTrunc my-auto">{item?.balance}</div>
						<div className="col textTrunc my-auto">{item?.initial}</div>
						<div className="col textTrunc my-auto text-success">
							{item?.type}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const TransferList = () => {
	let list = [
		{
			name: "Wema Bank",
			amount: "4000",
			createdAt: Date.now(),
		},
		{
			name: "UBA Bank",
			amount: "4000",
			createdAt: Date.now(),
		},
		{
			name: "Gt Bank",
			amount: "4000",
			createdAt: Date.now(),
		},
		{
			name: "Sterling Bank",
			amount: "4000",
			createdAt: Date.now(),
		},
		{
			name: "Zenith Bank",
			amount: "4000",
			createdAt: Date.now(),
		},
	];
	return (
		<>
			{list?.map((it, i) => (
				<div key={i} className="row mx-0 my-2">
					<div className="col">
						<div className="d-flex">
							<div
								className="p-3 d-flex rounded10 align-items-center justify-content-center"
								style={{ background: `${colorArr[i % colorArr?.length]}` }}>
								<RiShieldStarFill
									size={24}
									color={`${
										colorArr[i % colorArr?.length] === "#000000"
											? "#fff"
											: "#000"
									}`}
								/>
							</div>
						</div>
					</div>
					<div className="col">
						<strong>{it?.name}</strong>
					</div>
					<div className="col">{it?.amount}</div>
					<div className="col">{moment(it?.createdAt).format("DD/MM")}</div>
					<div className="col">
						<div className="d-flex">
							<div className="p-3 d-flex rounded10 align-items-center justify-content-center shadow2 myCursor horizHover">
								<BiDotsHorizontalRounded size={24} />
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	);
};

let CardList = ({ bg }) => {
	let list = ["5399", "5366"];
	return (
		<>
			<div>
				{list?.map((it, i) => (
					<div
						key={i}
						className={`my-3 d-flex align-items-center rounded10 ${
							bg ? "" : "bg-light "
						}p-3`}>
						<div className="d-flex me-2">
							<div
								className="p-3 d-flex rounded10 align-items-center justify-content-center"
								style={{ background: i % 2 === 0 ? "#EFEFEF" : "#34302F" }}>
								<FaCcMastercard
									size={30}
									color={i % 2 !== 0 ? "#EFEFEF" : "#34302F"}
								/>
							</div>
						</div>
						<div>
							<h6 className="fw-bold text-dark">*{it}</h6>
							<small className="fw-bold text-dark">Mastercard</small>
							{/* <h6 className="fw-bold">
								{it?.number}{" "}
								<BiCopy
									size={20}
									className="ms-3 myCursor"
									onClick={() => {
										navigator.clipboard.writeText(it?.number).then(
											() => {
												toast.info("Copied");
											},
											err => {
												toast.warn(`Could not copy: ${err}`);
											}
										);
									}}
								/>{" "}
							</h6> */}
						</div>
					</div>
				))}
			</div>
		</>
	);
};
