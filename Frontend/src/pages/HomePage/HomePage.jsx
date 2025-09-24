import React from "react";
import tripwiseLogo from "../../assets/tripwise_logo_new.png";
import tripwiseExampleDashboard from "../../assets/dashboard_example.png";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./HomePage.css";
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
        style={{ maxHeight: "70vh", marginTop: "4rem" }}
      >
        <div className="container px-5">
          <img
            src={tripwiseExampleDashboard}
            className="img-fluid border rounded-3 shadow-lg mb-4 homepage-dashboard-img"
            alt="Example image"
            width="1000"
            height="500"
            loading="lazy"
          />
        </div>
      </div>
      <div className="container px-4 py-5" id="featured-3">
        {" "}
        <h2 className="pb-2 border-bottom">Columns with icons</h2>{" "}
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          {" "}
          <div className="feature col">
            {" "}
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
              {" "}
              <svg className="bi" width="1em" height="1em" aria-hidden="true">
                <use xlink:href="#collection"></use>
              </svg>{" "}
            </div>{" "}
            <h3 className="fs-2 text-body-emphasis">Featured title</h3>{" "}
            <p>
              Paragraph of text beneath the heading to explain the heading.
              We'll add onto it with another sentence and probably just keep
              going until we run out of words.
            </p>{" "}
            <a href="#" className="icon-link">
              Call to action
              <svg className="bi" aria-hidden="true">
                <use xlink:href="#chevron-right"></use>
              </svg>{" "}
            </a>{" "}
          </div>{" "}
          <div className="feature col">
            {" "}
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
              {" "}
              <svg className="bi" width="1em" height="1em" aria-hidden="true">
                <use xlink:href="#people-circle"></use>
              </svg>{" "}
            </div>{" "}
            <h3 className="fs-2 text-body-emphasis">Featured title</h3>{" "}
            <p>
              Paragraph of text beneath the heading to explain the heading.
              We'll add onto it with another sentence and probably just keep
              going until we run out of words.
            </p>{" "}
            <a href="#" className="icon-link">
              Call to action
              <svg className="bi" aria-hidden="true">
                <use xlink:href="#chevron-right"></use>
              </svg>{" "}
            </a>{" "}
          </div>{" "}
          <div className="feature col">
            {" "}
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
              {" "}
              <svg className="bi" width="1em" height="1em" aria-hidden="true">
                <use xlink:href="#toggles2"></use>
              </svg>{" "}
            </div>{" "}
            <h3 className="fs-2 text-body-emphasis">Featured title</h3>{" "}
            <p>
              Paragraph of text beneath the heading to explain the heading.
              We'll add onto it with another sentence and probably just keep
              going until we run out of words.
            </p>{" "}
            <a href="#" className="icon-link">
              Call to action
              <svg className="bi" aria-hidden="true">
                <use xlink:href="#chevron-right"></use>
              </svg>{" "}
            </a>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    </div>
  );
}
