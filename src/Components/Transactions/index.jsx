import moment from "moment";
import React from "react";
import { BiCog } from "react-icons/bi";
import icon1 from "../../Assets/Fresh Folk Teamwork.png";
import icon2 from "../../Assets/Finance.png";
import icon3 from "../../Assets/Support.png";
import { ThreeBoxBar } from "../Users";

const TransactionsFolder = () => {
	let userList = [
		{
			name: "Honourworld",
			createdAt: Date.now(),
			amount: "50000",
			id: "1234567890",
			description: `
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita, id quas. Expedita ducimus nisi, ipsum quae fugiat ut deserunt aliquid delectus autem cupiditate perferendis aperiam harum? Ut laboriosam, ad, numquam, laborum ratione recusandae est rerum obcaecati ipsa distinctio aliquid quod.`,
			status: "pending",
		},
	];

	return (
		<div className="pb-5 my-5">
			<div className="bland row mx-0 p-3 text-capitalize">
				<div className="col textTrunc">Name</div>
				<div className="col textTrunc d-none d-md-flex">ID</div>
				<div className="col textTrunc d-none d-md-flex">Date</div>
				<div className="col textTrunc d-none d-md-flex">description</div>
				<div className="col textTrunc">Amount</div>
				<div className="col textTrunc">Status</div>
				<div className="col textTrunc">Action</div>
			</div>
			<div className="bland2 row mx-0">
				{userList?.map((item, index) => (
					<div key={index} className="row mx-0 p-3">
						<div className="col textTrunc my-auto">{item?.name}</div>
						<div className="col textTrunc d-none d-md-flex my-auto">
							{item?.id}
						</div>
						<div className="col textTrunc my-auto d-none d-md-flex">
							{moment(item?.createdAt).format("L")}
						</div>
						<div className="col textTrunc d-none d-md-flex my-auto textTrunc textTrunc4">
							{item?.description}
						</div>
						<div className="col textTrunc my-auto">{item?.amount}</div>
						<div className="col textTrunc my-auto">{item?.status}</div>
						<div className="col textTrunc my-auto">
							<BiCog size={24} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default TransactionsFolder;

export const TopFolder = () => {
	let usersArr = [
		{
			icon: icon1,
			name: "Total Transactions",
			number: 6500,
			color: "linear-gradient(90.18deg, #84C7DB -52.19%, #377FB6 81.92%)",
		},
		{
			icon: icon2,
			name: "Today's transactions",
			number: 5000,
			color:
				"linear-gradient(90deg, rgba(228, 51, 105, 0.7) 16.14%, rgba(194, 14, 25, 0.7) 101.45%)",
		},
		{
			icon: icon3,
			name: `${moment().format("MMMM")}'s transactions`,
			number: 4000,
			color:
				"linear-gradient(96.86deg, rgba(83, 242, 147, 0.8) 18.88%, rgba(158, 255, 0, 0.8) 125.77%)",
		},
	];

	return <ThreeBoxBar list={usersArr} />;
};
