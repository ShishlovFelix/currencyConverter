import React from "react";
import { CssBaseline } from "@mui/material";
import { createRoot } from "react-dom/client";

import App from "./App";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const mainContainer = document.getElementById("root");
const root = createRoot(mainContainer!);

root.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);

serviceWorkerRegistration.register();
