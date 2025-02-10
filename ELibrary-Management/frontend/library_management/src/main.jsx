import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "../Context/AuthProvider.jsx";
import "./App.css";
import "./styles/index.css";



const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>,
  );
} else {
  console.error("Root element not found");
}
