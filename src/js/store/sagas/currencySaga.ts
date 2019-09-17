import {take, takeEvery, put, call} from "redux-saga/effects";
import {SagaIterator} from "redux-saga";
import {SECRET_KEY} from "@helpers/constants";
import delay from "@helpers/delay";
import {UPDATE_CURRENCIES, FETCH_CURRENCIES} from "@actions/currency";
import pick from "@helpers/pick";

function* getCurrencies(): SagaIterator {
    while (true) {
        try {
            const req = yield call(
                fetch,
                `https://openexchangerates.org/api/latest.json?app_id=${SECRET_KEY}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    method: "GET"
                }
            );
            let {rates, timestamp} = yield req.json();
            rates = Object.entries(pick(rates, ["USD", "EUR", "GBP"]));
            yield put({type: UPDATE_CURRENCIES, payload: {rates, timestamp}});
            yield call(delay, 10000);
        } catch (e) {
            // TODO: remove when
            const {rates, timestamp} = {
                timestamp: new Date().getTime(),
                rates: {
                    USD: 1,
                    GBP: 0.8 + Math.random() * 0.1,
                    EUR: 0.8 + Math.random() * 0.1
                }
            };
            yield put({type: UPDATE_CURRENCIES, payload: {rates, timestamp}});
            yield call(delay, 10000);
        }
    }
}

export function* watchCurrencies() {
    while (true) {
        yield take(FETCH_CURRENCIES);
        yield call(getCurrencies);
    }
}
