import React, { useContext, useEffect, useState } from "react";
import { Container } from "reactstrap";
import { GlobalState } from "../Data/Context";
import user from "../Assets/avatar3.png";
import { toast } from "react-toastify";
import { BsImage } from "react-icons/bs";
import { Buttons } from "../Utils";
import moment from "moment";
import { ModalComponents } from "./DefaultHeader";
import { useParams } from "react-router-dom";

const MainSettings = () => {
	const { auth, updateUser, setStateName } = useContext(GlobalState);

	useEffect(() => {
		setStateName("settings");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [state, setState] = useState(null),
		[logo, setLogo] = useState(false),
		[isOpen, setIsOpen] = useState(false),
		[loading, setLoading] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		},
		[active, setActive] = useState(0);

	useEffect(() => {
		setState(auth?.user);
	}, [auth?.user]);

	let handleChangeImage = e => {
			const file = e.target.files[0];
			let err = "";

			if (!file) return (err = `File, ${file?.name} does not exist`);
			if (!file.type.includes("image"))
				return (err = `File, ${file?.name} format not supported`);

			if (err) {
				return toast.error(err);
			} else {
				setLogo(file);
			}
		},
		handleSubmit = type => async e => {
			if (e) e.preventDefault();
			if (type === "profile-image") {
				if (!logo) return toast.info("Image required");
				setLoading(true);
				await updateUser({ logo }, "profile-image");
				setLoading(false);
			} else {
				if (!state?.gender && !state?.bio)
					return toast.info("Gender or bio required");
				setLoading(true);
				await updateUser(state);
				setLoading(false);
			}
		};

	let textChange =
		name =>
		({ target: { value } }) => {
			setState({ ...state, [name]: value });
		};

	// if (!state) return;

	return (
		<div className="py-4 bg-white aboutScreen">
			<Container className="py-5">
				<div className="d-flex justify-content-between align-items-center mb-3 px-md-4 px-2">
					<div>
						<h4 className="Lexend fw-600 fontReduceBig">My Account settings</h4>
						<div>
							<button
								onClick={() => setActive(0)}
								className={`btn ${
									active !== 0 ? "btn-light" : "btn-outline-primary1"
								}
								text-capitalize px-md-4 px-2 mx-1 mx-md-3 py-1 py-md-2 fontReduce2 text-dark`}>
								profile
							</button>
							{auth?.user?.privilege === "agent" && (
								<button
									onClick={() => setActive(1)}
									className={`btn ${
										active !== 1 ? "btn-light" : "btn-outline-primary1"
									}
								text-capitalize px-md-4 px-2 mx-1 mx-md-3 py-1 py-md-2 fontReduce2 text-dark`}>
									settings
								</button>
							)}
						</div>
					</div>
					<div className="d-flex align-items-center">
						<img
							src={auth?.user?.avatar?.url ? auth?.user?.avatar?.url : user}
							alt={`img`}
							style={{
								height: "7rem",
								width: "7rem",
								objectFit: "cover",
								objectPosition: "center 15%",
							}}
							className="rounded-circle img-fluid mx-3"
						/>
						<div className="d-none d-md-block">
							<h5 className="Lexend">
								{auth?.user?.firstName} {auth?.user?.lastName}
							</h5>
							<small className="text-uppercase">{auth?.user?.privilege}</small>
						</div>
					</div>
				</div>
				{active === 1 ? (
					<GeneralSettings />
				) : (
					<ProfileSetup
						state={state}
						textChange={textChange}
						handleChangeImage={handleChangeImage}
						handleSubmit={handleSubmit}
						toggle={toggle}
						logo={logo}
						loading={loading}
						isOpen={isOpen}
					/>
				)}
			</Container>
		</div>
	);
};

export default MainSettings;

const ProfileSetup = ({
	state,
	textChange,
	isOpen,
	toggle,
	logo,
	handleChangeImage,
	handleSubmit,
	loading,
}) => {
	return (
		<>
			<div className="px-md-4 px-2 mb-5">
				<h5 className="Lexend fw-600 fontReduceBig">Profile</h5>
				<p className="fontReduce2">Upload phone and personal details here</p>
				<h5 className="mt-3 Lexend fw-600 fontReduceBig">Photos</h5>
				<div className="d-flex align-items-center">
					<img
						src={state?.avatar?.url ? state?.avatar?.url : user}
						alt={`img`}
						style={{
							height: "4rem",
							width: "4rem",
							objectFit: "cover",
							objectPosition: "center 15%",
						}}
						className="rounded-circle img-fluid mx-3"
					/>
					<div className="d-flex align-items-center">
						{/* <button
							className={`btn btn-outline-primary1 text-capitalize px-md-4 px-2 mx-1 mx-md-3 py-1 py-md-2 fontReduce2 text-dark`}>
							remove
						</button> */}
						<button
							onClick={toggle}
							className={`btn btn-light text-capitalize px-md-4 px-2 mx-1 mx-md-3 py-1 py-md-2 fontReduce2 text-dark`}>
							change
						</button>
						<ModalComponents
							isOpen={isOpen}
							back={toggle}
							title="Update profile image">
							<div className="d-flex">
								<div className="mx-auto position-relative">
									<img
										src={
											logo
												? URL.createObjectURL(logo)
												: state?.avatar?.url
												? state?.avatar.url
												: user
										}
										alt={state?.firstName}
										style={{
											height: "15rem",
											width: "15rem",
										}}
										className="rounded-circle img-fluid mx-auto"
									/>
									<div className="file_upload d-flex myCursor mt-auto ms-auto justify-content-end">
										<BsImage
											size={22}
											title="Upload image"
											className="mx-2 myCursor statusIcon"
										/>
										<input
											title="Upload file"
											type="file"
											name="file"
											id="file"
											multiple
											className="myCursor"
											accept="image/*"
											onChange={handleChangeImage}
										/>
									</div>
									{logo && (
										<Buttons
											onClick={handleSubmit("profile-image")}
											loading={logo && loading}
											css="btn btn-primary1 text-capitalize py-3 my-4"
											title={"Update profile image"}
										/>
									)}
								</div>
							</div>
						</ModalComponents>
					</div>
				</div>
			</div>
			<ProfileForm state={state} textChange={textChange} />
			<div className="d-flex justify-content-end my-3">
				<div className="d-flex align-items-center">
					<Buttons
						onClick={handleSubmit("update")}
						loading={!logo && loading}
						width=""
						css="btn-primary1 text-capitalize px-md-4 px-2 mx-1 mx-md-3 py-1 py-md-2 fontReduce2 text-white"
						title={"save"}
					/>
					<button
						className={`btn btn-outline-primary1 text-capitalize px-md-4 px-2 mx-1 mx-md-3 py-1 py-md-2 fontReduce2 text-primary1`}>
						cancel
					</button>
				</div>
			</div>
		</>
	);
};

const GeneralSettings = () => {
	const { settings, getSettings, numberWithCommas } = useContext(GlobalState);

	let [mtnCommission, setMTNCommission] = useState(""),
		[gloCommission, setGLOCommission] = useState(""),
		[airtelCommission, setAIRTELCommission] = useState(""),
		[mobile9Commission, set9MobileCommission] = useState(""),
		[cablesCommission, setCablesCommission] = useState(""),
		[electricityCommission, setElectricityCommission] = useState(""),
		[minimumDeposit, setMinimumDeposit] = useState(""),
		[stateData, setStateData] = useState(null),
		[loading, setLoading] = useState(false),
		[loadingType, setLoadingType] = useState(false),
		[submit, setSubmit] = useState(false);

	useEffect(() => {
		setStateData(settings?.settings);
	}, [settings?.settings]);

	useEffect(() => {
		if (submit && settings?.isUpdated) {
			setMinimumDeposit("");
			setMTNCommission("");
			setGLOCommission("");
			setAIRTELCommission("");
			set9MobileCommission("");
			setCablesCommission("");
			setElectricityCommission("");
			setSubmit(false);
		}
	}, [settings?.isUpdated, submit]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// console.log({ settings });

	let handleSubmit = type => async () => {
		if (type === "mtnCommission") if (!mtnCommission) return;
		if (type === "gloCommission") if (!gloCommission) return;
		if (type === "airtelCommission") if (!airtelCommission) return;
		if (type === "mobile9Commission") if (!mobile9Commission) return;
		if (type === "cablesCommission") if (!cablesCommission) return;
		if (type === "electricityCommission") if (!electricityCommission) return;
		if (type === "minimum-deposit") if (!minimumDeposit) return;

		let data;
		if (type === "mtnCommission")
			data = {
				mtnCommission: mtnCommission ? mtnCommission : stateData?.mtnCommission,
			};
		if (type === "gloCommission")
			data = {
				gloCommission: gloCommission ? gloCommission : stateData?.gloCommission,
			};
		if (type === "airtelCommission")
			data = {
				airtelCommission: airtelCommission
					? airtelCommission
					: stateData?.airtelCommission,
			};
		if (type === "mobile9Commission")
			data = {
				mobile9Commission: mobile9Commission
					? mobile9Commission
					: stateData?.mobile9Commission,
			};
		if (type === "cablesCommission")
			data = {
				cablesCommission: cablesCommission
					? cablesCommission
					: stateData?.cablesCommission,
			};
		if (type === "electricityCommission")
			data = {
				electricityCommission: electricityCommission
					? electricityCommission
					: stateData?.electricityCommission,
			};
		if (type === "minimum-deposit")
			data = {
				minimumDeposit: minimumDeposit
					? minimumDeposit
					: stateData?.minimumDeposit,
			};
		// console.log({ data, state });
		setLoadingType(type);
		setLoading(true);
		await getSettings(data);
		setLoading(false);
		setLoadingType(false);
		setSubmit(false);
	};

	return (
		<Container className="px-lg-5  pt-3 pt-lg-0">
			<div className="mb-5">
				<h5 className="Lexend fw-600 fontReduceBig">General settings</h5>
			</div>
			<div>
				<p className="fontReduce">
					MTN commission: {stateData?.mtnCommission}%
				</p>
				<p className="fontReduce">
					GLO commission: {stateData?.gloCommission}%
				</p>
				<p className="fontReduce">
					AIRTEL commission: {stateData?.airtelCommission}%
				</p>
				<p className="fontReduce">
					9MOBILE commission: {stateData?.mobile9Commission}%
				</p>
				<p className="fontReduce">
					Electricity commission: {stateData?.electricityCommission}%
				</p>
				<p className="fontReduce">
					Cables commission: {stateData?.cablesCommission}%
				</p>
				<p className="fontReduce">
					Minimum amount to be funded: NGN{" "}
					{numberWithCommas(Number(stateData?.minimumDeposit).toFixed(2))}
				</p>
			</div>
			<div className="row mx-0 g-4 pt-5">
				<div className="mb-3 d-flex justify-content-center col-md-6">
					<div className="w-75 w75">
						<label
							htmlFor="Price"
							className="mb-3 textColor2 text-capitalize fontReduce">
							MTN commission
						</label>
						<input
							type="number"
							name="Price"
							className="form-control w-100 py-3 borderColor"
							placeholder="2%"
							value={mtnCommission}
							onChange={e => setMTNCommission(e.target.value)}
						/>
						<Buttons
							loading={loadingType === "mtnCommission" && loading}
							title="update"
							css="btn btn-primary1 text-capitalize py-3 w-75 w75 d-block mx-auto my-4"
							width={"w-75 w75"}
							onClick={handleSubmit("mtnCommission")}
						/>
					</div>
				</div>
				<div className="mb-3 d-flex justify-content-center col-md-6">
					<div className="w-75 w75">
						<label
							htmlFor="Price"
							className="mb-3 textColor2 text-capitalize fontReduce">
							GLO commission
						</label>
						<input
							type="number"
							name="Price"
							className="form-control w-100 py-3 borderColor"
							placeholder="2%"
							value={gloCommission}
							onChange={e => setGLOCommission(e.target.value)}
						/>
						<Buttons
							loading={loadingType === "gloCommission" && loading}
							title="update"
							css="btn btn-primary1 text-capitalize py-3 w-75 w75 d-block mx-auto my-4"
							width={"w-75 w75"}
							onClick={handleSubmit("gloCommission")}
						/>
					</div>
				</div>
				<div className="mb-3 d-flex justify-content-center col-md-6">
					<div className="w-75 w75">
						<label
							htmlFor="Price"
							className="mb-3 textColor2 text-capitalize fontReduce">
							AIRTEL commission
						</label>
						<input
							type="number"
							name="Price"
							className="form-control w-100 py-3 borderColor"
							placeholder="2%"
							value={airtelCommission}
							onChange={e => setAIRTELCommission(e.target.value)}
						/>
						<Buttons
							loading={loadingType === "airtelCommission" && loading}
							title="update"
							css="btn btn-primary1 text-capitalize py-3 w-75 w75 d-block mx-auto my-4"
							width={"w-75 w75"}
							onClick={handleSubmit("airtelCommission")}
						/>
					</div>
				</div>
				<div className="mb-3 d-flex justify-content-center col-md-6">
					<div className="w-75 w75">
						<label
							htmlFor="Price"
							className="mb-3 textColor2 text-capitalize fontReduce">
							9MOBILE commission
						</label>
						<input
							type="number"
							name="Price"
							className="form-control w-100 py-3 borderColor"
							placeholder="2%"
							value={mobile9Commission}
							onChange={e => set9MobileCommission(e.target.value)}
						/>
						<Buttons
							loading={loadingType === "mobile9Commission" && loading}
							title="update"
							css="btn btn-primary1 text-capitalize py-3 w-75 w75 d-block mx-auto my-4"
							width={"w-75 w75"}
							onClick={handleSubmit("mobile9Commission")}
						/>
					</div>
				</div>
				<div className="mb-3 d-flex justify-content-center col-md-6">
					<div className="w-75 w75">
						<label
							htmlFor="Price"
							className="mb-3 textColor2 text-capitalize fontReduce">
							CABLES commission
						</label>
						<input
							type="number"
							name="Price"
							className="form-control w-100 py-3 borderColor"
							placeholder="2%"
							value={cablesCommission}
							onChange={e => setCablesCommission(e.target.value)}
						/>
						<Buttons
							loading={loadingType === "cablesCommission" && loading}
							title="update"
							css="btn btn-primary1 text-capitalize py-3 w-75 w75 d-block mx-auto my-4"
							width={"w-75 w75"}
							onClick={handleSubmit("cablesCommission")}
						/>
					</div>
				</div>
				<div className="mb-3 d-flex justify-content-center col-md-6">
					<div className="w-75 w75">
						<label
							htmlFor="Price"
							className="mb-3 textColor2 text-capitalize fontReduce">
							ELECTRICITY commission
						</label>
						<input
							type="number"
							name="Price"
							className="form-control w-100 py-3 borderColor"
							placeholder="2%"
							value={electricityCommission}
							onChange={e => setElectricityCommission(e.target.value)}
						/>
						<Buttons
							loading={loadingType === "electricityCommission" && loading}
							title="update"
							css="btn btn-primary1 text-capitalize py-3 w-75 w75 d-block mx-auto my-4"
							width={"w-75 w75"}
							onClick={handleSubmit("electricityCommission")}
						/>
					</div>
				</div>

				<div className="mb-3 d-flex justify-content-center col-md-6">
					<div className="w-75 w75">
						<label
							htmlFor="Price"
							className="mb-3 textColor2 text-capitalize fontReduce">
							Minimum amount to be funded
						</label>
						<input
							type="number"
							name="Price"
							className="form-control w-100 py-3 borderColor"
							placeholder="2,000"
							value={minimumDeposit}
							onChange={e => setMinimumDeposit(e.target.value)}
						/>
						<Buttons
							loading={loadingType === "minimum-deposit" && loading}
							title="update"
							css="btn btn-primary1 text-capitalize py-3 w-75 w75 d-block mx-auto my-4"
							width={"w-75 w75"}
							onClick={handleSubmit("minimum-deposit")}
						/>
					</div>
				</div>
			</div>
		</Container>
	);
};

export const ProfileForm = ({ state, textChange }) => {
	let params = useParams();
	return (
		<div className="row mx-0 g-3 g-md-5">
			<div className="col-md-6">
				<label className="dmMonoFont text-uppercase" htmlFor="firstName">
					First Name
				</label>
				<input
					type="text"
					className="form-control py-3 dmMonoFont"
					name="firstName"
					value={state?.firstName}
					onChange={textChange("firstName")}
					readOnly={params?.page === "users"}
				/>
			</div>
			<div className="col-md-6">
				<label className="dmMonoFont text-uppercase" htmlFor="lastName">
					Last Name
				</label>
				<input
					type="text"
					className="form-control py-3 dmMonoFont"
					name="lastName"
					value={state?.lastName}
					onChange={textChange("lastName")}
					readOnly={params?.page === "users"}
				/>
			</div>
			<div className="col-md-6">
				<label className="dmMonoFont text-uppercase" htmlFor="gender">
					Gender
				</label>
				<input
					type="text"
					className="form-control py-3 dmMonoFont"
					name="gender"
					value={state?.gender}
					onChange={textChange("gender")}
					placeholder="Gender"
					readOnly={params?.page === "users"}
				/>
			</div>
			<div className="col-md-6">
				<label className="dmMonoFont text-uppercase" htmlFor="date_of_birth">
					Date of birth
				</label>
				<input
					type="date"
					className="form-control py-3 dmMonoFont"
					name="date_of_birth"
					value={moment(state?.date_of_birth).format("YYYY-MM-DD")}
					onChange={textChange("date_of_birth")}
					placeholder="Date of birth"
					max={moment().format("YYYY-MM-DD")}
					readOnly={params?.page === "users"}
				/>
			</div>
			<div className="col-md-6">
				<label className="dmMonoFont text-uppercase" htmlFor="bio">
					Bio
				</label>
				<textarea
					style={{
						height: "10rem",
						resize: "none",
					}}
					className="form-control py-3 dmMonoFont"
					name="bio"
					placeholder="Brief description"
					value={state?.bio}
					onChange={textChange("bio")}
					readOnly={params?.page === "users"}
				/>
			</div>
		</div>
	);
};
