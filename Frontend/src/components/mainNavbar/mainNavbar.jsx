import "./mainNavbar.css";
import tripwiseLogo from "../../assets/tripwise_logo_new.png";
import { useEffect, useState } from "react";
import { LogoutButton } from "../auth/LogoutButton/LogoutButton.jsx";
import { apiFetch } from "../../utils/apiFetch.js";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

function MainNavbar() {
  const { user } = useAuth();
  console.log("user = ", user);

  return (
    <header
      className="sticky-top p-1 mb-3 border-bottom"
      style={{
        top: 0,
        zIndex: 1020,
        position: "sticky",
        backgroundColor: "white",
      }}
    >
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <Link
            to="/"
            className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
          >
            <img
              src={tripwiseLogo}
              alt="Tripwise Logo"
              width="40"
              height="32"
              className="me-2"
            />
            <span className="fs-5 fw-semibold">TripWise</span>
          </Link>
          <ul className="nav ms-auto">
            {user ? (
              <li className="nav-item">
                <LogoutButton />
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="nav-link link-body-emphasis px-2"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/signup"
                    className="nav-link link-body-emphasis px-2"
                  >
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default MainNavbar;
