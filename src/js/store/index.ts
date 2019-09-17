import { combineReducers, Reducer, AnyAction } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import AppStore from "@interfaces/AppStore";
import currencies from "@reducers/currency";
import wallet from "@reducers/wallet";

export default (history: History): Reducer<AppStore, AnyAction> =>
  combineReducers({
    router: connectRouter(history),
    currencies,
    wallet
  });
