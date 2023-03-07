import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import "@a11ywatch/react-a11ywatch-js/css/tailwind.css";
import { setAPIURL } from "@a11ywatch/react-a11ywatch-js";
import "./index.css";

// set local instance a11ywatch
setAPIURL("http://localhost:3280");

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
