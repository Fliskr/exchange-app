import {take, takeEvery, put, call} from "redux-saga/effects";
import {SagaIterator} from "redux-saga";

import delay from "@helpers/delay";
import {UPDATE_CURRENCIES, FETCH_CURRENCIES} from "@actions/currency";
import pick from "@helpers/pick";
import getLatestRates from "../../api/getLatestRates";

function* getCurrencies(): SagaIterator {
    while (true) {
        try {
            const data = yield call(getLatestRates);
            let {rates, timestamp} = data;
            rates = pick(rates, ["USD", "EUR", "GBP"]);
            rates.USD = 1;
            yield put({
                type: UPDATE_CURRENCIES,
                payload: {rates, timestamp: new Date(timestamp).getTime()}
            });
        } catch (e) {

        } finally {
            yield call(delay, 10000);

        }
    }
}

export function* watchCurrencies() {
    yield take(FETCH_CURRENCIES);
    yield call(getCurrencies);
}
