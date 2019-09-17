import { Reducer } from "redux";
import { UPDATE_CURRENCIES } from "@actions/currency";
import AppStore from "@interfaces/AppStore";

const init: Partial<AppStore["currencies"]> = {
    rates: { USD: 1, GBP: 0.8, EUR: 0.88 }
};

const currencies: Reducer = (state = init, action) => {
    if (action.type === UPDATE_CURRENCIES) {
        const { payload } = action;
        return { ...state, ...payload };
    }

    return state;
};

export default currencies;
