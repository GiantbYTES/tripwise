import { useState } from "react";
import "./Sidebar.css";

export function Sidebar() {
  const [homeCollapsed, setHomeCollapsed] = useState(false);
  const [dashboardCollapsed, setDashboardCollapsed] = useState(true);
  const [ordersCollapsed, setOrdersCollapsed] = useState(true);
  const [accountCollapsed, setAccountCollapsed] = useState(true);

  return (
    <div className="sidebar-container">
      <div className="flex-shrink-0 p-3" style={{ width: "100%" }}>
        <a
          href="/"
          className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom"
        >
          <svg
            className="bi pe-none me-2"
            width="30"
            height="24"
            aria-hidden="true"
          >
            <use xlinkHref="#bootstrap"></use>
          </svg>
          <span className="fs-5 fw-semibold">TripWise</span>
        </a>
        <ul className="list-unstyled ps-0">
          <li className="mb-1">
            <button
              className="btn btn-toggle d-inline-flex align-items-center rounded border-0"
              onClick={() => setHomeCollapsed(!homeCollapsed)}
              aria-expanded={!homeCollapsed}
            >
              Home
            </button>
            <div className={`collapse ${!homeCollapsed ? "show" : ""}`}>
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >
                    Overview
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >
                    Updates
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >
                    Reports
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="mb-1">
            <button
              className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
              onClick={() => setDashboardCollapsed(!dashboardCollapsed)}
              aria-expanded={!dashboardCollapsed}
            >
              Dashboard
            </button>
            <div className={`collapse ${!dashboardCollapsed ? "show" : ""}`}>
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >
                    Overview
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >
                    Weekly
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >
                    Monthly
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >
                    Annually
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="mb-1">
            <button
              className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
              onClick={() => setOrdersCollapsed(!ordersCollapsed)}
              aria-expanded={!ordersCollapsed}
            >
              Orders
            </button>
            <div className={`collapse ${!ordersCollapsed ? "show" : ""}`}>
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >
                    New
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >
                    Processed
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >
                    Shipped
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >
                    Returned
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="border-top my-3"></li>
          <li className="mb-1">
            <button
              className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
              onClick={() => setAccountCollapsed(!accountCollapsed)}
              aria-expanded={!accountCollapsed}
            >
              Account
            </button>
            <div className={`collapse ${!accountCollapsed ? "show" : ""}`}>
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >
                    New...
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
