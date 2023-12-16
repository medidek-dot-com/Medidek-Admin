import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./satoshi.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../src/Store/store";
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <CookiesProvider defaultSetOptions={{ path: "/" }}>
                <PersistGate persistor={persistor}>
                    <Router>
                        <App />
                    </Router>
                </PersistGate>
            </CookiesProvider>
        </Provider>
    </React.StrictMode>
);
