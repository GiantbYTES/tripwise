import { useState } from "react";
import "./Tips.css";
import { mockTripData } from "../../../utils/tripData";

export default function Tips() {
  const [activeCategory, setActiveCategory] = useState("transportation");

  const categories = [
    { id: "transportation", name: "Transportation", icon: "fa-car" },
    { id: "cultural", name: "Cultural", icon: "fa-globe" },
    { id: "practical", name: "Practical", icon: "fa-tools" },
  ];

  const getActiveTips = () => {
    return (
      mockTripData.explore.tips.find(
        (tipCategory) =>
          tipCategory.category.toLowerCase() === activeCategory.toLowerCase()
      )?.tips || []
    );
  };

  const getImportanceColor = (importance) => {
    switch (importance.toLowerCase()) {
      case "critical":
        return "#dc3545";
      case "high":
        return "#fd7e14";
      case "medium":
        return "#ffc107";
      case "low":
        return "#28a745";
      default:
        return "#6c757d";
    }
  };

  const getImportanceIcon = (importance) => {
    switch (importance.toLowerCase()) {
      case "critical":
        return "fa-exclamation-triangle";
      case "high":
        return "fa-exclamation-circle";
      case "medium":
        return "fa-info-circle";
      case "low":
        return "fa-check-circle";
      default:
        return "fa-info";
    }
  };

  return (
    <div className="tips-container">
      <div className="tips-header">
        <h3>Travel Tips</h3>
        <p className="text-muted">
          Essential advice for your European adventure
        </p>
      </div>

      <div className="category-navigation">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-btn ${
              activeCategory === category.id ? "active" : ""
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            <i className={`fas ${category.icon}`}></i>
            {category.name}
          </button>
        ))}
      </div>

      <div className="tips-content">
        <div className="category-info">
          <h4>
            <i
              className={`fas ${
                categories.find((c) => c.id === activeCategory)?.icon
              }`}
            ></i>
            {categories.find((c) => c.id === activeCategory)?.name} Tips
          </h4>
        </div>

        <div className="tips-grid">
          {getActiveTips().map((tip, index) => (
            <div key={index} className="tip-card">
              <div className="tip-header">
                <h5>{tip.title}</h5>
                <div
                  className="importance-badge"
                  style={{
                    backgroundColor: getImportanceColor(tip.importance),
                    color: "white",
                  }}
                >
                  <i className={`fas ${getImportanceIcon(tip.importance)}`}></i>
                  {tip.importance}
                </div>
              </div>

              <p className="tip-content">{tip.content}</p>

              <div className="tip-footer">
                <div className="tip-timing">
                  <i className="fas fa-clock"></i>
                  <span>
                    <strong>When:</strong> {tip.timing}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {getActiveTips().length === 0 && (
          <div className="no-tips">
            <i className="fas fa-lightbulb"></i>
            <p>No tips available for this category.</p>
          </div>
        )}
      </div>

      <div className="tips-legend">
        <h6>Importance Levels:</h6>
        <div className="legend-items">
          <div className="legend-item">
            <span
              className="legend-dot"
              style={{ backgroundColor: "#dc3545" }}
            ></span>
            <span>Critical - Must do before/during trip</span>
          </div>
          <div className="legend-item">
            <span
              className="legend-dot"
              style={{ backgroundColor: "#fd7e14" }}
            ></span>
            <span>High - Strongly recommended</span>
          </div>
          <div className="legend-item">
            <span
              className="legend-dot"
              style={{ backgroundColor: "#ffc107" }}
            ></span>
            <span>Medium - Good to know</span>
          </div>
          <div className="legend-item">
            <span
              className="legend-dot"
              style={{ backgroundColor: "#28a745" }}
            ></span>
            <span>Low - Nice to have</span>
          </div>
        </div>
      </div>
    </div>
  );
}
