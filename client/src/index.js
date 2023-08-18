import { createRoot } from "react-dom/client";
import App from "./app/app";
import { Provider } from "react-redux";
import store, { persistor } from "redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <App />
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>
);
