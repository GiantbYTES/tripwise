import { useState, useEffect } from "react";
import { SignupPage } from "./pages/auth/SignupPage/SignupPage.jsx";
import HomePage from "./pages/HomePage/HomePage";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import MainNavbar from "./components/mainNavbar/mainNavbar";
import Footer from "./components/footer/footer";
import Dashboard from "./pages/DashboardPage/DashboardPage";
import Error from "./pages/ErrorPage/ErrorPage";
import TripForm from "./components/tripForm/TripForm";
import { LoginPage } from "./pages/auth/LoginPage/LoginPage.jsx";

function App() {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  // Apply dashboard-root class to root element when on dashboard
  useEffect(() => {
    const root = document.getElementById("root");
    const body = document.body;
    const html = document.documentElement;

    if (isDashboard) {
      root.classList.add("dashboard-root");
      body.style.margin = "0";
      body.style.padding = "0";
      body.style.overflow = "hidden";
      body.style.height = "100vh";
      body.style.width = "100vw";
      html.style.margin = "0";
      html.style.padding = "0";
      html.style.overflow = "hidden";
      html.style.height = "100vh";
      html.style.width = "100vw";
    } else {
      root.classList.remove("dashboard-root");
      body.style.margin = "";
      body.style.padding = "";
      body.style.overflow = "";
      body.style.height = "";
      body.style.width = "";
      html.style.margin = "";
      html.style.padding = "";
      html.style.overflow = "";
      html.style.height = "";
      html.style.width = "";
    }

    // Cleanup
    return () => {
      root.classList.remove("dashboard-root");
      body.style.margin = "";
      body.style.padding = "";
      body.style.overflow = "";
      body.style.height = "";
      body.style.width = "";
      html.style.margin = "";
      html.style.padding = "";
      html.style.overflow = "";
      html.style.height = "";
      html.style.width = "";
    };
  }, [isDashboard]);

  return (
    <>
      {!isDashboard && <MainNavbar />}
      <div className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tripform" element={<TripForm />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      {!isDashboard && <Footer />}
    </>
  );
}

export default App;
