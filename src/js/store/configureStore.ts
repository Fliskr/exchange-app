import {
    Store,
    Middleware,
    compose,
    applyMiddleware,
    createStore,
    Reducer,
} from "redux";
import {routerMiddleware} from "connected-react-router";
import {createLogger} from "redux-logger";
import createSagaMiddleware, {END} from "redux-saga";
import createBrowserHistory from "history/createBrowserHistory";
import AppStore from "@interfaces/AppStore";
import {composeWithDevTools} from "redux-devtools-extension";

export const history = createBrowserHistory();
export const sagaMiddleware = createSagaMiddleware();
export const isDev = process.env.NODE_ENV === "development";

export default function configureStore(rootReducer: Reducer<AppStore>): Store<AppStore> {
    const middleware: Middleware[] = [
        routerMiddleware(history),
        sagaMiddleware,
    ];
    const composeEnhancers = isDev ? composeWithDevTools({}) : compose;
    if (isDev) {
        middleware.push(createLogger({
            level: "info",
            collapsed: true,
        }));
    }
    const store: Store<AppStore> = composeEnhancers(
        applyMiddleware(...middleware),
    )(createStore)(rootReducer);
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept("./index", () => {
            store.replaceReducer(rootReducer.bind(history));
        });
    }
    return store;
}
