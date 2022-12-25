import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "reactstrap";
import { ModalComponents } from "../../Components";
import { GlobalState } from "../../Data/Context";
import { Buttons } from "../../Utils";

const Controls = () => {
	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("Controls");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	let params = useParams(),
		navigate = useNavigate(),
		controlsTab = [
			{ name: "new data bundle", type: "button", link: "bundle" },
			{
				name: "TV subscription",
				type: "link",
				link: `/${params?.page}/tv-subscriptions`,
			},
			{
				name: "bills plans",
				type: "link",
				link: `/${params?.page}/bills`,
			},
			{
				name: "broadcast",
				type: "link",
				link: `/${params?.page}/broadcasts`,
			},
			{ name: "give bonus", type: "button", link: "bonus" },
		];
	let [isBundle, setIsBundle] = useState(false),
		[isBonus, setIsBonus] = useState(false),
		toggleBundle = () => {
			setIsBundle(!isBundle);
		},
		toggleBonus = () => {
			setIsBonus(!isBonus);
		};
	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5 d-flex justify-content-center align-items-center aboutScreen">
				<div
					className="m-auto shadow2 p-3 py-5 p-md-5 rounded20"
					style={{ maxWidth: "600px" }}>
					<div className="row mx-0 g-2 g-md-4">
						{controlsTab?.map((it, i) => (
							<div className="col-6 p-1 p-md-3" key={i}>
								<button
									style={{ borderRadius: "30px" }}
									onClick={() => {
										if (it?.type === "link") {
											navigate(it?.link);
										} else if (it?.type === "button") {
											if (it?.link === "bundle") toggleBundle();
											if (it?.link === "bonus") toggleBonus();
										}
									}}
									className="btn btn-outline-primary1 py-2 py-md-3 text-capitalize w-100 textTrunc">
									<span className="textTrunc">{it?.name}</span>
								</button>
							</div>
						))}
					</div>
				</div>
			</Container>
			<MakeBonus isOpen={isBonus} back={toggleBonus} />
			<MakeBundle isOpen={isBundle} back={toggleBundle} />
		</div>
	);
};

export default Controls;

const MakeBonus = ({ isOpen, back }) => {
	return (
		<>
			<ModalComponents isOpen={isOpen} back={back} title="Bonus">
				<form>
					<div className="form mb-3">
						<label htmlFor="bundle">Title</label>
						<input
							type="text"
							className="form-control rounded10 py-3"
							placeholder="Enter title"
						/>
					</div>
					<div className="form mb-3">
						<label htmlFor="bundle">Description</label>
						<textarea
							className="form-control rounded10 py-3"
							placeholder="Enter description"
							style={{
								resize: "none",
								height: "7rem",
							}}
						/>
					</div>
					<div className="form mb-3">
						<label htmlFor="bundle">Select target</label>
						<select className="form-control rounded10 py-3 form-select">
							<option value="ringo">Agent</option>
						</select>
					</div>
					<div className="form mb-3">
						<label htmlFor="bundle">Select wallet_id</label>
						<input
							type="text"
							className="form-control rounded10 py-3"
							placeholder="123456789"
						/>
					</div>
					<Buttons
						title={"send"}
						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
						width={"w-50"}
						style={{ borderRadius: "30px" }}
					/>
				</form>
			</ModalComponents>
		</>
	);
};

const MakeBundle = ({ isOpen, back }) => {
	return (
		<>
			<ModalComponents isOpen={isOpen} back={back} title="new Bundle">
				<form className="row mx-0">
					<div className="form mb-3 col-6">
						<label htmlFor="bundle">Title</label>
						<input
							type="text"
							className="form-control rounded10 py-3"
							placeholder="Enter title"
						/>
					</div>
					<div className="form mb-3 col-6">
						<label htmlFor="bundle">Choose biller</label>
						<select className="form-control rounded10 py-3 form-select">
							<option value="ringo">Ringo</option>
						</select>
					</div>
					<div className="form mb-3 col-6">
						<label htmlFor="bundle">Choose network</label>
						<select className="form-control rounded10 py-3 form-select">
							<option value="mtn">MTN</option>
						</select>
					</div>
					<div className="form mb-3 col-6">
						<label htmlFor="bundle">Price</label>
						<input
							type="number"
							className="form-control rounded10 py-3"
							placeholder="200"
						/>
					</div>
					<div className="form mb-3 col-6">
						<label htmlFor="bundle">Network ID</label>
						<input
							type="text"
							className="form-control rounded10 py-3"
							placeholder="1234567"
						/>
					</div>
					<div className="form mb-3 col-6">
						<label htmlFor="bundle">Plan ID</label>
						<input
							type="text"
							className="form-control rounded10 py-3"
							placeholder="1234567"
						/>
					</div>
					<div className="form mb-3 col-6">
						<label htmlFor="bundle">Validity</label>
						<input
							type="text"
							className="form-control rounded10 py-3"
							placeholder="1"
						/>
					</div>
					<div className="form mb-3 col-6">
						<label htmlFor="bundle">HW Code</label>
						<input
							type="text"
							className="form-control rounded10 py-3"
							placeholder="1234"
						/>
					</div>
					<div className="form mb-3 col-6">
						<label htmlFor="bundle">Allowance</label>
						<input
							type="text"
							className="form-control rounded10 py-3"
							placeholder=""
						/>
					</div>
				</form>
				<Buttons
					title={"create bundle"}
					css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
					width={"w-50"}
					style={{ borderRadius: "30px" }}
				/>
			</ModalComponents>
		</>
	);
};
