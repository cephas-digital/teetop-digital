import React, { useState } from "react";
import { Container } from "reactstrap";

const Notification = () => {
	let [active, setActive] = useState(0),
		btnTab = ["incoming", "outgoing"];
	return (
		<div className="py-4 bg-white aboutScreen">
			<Container className="py-5">
				<div className="btn-group w-100">
					{btnTab?.map((item, i) => (
						<button
							key={i}
							className={`btn py-3 text-capitalize fw-bold ${
								i === active ? "border-bottom textColor" : ""
							} rounded-0`}
							onClick={() => setActive(i)}>
							{item} notifications
						</button>
					))}
				</div>
			</Container>
		</div>
	);
};

export default Notification;
