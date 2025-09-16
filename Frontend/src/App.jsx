import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
