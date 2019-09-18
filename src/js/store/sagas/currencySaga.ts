import { take, takeEvery, put, call, delay } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";

// import delay from "@helpers/delay";
import {
    UPDATE_CURRENCIES,
    FETCH_CURRENCIES,
    UPDATE_CURRENCIES_FAILED,
    UPDATE_CURRENCIES_SUCCESS
} from "@actions/currency";
import getLatestRates from "../../api/getLatestRates";
import { BASE_CURRENCY } from "@helpers/constants";

function* getCurrencies(): SagaIterator {
    while (true) {
        try {
            yield put({ type: UPDATE_CURRENCIES });
            const data = yield call(getLatestRates);
            let { rates, timestamp } = data;
            rates[BASE_CURRENCY] = 1;
            yield put({
                type: UPDATE_CURRENCIES_SUCCESS,
                payload: { rates, timestamp: new Date(timestamp).getTime() }
            });
        } catch (e) {
            yield put({
                type: UPDATE_CURRENCIES_FAILED
            });
        } finally {
            yield delay(10000);
        }
    }
}

export function* watchCurrencies() {
    yield take(FETCH_CURRENCIES);
    yield call(getCurrencies);
}
