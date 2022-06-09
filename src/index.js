import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "App";
import { register as registerServiceWorker } from "./serviceWorkerRegistration";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

registerServiceWorker();
