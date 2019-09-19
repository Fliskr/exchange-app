import { AnyAction, Action } from "redux";

export default interface ActionPayload<T> extends Action<any> {
    payload: T;
}