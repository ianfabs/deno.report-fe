import React from "react";
import ReactDOM from "react-dom";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";

import App from "./App";

initializeIcons();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
