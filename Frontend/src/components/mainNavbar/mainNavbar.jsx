import "./mainNavbar.css";
import tripwiseLogo from "../../assets/tripwise_logo_new.png";
import { Link } from "react-router-dom";

function MainNavbar() {
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
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a
            href="/"
            className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
          >
            <img
              src={tripwiseLogo}
              alt="Tripwise Logo"
              width="40"
              height="32"
              className="me-2"
            />
          </a>
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a href="#" className="nav-link px-2 link-secondary">
                Overview
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 link-body-emphasis">
                Inventory
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 link-body-emphasis">
                Customers
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 link-body-emphasis">
                Products
              </a>
            </li>
          </ul>
          <ul className="nav">
            <li className="nav-item">
              <Link to="/login" className="nav-link link-body-emphasis px-2">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link link-body-emphasis px-2">
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default MainNavbar;
