import { Reducer } from "redux";
import { UPDATE_CURRENCIES_SUCCESS} from "@actions/currency";
import AppStore from "@interfaces/AppStore";

const init: Partial<AppStore["currencies"]> = {};

const currencies: Reducer = (state = init, action) => {
    if (action.type === UPDATE_CURRENCIES_SUCCESS) {
        const { payload } = action;
        return { ...state, ...payload };
    }

    return state;
};

export default currencies;
