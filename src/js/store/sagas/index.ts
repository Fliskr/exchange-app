import { all, fork } from "redux-saga/effects";
import { watchCurrencies } from "@saga/currencySaga";
import { watchWallet } from "@saga//walletSaga";

export default function* rootSaga() {
    yield all([fork(watchCurrencies), fork(watchWallet)]);
}
