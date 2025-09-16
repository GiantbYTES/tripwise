import { useState } from "react";
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
