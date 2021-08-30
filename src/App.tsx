import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { PersistGate } from "redux-persist/integration/react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { STORE, PERSISTOR } from "./STORE";
import Navigation from "./screens/Navigation";
import { createTheme, ThemeProvider } from "@material-ui/core";
import MomentUtils from "@date-io/moment";

export default function App() {
  return (
    <Provider store={STORE}>
      <PersistGate persistor={PERSISTOR} loading={null}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <Navigation />
            </ThemeProvider>
          </BrowserRouter>
        </MuiPickersUtilsProvider>
      </PersistGate>
    </Provider>
  );
}

const styles: any = {
  palette: {
    primary: {
      main: "#c4a459",
    },
    secondary: {
      main: "#ffffff",
    },
  }
};
const theme = createTheme(styles);
