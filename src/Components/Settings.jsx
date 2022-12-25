import React, { useContext, useEffect, useState } from "react";
import { Container } from "reactstrap";
import { GlobalState } from "../Data/Context";
import user from "../Assets/avatar3.png";
import { toast } from "react-toastify";
import { BsImage } from "react-icons/bs";
import { Buttons } from "../Utils";
import moment from "moment";
import { ModalComponents } from "./DefaultHeader";

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
		};

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
				<div className="d-flex justify-content-between align-items-center mb-3 px-3 px-md-5">
					<div>
						<h4 className="Lexend fw-600 fontReduceBig">My Account settings</h4>
						<div>
							<button
								className="btn btn-outline-primary1
								text-capitalize px-md-4 px-2 mx-1 mx-md-3 py-1 py-md-2 fontReduce2 text-dark">
								profile
							</button>
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
						<button
							className={`btn btn-outline-primary1 text-capitalize px-md-4 px-2 mx-1 mx-md-3 py-1 py-md-2 fontReduce2 text-dark`}>
							remove
						</button>
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
											css="btn btn-gradient text-capitalize py-3 my-4"
											title={"Update profile image"}
										/>
									)}
								</div>
							</div>
						</ModalComponents>
					</div>
				</div>
			</div>
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
					/>
				</div>
			</div>
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
