// index.tsx
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import store, { persistor } from "./store"; // Import store and persistor
import App from "./App";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
} else {
  throw new Error("Root element not found in the DOM");
}
