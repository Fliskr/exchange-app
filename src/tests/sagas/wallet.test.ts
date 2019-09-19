import { select, put, take, call } from "redux-saga/effects";
import { Wallet } from "@interfaces/AppStore";
import ActionPayload from "@interfaces/ActionPayload";
import { changeCurrency, watchWallet } from "@store/sagas/walletSaga";
import {
    UPDATE_WALLET,
    UPDATE_WALLET_HISTORY,
    UPDATE_WALLET_FAIL,
    EXCHANGE_FROM_TO
} from "@actions/wallet";
import { Action } from "redux";

const constantDate = new Date("2017-06-13T04:41:20");

const RealDate = Date;

describe("wallet saga", () => {
    describe("sagas", () => {
        beforeEach(() => {
            // @ts-ignore
            Date = () => "5";
        });
        afterEach(() => {
            Date = RealDate;
        });
        it("change currency and send to store", () => {
            const newBalance: Wallet["balance"] = { USD: -1, EUR: 1 };
            const gen = changeCurrency({ payload: newBalance } as ActionPayload<
                Wallet["balance"]
            >);
            expect(gen.next().value).toBeTruthy();
            expect(gen.next({ USD: 2, EUR: 2 }).value).toEqual(
                put({ type: UPDATE_WALLET, payload: { EUR: 3, USD: 1 } })
            );
            expect(gen.next().value).toEqual(
                put({
                    type: UPDATE_WALLET_HISTORY,
                    payload: {
                        changes: newBalance,
                        datetime: new Date(2)
                    }
                })
            );
            expect(gen.next().done).toBe(true);
        });

        it("should reject wallet changes", () => {
            const newBalance: Wallet["balance"] = { USD: -3, EUR: 3 };
            const gen = changeCurrency({ payload: newBalance } as ActionPayload<
                Wallet["balance"]
            >);
            expect(gen.next().value).toBeTruthy();
            expect(gen.next({ USD: 2, EUR: 2 }).value).toEqual(
                put({ type: UPDATE_WALLET_FAIL })
            );
            expect(gen.next().done).toBe(true);
        });
    });

    describe("watch started", () => {
        it("watchWallet", () => {
            const gen = watchWallet();
            expect(gen.next().value).toEqual(take(EXCHANGE_FROM_TO));
            const newBalance: Wallet["balance"] = { USD: -3, EUR: 3 };
            const mockBalance: ActionPayload<Wallet["balance"]> = {type: "", payload: newBalance};
            expect(gen.next(mockBalance).value).toEqual(call(changeCurrency, mockBalance))
        })
    })
});
