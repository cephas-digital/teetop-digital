import React, { useState } from "react";
import { DefaultAuthComponent } from "../../Screens/register";
import { Buttons } from "../../Utils";

const AddTrasnaction = () => {
	let init = {
		transaction_date: "",
		description: "",
		amount: "",
	};
	let [state, setState] = useState(init),
		textChange =
			name =>
			({ target: { value } }) => {
				setState({ ...state, [name]: value });
			};
	return (
		<>
			<DefaultAuthComponent bg noLogo>
				<section className="col-lg-7 my-auto">
					<h3 className="text-capitalize text-center">new transaction</h3>
					<form className="mt-4">
						<div className="mb-3">
							<label htmlFor="name">Transaction date</label>
							<input
								type="date"
								required
								name="transaction_date"
								className="form-control py-3"
								value={state?.transaction_date}
								onChange={textChange("transaction_date")}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="name">Description</label>
							<textarea
								required
								name="description"
								className="form-control py-3"
								value={state?.description}
								onChange={textChange("description")}
								style={{ height: "10rem", resize: "none" }}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="name">Amount</label>
							<input
								type="number"
								required
								name="amount"
								className="form-control py-3"
								value={state?.amount}
								onChange={textChange("amount")}
							/>
						</div>
						<Buttons
							title={"create transaction"}
							css="btn-primary1 text-capitalize py-3 w-50 my-4"
							width={"w-50"}
							style={{ borderRadius: "30px" }}
						/>
					</form>
				</section>
			</DefaultAuthComponent>
		</>
	);
};

export default AddTrasnaction;
