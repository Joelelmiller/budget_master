import React, { Component, Fragment } from "react";
import ReactDom from "react-dom";
import { HashRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import store from "../store";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { loadUser } from "../actions/auth";
import AppDrawer from "../components/layout/AppDrawer";
import Alerts from "./layout/Alerts";

//alertOptions
const alertOptions = {
  timeout: 3000,
  position: "bottom center",
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Alerts />
              <AppDrawer />
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));
