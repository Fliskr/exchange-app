import "../scss/style.scss";
import "@babel/polyfill";
import "whatwg-fetch";
import "abortcontroller-polyfill/dist/polyfill-patch-fetch";
import "./i18n";
import React, {ComponentType} from "react";
import {render as reactDomRender} from "react-dom";
import {AppContainer} from "react-hot-loader";
import App from "./App";

const root = document.getElementById("app");
const render = (App: ComponentType) => (
    reactDomRender(
        <AppContainer>
            <App/>
        </AppContainer>,
        root
    )
);
render(App);
if (module.hot) {
    module.hot.accept("./App", () => render(App));
}
