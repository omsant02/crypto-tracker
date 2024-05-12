import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import CurrencyConverterPage from "./pages/CurrencyConverterPage";
import Header from "./components/Header";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/converter" element={<CurrencyConverterPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
