import { take, takeEvery, put, call, select } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import {
  EXCHANGE_FROM_TO,
  UPDATE_WALLET,
  UPDATE_WALLET_HISTORY
} from "@actions/wallet";
import { AnyAction } from "redux";

function* changeCurrency({ payload }: AnyAction): SagaIterator {
  const balance = yield select(state => state.wallet.balance);
  Object.entries(payload).forEach(([key, value]) => {
    balance[key] = parseFloat((balance[key] + value).toFixed(2));
  });
  yield put({ type: UPDATE_WALLET, payload: balance });
  yield put({
    type: UPDATE_WALLET_HISTORY,
    payload: { datetime: new Date(), changes: payload }
  });
}

export function* watchWallet() {
  yield takeEvery(EXCHANGE_FROM_TO, changeCurrency);
}
