import React from "react";
import tripwiseLogo from "../../assets/tripwise_logo_new.png";
import tripwiseExampleDashboard from "../../assets/example_dashboard.png";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./homePage.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HomePage(props) {
  return (
    <div className="px-4 pt-5 my-5 text-center border-bottom homepage-container">
      <h1 className="display-4 fw-bold text-body-emphasis">
        Where your dream journey takes shape
      </h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Plan, organize, and enjoy stress-free travel with smart itineraries,
          real-time updates, and personalized recommendations.
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button
            type="button"
            className="btn btn-primary rounded-pill btn-lg px-4 me-sm-3"
          >
            Start planning
          </button>
        </div>
      </div>
      <div
        className="overflow-hidden"
        style={{ maxHeight: "30vh", marginTop: "4rem" }}
      >
        <div className="container px-5">
          <img
            src={tripwiseExampleDashboard}
            className="img-fluid border rounded-3 shadow-lg mb-4 homepage-dashboard-img"
            alt="Example image"
            width="700"
            height="500"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
