import { useState } from "react";
import HomePage from "./pages/HomePage/HomePage";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainNavbar from "./components/mainNavbar/mainNavbar";
import Footer from "./components/footer/footer";
import Dashboard from "./pages/DashboardPage/DashboardPage";
import Error from "./pages/ErrorPage/ErrorPage";

function App() {
  return (
    <>
      <MainNavbar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
