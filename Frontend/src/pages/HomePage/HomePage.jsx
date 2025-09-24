import React from "react";
import tripwiseLogo from "../../assets/tripwise_logo_new.png";
import tripwiseExampleDashboard from "../../assets/dashboard_example.png";
import feature1Icon from "../../assets/icon1_new_transparent.png";
import feature2Icon from "../../assets/icon2_new_transparent.png";
import feature3Icon from "../../assets/icon3_new_transparent.png";
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
      <div className="container px-4 py-5 feature-section" id="features">
        <h2 className="pb-2 border-bottom text-center">Why Choose TripWise?</h2>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="feature col">
            <div className="feature-icon-container">
              <img
                src={feature1Icon}
                className="feature-icon-img icon1"
                alt="Smart Planning Icon"
              />
            </div>
            <h3 className="fs-4">Smart Planning</h3>
            <p>
              Create personalized itineraries with AI-powered recommendations.
              Get suggestions for destinations, activities, and accommodations
              tailored to your preferences and budget.
            </p>
          </div>
          <div className="feature col">
            <div className="feature-icon-container">
              <img
                src={feature2Icon}
                className="feature-icon-img icon2"
                width="1000"
                alt="Real-time Updates Icon"
              />
            </div>
            <h3 className="fs-4">Real-time Updates</h3>
            <p>
              Stay informed with live weather updates, flight status changes,
              and local events. Never miss important travel information that
              could affect your plans.
            </p>
          </div>
          <div className="feature col">
            <div className="feature-icon-container">
              <img
                src={feature3Icon}
                className="feature-icon-img icon3"
                alt="Smart Checklist Icon"
              />
            </div>
            <h3 className="fs-4">Smart Checklist</h3>
            <p>
              Never forget essential items with our intelligent packing and
              travel checklist. Get customized suggestions based on your
              destination, weather, and trip duration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
