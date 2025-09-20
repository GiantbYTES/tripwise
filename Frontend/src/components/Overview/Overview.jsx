import { useState, useEffect } from "react";
import "./Overview.css";
import Budget from "./Budget/Budget";
import FlightStatus from "./FlightStatus/FlightStatus";
import Checklist from "./Checklist/Checklist";
import AdditionalInfo from "./AdditionalInfo/AdditionalInfo";

export default function Overview({
  initialActiveSection = "budget",
  onSectionSelect,
}) {
  const [activeSection, setActiveSection] = useState(initialActiveSection);

  useEffect(() => {
    setActiveSection(initialActiveSection);
  }, [initialActiveSection]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    // Notify parent component about the section change
    if (onSectionSelect) {
      onSectionSelect(`overview-${section}`);
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "budget":
        return <Budget />;
      case "flights":
        return <FlightStatus />;
      case "checklist":
        return <Checklist />;
      case "additional":
        return <AdditionalInfo />;
      default:
        return <Budget />;
    }
  };

  return (
    <div className="overview-container">
      <div className="overview-header">
        <h2>Trip Overview</h2>
        <p className="text-muted">
          Manage your budget, flights, checklists, and important information
        </p>
      </div>

      {/* <div className="overview-navigation">
        <button
          className={`overview-nav-btn ${
            activeSection === "budget" ? "active" : ""
          }`}
          onClick={() => handleSectionChange("budget")}
        >
          <i className="fas fa-calculator"></i>
          Budget
        </button>
        <button
          className={`overview-nav-btn ${
            activeSection === "flights" ? "active" : ""
          }`}
          onClick={() => handleSectionChange("flights")}
        >
          <i className="fas fa-plane"></i>
          Flight Status
        </button>
        <button
          className={`overview-nav-btn ${
            activeSection === "checklist" ? "active" : ""
          }`}
          onClick={() => handleSectionChange("checklist")}
        >
          <i className="fas fa-check-square"></i>
          Checklist
        </button>
        <button
          className={`overview-nav-btn ${
            activeSection === "additional" ? "active" : ""
          }`}
          onClick={() => handleSectionChange("additional")}
        >
          <i className="fas fa-info-circle"></i>
          More Info
        </button>
      </div> */}

      <div className="overview-content">{renderActiveSection()}</div>
    </div>
  );
}
