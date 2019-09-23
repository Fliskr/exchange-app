import { put, call, select, take } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import {
    EXCHANGE_FROM_TO,
    UPDATE_WALLET,
    UPDATE_WALLET_HISTORY,
    UPDATE_WALLET_FAIL
} from "@actions/wallet";
import { Wallet } from "@interfaces/AppStore";
import ActionPayload from "@interfaces/ActionPayload";

export function* changeCurrency({ payload }: ActionPayload<Wallet["balance"]>): SagaIterator {
    const balance: Wallet["balance"] = yield select(
        state => state.wallet.balance
    );
    Object.entries(payload).forEach(([key, value]) => {
        balance[key] = parseFloat((balance[key] + value).toFixed(2));
    });
    if (Object.values(balance).some(item => item < 0)) {
        return yield put({ type: UPDATE_WALLET_FAIL });
    }
    yield put({ type: UPDATE_WALLET, payload: balance });
    yield put({
        type: UPDATE_WALLET_HISTORY,
        payload: { datetime: new Date(), changes: payload }
    });
}

export function* watchWallet() {
    while (true) {
        const action = yield take(EXCHANGE_FROM_TO);
        yield call(changeCurrency, action);
    }
}
