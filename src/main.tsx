import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app";
import "./main.scss";
import { registerSW } from "virtual:pwa-register";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);

registerSW({ immediate: true });
