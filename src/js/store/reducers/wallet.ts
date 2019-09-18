import {Reducer} from "redux";
import {UPDATE_WALLET, UPDATE_WALLET_HISTORY} from "@actions/wallet";
import AppStore from "@interfaces/AppStore";

const init: Partial<AppStore["wallet"]> = {
    balance: {
        USD: 50.11,
        EUR: 150.22,
        GBP: 250.11
    },
    history: []
};

const wallet: Reducer = (state = init, action) => {
    if (action.type === UPDATE_WALLET) {
        console.log(1);
        return {...state, balance: action.payload};
    }
    if (action.type === UPDATE_WALLET_HISTORY) {
        return {...state, history: [action.payload].concat(state.history)};
    }
    return state;
};

export default wallet;
