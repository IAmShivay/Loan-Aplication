
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store"; // Ensure store does not import persistor
import App from "./App";
import './css/global.css'; // Import the new CSS file
import Snackbar from "./components/errors/snackbarError";
const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <Provider store={store}>
      <App />
      <Snackbar/>
    </Provider>
  );
} else {
  throw new Error("Root element not found in the DOM");
}
