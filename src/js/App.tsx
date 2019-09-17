import React, {FunctionComponent, StrictMode} from "react";
import {Provider} from "react-redux";
import {Store} from "redux";
import AppStore from "@interfaces/AppStore";
import configureStore, {sagaMiddleware, history} from "@store/configureStore";
import createReducer from "@store/index";
import {ConnectedRouter} from "connected-react-router";
import sagas from "@saga/index";
import {Route} from "react-router";
import Main from "@ui/pages/Main";
import Exchange from "@ui/pages/Exchange";
import MainLayout from "@ui/components/MainLayout";

export const store: Store<AppStore> = configureStore(createReducer(history));
export const action = (type: string) => store.dispatch({type});
let sagaTask = sagaMiddleware.run(sagas);

if (module.hot) {
    module.hot.accept("@saga/index", () => {
        const getNewSagas = require("@saga/index");
        sagaTask.cancel();
        // @ts-ignore
        sagaTask.done.then(() => {
            sagaTask = sagaMiddleware.run(getNewSagas);
        });
    });
}

const App: FunctionComponent = () => (
    <StrictMode>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <MainLayout>
                    <Route path="/" exact={true} component={Main}/>
                    <Route path="/exchange/:currency" exact={true} component={Exchange}/>
                </MainLayout>
            </ConnectedRouter>
        </Provider>
    </StrictMode>
);

export default App;
