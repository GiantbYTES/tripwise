import { useState } from "react";
import "./Sidebar.css";
import tripwiseLogo from "../../assets/tripwise_logo_new.png";
import { tripData } from "../../utils/tripData";

export function Sidebar({
  selectedDay,
  onDaySelect,
  selectedSection,
  onSectionSelect,
  onTripFormOpen,
}) {
  const [homeCollapsed, setHomeCollapsed] = useState(false);
  const [dashboardCollapsed, setDashboardCollapsed] = useState(true);
  const [ordersCollapsed, setOrdersCollapsed] = useState(true);

  const handleDaySelect = (day) => {
    if (onDaySelect) {
      onDaySelect(day);
    }
  };

  const handleSectionClick = (section) => {
    if (onSectionSelect) {
      onSectionSelect(section);
    }
  };

  // Auto-expand appropriate sections when selectedSection changes
  // Removed to allow independent collapse state management

  return (
    <div className="sidebar-container">
      <div className="flex-shrink-0 p-3" style={{ width: "100%" }}>
        <a
          href="/"
          className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom"
        >
          <img
            src={tripwiseLogo}
            alt="Tripwise Logo"
            width="40"
            height="32"
            className="me-2"
          />
          {/* <use xlinkHref="#bootstrap"></use> */}

          <span className="fs-5 fw-semibold">TripWise</span>
        </a>
        <ul className="list-unstyled ps-0">
          <button
            className="btn btn-success px-5 mb-3"
            type="button"
            onClick={onTripFormOpen}
          >
            AI TripWising
          </button>
          <li className="mb-1">
            <button
              className="btn btn-toggle d-inline-flex align-items-center rounded border-0"
              onClick={() => setHomeCollapsed(!homeCollapsed)}
              aria-expanded={!homeCollapsed}
            >
              Your Trip
            </button>
            <div className={`collapse ${!homeCollapsed ? "show" : ""}`}>
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                {(tripData?.days || []).map((day) => (
                  <li key={day.id}>
                    <a
                      href="#"
                      className={`link-body-emphasis d-inline-flex text-decoration-none rounded day-link ${
                        selectedDay && selectedDay.id === day.id ? "active" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (onDaySelect) {
                          onDaySelect(day);
                        }
                      }}
                    >
                      <div className="day-link-content">
                        <div className="day-header">
                          <strong>Day {day.dayNumber}</strong>
                          <small className="text-muted ms-1">
                            {new Date(day.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </small>
                        </div>
                        <div className="day-route">
                          <small className="text-muted">
                            {day.startLocation.name.split(",")[0]} →{" "}
                            {day.endLocation.name.split(",")[0]}
                          </small>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          <li className="mb-1">
            <button
              className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
              onClick={() => setDashboardCollapsed(!dashboardCollapsed)}
              aria-expanded={!dashboardCollapsed}
            >
              Explore
            </button>
            <div className={`collapse ${!dashboardCollapsed ? "show" : ""}`}>
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <a
                    href="#"
                    className={`link-body-emphasis d-inline-flex text-decoration-none rounded ${
                      selectedSection === "explore-news" ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSectionClick("explore-news");
                    }}
                  >
                    News
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`link-body-emphasis d-inline-flex text-decoration-none rounded ${
                      selectedSection === "explore-recommendations"
                        ? "active"
                        : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSectionClick("explore-recommendations");
                    }}
                  >
                    Recommendations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`link-body-emphasis d-inline-flex text-decoration-none rounded ${
                      selectedSection === "explore-tips" ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSectionClick("explore-tips");
                    }}
                  >
                    Tips
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
              Overview
            </button>
            <div className={`collapse ${!ordersCollapsed ? "show" : ""}`}>
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <a
                    href="#"
                    className={`link-body-emphasis d-inline-flex text-decoration-none rounded ${
                      selectedSection === "overview-budget" ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSectionClick("overview-budget");
                    }}
                  >
                    Budget
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`link-body-emphasis d-inline-flex text-decoration-none rounded ${
                      selectedSection === "overview-flights" ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSectionClick("overview-flights");
                    }}
                  >
                    Flight Status
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`link-body-emphasis d-inline-flex text-decoration-none rounded ${
                      selectedSection === "overview-checklist" ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSectionClick("overview-checklist");
                    }}
                  >
                    Checklist
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`link-body-emphasis d-inline-flex text-decoration-none rounded ${
                      selectedSection === "overview-additional" ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSectionClick("overview-additional");
                    }}
                  >
                    More Information
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="border-top my-3"></li>
          <li className="mb-1">
            <button
              className="btn rounded border-0 text-start w-100 ps-4"
              onClick={() => {
                console.log("Sign out clicked");
              }}
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
