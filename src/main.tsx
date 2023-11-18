import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
/* import "./index.css"; */
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <App />
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);
