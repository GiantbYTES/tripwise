import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import HomePage from "./pages/homePage";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainNavbar from "./components/mainNavbar";

function App() {
  return (
    <>
      <MainNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
