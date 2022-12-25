import React from "react";
import { Container } from "reactstrap";
import TransactionsFolder, { TopFolder } from "../../Components/Transactions";

const MainTransactions = () => {
	return (
		<Container>
			<TopFolder />
			<TransactionsFolder />
		</Container>
	);
};

export default MainTransactions;
