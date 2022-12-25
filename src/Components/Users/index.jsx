import React from "react";
import user from "../../Assets/avatar3.png";
import moment from "moment";
import { BiCog } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Users = () => {
	return <div>Users</div>;
};

export default Users;

export const ThreeBoxBar = ({ list }) => {
	let navigate = useNavigate();
	return (
		<>
			<div className="row mx-0 g-2 g-md-4 my-3 my-md-5">
				{list?.map((item, index) => (
					<div className="col-6 col-md-4 productCard" key={index}>
						<div
							className="row mx-0 p-3 eachProduct rounded20 text-white h-100"
							onClick={() => (item?.link ? navigate(item?.link) : {})}
							style={{
								background: item?.color,
							}}>
							<div className="col my-auto d-none d-md-flex">
								<img
									src={item?.icon}
									className="img-fluid w-100 h-100"
									alt="Icon"
								/>
							</div>
							<div className="col my-auto">
								<p className="text2 m-0">{item?.number}</p>
								<h6 className="text-capitalize">{item?.name}</h6>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export const UserListOne = () => {
	let userList = [
		{
			name: "Honourworld",
			avatar: user,
			createdAt: Date.now(),
			telephone: "081123456789",
			balance: "50000",
			wallet_id: "1234567890",
			email: "admin@hourworld.com",
		},
	];

	return (
		<div className="pb-5 my-5">
			<div className="bland row mx-0 p-3 text-capitalize">
				<div className="col textTrunc">Name</div>
				<div className="col textTrunc">number</div>
				<div className="col textTrunc d-none d-md-flex">date</div>
				<div className="col textTrunc">balance</div>
				<div className="col textTrunc d-none d-md-flex">Email</div>
				<div className="col textTrunc d-none d-md-flex">Wallet ID</div>
				<div className="col textTrunc">Action</div>
			</div>
			<div className="bland2 row mx-0">
				{userList?.map((item, index) => (
					<div key={index} className="row mx-0 p-3">
						<div className="col textTrunc my-auto">
							<div className="d-flex align-items-center">
								<img
									src={item?.avatar}
									alt="User"
									className="img-fluid rounded-circle d-none d-md-flex"
									style={{
										height: "3rem",
										width: "3rem",
									}}
								/>
								<span className="fontInherit my-0 ps-0 ps-md-1 textTrunc">
									{item?.name}
								</span>
							</div>
						</div>
						<div className="col textTrunc my-auto">{item?.telephone}</div>
						<div className="col textTrunc my-auto d-none d-md-flex">
							{moment(item?.createdAt).format("L")}
						</div>
						<div className="col textTrunc my-auto">{item?.balance}</div>
						<div className="col textTrunc my-auto d-none d-md-flex">
							{item?.email}
						</div>
						<div className="col textTrunc my-auto d-none d-md-flex">
							{item?.wallet_id}
						</div>
						<div className="col textTrunc my-auto">
							<BiCog size={24} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
