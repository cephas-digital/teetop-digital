import {
	ADD_FUND,
	ADD_FUND_FAIL,
	FUND_WALLET,
	FUND_WALLET_FAIL,
	GENERATE_VIRTUAL,
	GENERATE_VIRTUAL_FAIL,
	GET_ALL_BONUS,
	GET_ALL_MANUAL,
	GET_BONUS,
	GET_CARDS,
	GET_CARDS_FAIL,
	GET_COMMISSION,
	GET_HONOUR_BALANCE,
	GET_HONOUR_BALANCE_FAIL,
	GET_WALLET,
	GET_WALLET_BALANCE,
	GET_WALLET_BALANCE_FAIL,
	GET_WALLET_FAIL,
	GIVE_BONUS,
	GIVE_BONUS_FAIL,
	LOGOUT,
	MOVE_BONUS,
	MOVE_BONUS_FAIL,
	MOVE_COMMISSION,
	MOVE_COMMISSION_FAIL,
	TRANSFER_FUND,
	TRANSFER_FUND_FAIL,
} from "../Actions/ActionTypes";

let init = {
	wallet: [],
	isAdded: false,
	isFunded: false,
	paginate: null,
	balance: null,
	isTransfer: false,
	cards: [],
	isGenerated: null,
	honour_balance: null,
	manual: [],
	paginate_manual: null,
};

const WalletReducer = (state = init, action) => {
	let { type, payload } = action;

	switch (type) {
		case GET_ALL_MANUAL:
			return {
				...state,
				manual: payload?.data,
				paginate_manual: payload?.paginate,
			};
		case GET_WALLET:
			return { ...state, wallet: payload?.data, paginate: payload?.paginate };
		case GET_WALLET_FAIL:
			return { ...state, wallet: state?.wallet, manual: state.manual };
		case FUND_WALLET:
			return {
				...state,
				isFunded: true,
				wallet: [payload?.data ? payload?.data : payload, ...state?.wallet],
				paginate: {
					...state?.paginate,
					result: state?.paginate?.result + 1,
					total: state?.paginate?.total + 1,
				},
			};
		case FUND_WALLET_FAIL:
			return { ...state, isFunded: false };
		case ADD_FUND:
			return {
				...state,
				isAdded: true,
				manual: [payload?.data ? payload?.data : payload, ...state?.manual],
				paginate_manual: {
					...state?.paginate_manual,
					result: state?.paginate_manual?.result + 1,
					total: state?.paginate_manual?.total + 1,
				},
			};
		case ADD_FUND_FAIL:
			return { ...state, isAdded: false };
		case GET_HONOUR_BALANCE:
			return {
				...state,
				honour_balance: payload?.data ? payload?.data : payload,
			};
		case GET_HONOUR_BALANCE_FAIL:
			return { ...state, honour_balance: state?.honour_balance };
		case GENERATE_VIRTUAL:
			return { ...state, isGenerated: true };
		case GENERATE_VIRTUAL_FAIL:
			return { ...state, isGenerated: false };
		case TRANSFER_FUND:
			return {
				...state,
				isTransfer: true,
				wallet: [payload?.data ? payload?.data : payload, ...state?.wallet],
				paginate: {
					...state?.paginate,
					result: state?.paginate?.result + 1,
					total: state?.paginate?.total + 1,
				},
			};
		case TRANSFER_FUND_FAIL:
			return { ...state, isTransfer: false };
		case GET_WALLET_BALANCE:
			return { ...state, balance: payload };
		case GET_WALLET_BALANCE_FAIL:
			return { ...state, balance: state?.balance };
		case GET_CARDS:
			return { ...state, cards: payload?.data ? payload?.data : payload };
		case GET_CARDS_FAIL:
			return { ...state, cards: state?.cards };
		case LOGOUT:
			return init1;
		default:
			return state;
	}
};

export default WalletReducer;

let init1 = {
	bonus: [],
	isAdded: false,
	isMoved: false,
	paginate: null,
	give_bonus: [],
	paginate_bonus: null,
};

export const BonusReducer = (state = init1, action) => {
	let { type, payload } = action;

	switch (type) {
		case GET_BONUS:
			return { ...state, bonus: payload?.data, paginate: payload?.paginate };
		case GET_ALL_BONUS:
			return {
				...state,
				give_bonus: payload?.data,
				paginate_bonus: payload?.paginate,
			};
		case GET_WALLET_FAIL:
			return { ...state, bonus: state?.bonus, give_bonus: state?.give_bonus };
		case MOVE_BONUS:
			return {
				...state,
				isMoved: true,
				bonus: [payload?.data ? payload?.data : payload, ...state?.bonus],
				paginate: {
					...state?.paginate,
					result: state?.paginate?.result + 1,
					total: state?.paginate?.total + 1,
				},
			};
		case MOVE_BONUS_FAIL:
			return { ...state, isMoved: false };
		case GIVE_BONUS:
			return {
				...state,
				isAdded: true,
				bonus: [payload?.data ? payload?.data : payload, ...state?.bonus],
				paginate: {
					...state?.paginate,
					result: state?.paginate?.result + 1,
					total: state?.paginate?.total + 1,
				},
				give_bonus: [
					payload?.data ? payload?.data : payload,
					...state?.give_bonus,
				],
				paginate_bonus: {
					...state?.paginate_bonus,
					result: state?.paginate_bonus?.result + 1,
					total: state?.paginate_bonus?.total + 1,
				},
			};
		case GIVE_BONUS_FAIL:
			return { ...state, isAdded: false };

		case LOGOUT:
			return init1;
		default:
			return state;
	}
};

let init2 = {
	commission: [],
	isMoved: false,
	paginate: null,
};

export const CommissionReducer = (state = init2, action) => {
	let { type, payload } = action;

	switch (type) {
		case GET_COMMISSION:
			return {
				...state,
				commission: payload?.data,
				paginate: payload?.paginate,
			};
		case GET_WALLET_FAIL:
			return { ...state, commission: state?.commission };
		case MOVE_COMMISSION:
			return {
				...state,
				isMoved: true,
				commission: [
					payload?.data ? payload?.data : payload,
					...state?.commission,
				],
				paginate: {
					...state?.paginate,
					result: state?.paginate?.result + 1,
					total: state?.paginate?.total + 1,
				},
			};
		case MOVE_COMMISSION_FAIL:
			return { ...state, isMoved: false };
		case LOGOUT:
			return init1;
		default:
			return state;
	}
};