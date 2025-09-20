import { useState, useEffect } from "react";
import "./Explore.css";
import News from "./News/News";
import Recommendations from "./Recommendations/Recommendations";
import Tips from "./Tips/Tips";

export default function Explore({
  initialActiveSection = "news",
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
      onSectionSelect(`explore-${section}`);
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "news":
        return <News />;
      case "recommendations":
        return <Recommendations />;
      case "tips":
        return <Tips />;
      default:
        return <News />;
    }
  };

  return (
    <div className="explore-container">
      <div className="explore-header">
        <h2>Explore Your Destinations</h2>
        <p className="text-muted">
          Discover what's happening around your trip locations
        </p>
      </div>

      {/* <div className="explore-navigation">
        <button
          className={`explore-nav-btn ${
            activeSection === "news" ? "active" : ""
          }`}
          onClick={() => handleSectionChange("news")}
        >
          <i className="fas fa-newspaper"></i>
          News & Events
        </button>
        <button
          className={`explore-nav-btn ${
            activeSection === "recommendations" ? "active" : ""
          }`}
          onClick={() => handleSectionChange("recommendations")}
        >
          <i className="fas fa-star"></i>
          Recommendations
        </button>
        <button
          className={`explore-nav-btn ${
            activeSection === "tips" ? "active" : ""
          }`}
          onClick={() => handleSectionChange("tips")}
        >
          <i className="fas fa-lightbulb"></i>
          Tips
        </button>
      </div> */}

      <div className="explore-content">{renderActiveSection()}</div>
    </div>
  );
}
