import { useState } from "react";
import {SignupPage} from "./pages/auth/SignupPage/SignupPage.jsx"
import HomePage from "./pages/HomePage/HomePage";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainNavbar from "./components/mainNavbar/mainNavbar";
import Footer from "./components/footer/footer";

function App() {
  return (
    <>
      <MainNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
