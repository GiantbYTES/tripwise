import { useState } from "react";
import "./Checklist.css";
import { mockTripData } from "../../../utils/tripData";

export default function Checklist() {
  const [activeCategory, setActiveCategory] = useState("pre-travel");
  const [checklistItems, setChecklistItems] = useState(
    mockTripData.overview.checklist
  );

  const categories = [
    { id: "pre-travel", name: "Pre-Travel", icon: "fa-calendar-check" },
    { id: "packing", name: "Packing", icon: "fa-suitcase" },
    { id: "during-trip", name: "During Trip", icon: "fa-route" },
  ];

  const getActiveItems = () => {
    switch (activeCategory) {
      case "pre-travel":
        return checklistItems.preTravel;
      case "packing":
        return checklistItems.packing;
      case "during-trip":
        return checklistItems.duringTrip;
      default:
        return [];
    }
  };

  const getItemsByCategory = (category) => {
    switch (category) {
      case "pre-travel":
        return checklistItems.preTravel;
      case "packing":
        return checklistItems.packing;
      case "during-trip":
        return checklistItems.duringTrip;
      default:
        return [];
    }
  };

  const toggleItem = (itemId) => {
    setChecklistItems((prev) => {
      const newState = { ...prev };
      const categoryKey =
        activeCategory === "pre-travel"
          ? "preTravel"
          : activeCategory === "during-trip"
          ? "duringTrip"
          : "packing";

      newState[categoryKey] = newState[categoryKey].map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      );

      return newState;
    });
  };

  const getProgress = () => {
    const items = getActiveItems();
    const completed = items.filter((item) => item.completed).length;
    return items.length > 0 ? Math.round((completed / items.length) * 100) : 0;
  };

  const getImportanceColor = (importance) => {
    switch (importance?.toLowerCase()) {
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
    switch (importance?.toLowerCase()) {
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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="checklist-container">
      <div className="checklist-header">
        <h3>Trip Checklist</h3>
        <p className="text-muted">
          Stay organized with your travel preparations
        </p>
      </div>

      <div className="category-navigation">
        {categories.map((category) => {
          const categoryItems = getItemsByCategory(category.id);
          const completedCount = categoryItems.filter(
            (item) => item.completed
          ).length;
          const totalCount = categoryItems.length;

          return (
            <button
              key={category.id}
              className={`category-btn ${
                activeCategory === category.id ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <i className={`fas ${category.icon}`}></i>
              {category.name}
              <span className="item-count">
                {completedCount}/{totalCount}
              </span>
            </button>
          );
        })}
      </div>

      <div className="progress-section">
        <div className="progress-header">
          <h4>
            <i
              className={`fas ${
                categories.find((c) => c.id === activeCategory)?.icon
              }`}
            ></i>
            {categories.find((c) => c.id === activeCategory)?.name} Progress
          </h4>
          <span className="progress-percentage">{getProgress()}%</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${getProgress()}%` }}
          ></div>
        </div>
      </div>

      <div className="checklist-content">
        <div className="checklist-items">
          {getActiveItems().map((item) => (
            <div
              key={item.id}
              className={`checklist-item ${item.completed ? "completed" : ""}`}
            >
              <div className="item-checkbox">
                <input
                  type="checkbox"
                  id={item.id}
                  checked={item.completed}
                  onChange={() => toggleItem(item.id)}
                />
                <label htmlFor={item.id} className="checkbox-label">
                  <i className="fas fa-check"></i>
                </label>
              </div>

              <div className="item-content">
                <div className="item-header">
                  <h5>{item.task}</h5>
                  {item.importance && (
                    <div
                      className="importance-badge"
                      style={{
                        backgroundColor: getImportanceColor(item.importance),
                        color: "white",
                      }}
                    >
                      <i
                        className={`fas ${getImportanceIcon(item.importance)}`}
                      ></i>
                      {item.importance}
                    </div>
                  )}
                </div>

                <div className="item-details">
                  {item.category && (
                    <span className="item-category">
                      <i className="fas fa-tag"></i>
                      {item.category}
                    </span>
                  )}

                  {item.deadline && (
                    <span className="item-deadline">
                      <i className="fas fa-calendar"></i>
                      {item.deadline}
                    </span>
                  )}

                  {item.recurring && (
                    <span className="item-recurring">
                      <i className="fas fa-redo"></i>
                      {item.recurring}
                    </span>
                  )}
                </div>

                {item.note && (
                  <div className="item-note">
                    <i className="fas fa-sticky-note"></i>
                    {item.note}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {getActiveItems().length === 0 && (
          <div className="no-items">
            <i className="fas fa-clipboard-list"></i>
            <p>No checklist items found for this category.</p>
          </div>
        )}
      </div>

      <div className="checklist-summary">
        <h4>Overall Progress</h4>
        <div className="summary-grid">
          {categories.map((category) => {
            const items =
              category.id === "pre-travel"
                ? checklistItems.preTravel
                : category.id === "during-trip"
                ? checklistItems.duringTrip
                : checklistItems.packing;
            const completed = items.filter((item) => item.completed).length;
            const progress =
              items.length > 0
                ? Math.round((completed / items.length) * 100)
                : 0;

            return (
              <div key={category.id} className="summary-item">
                <div className="summary-header">
                  <i className={`fas ${category.icon}`}></i>
                  <span>{category.name}</span>
                </div>
                <div className="summary-progress">
                  <span className="summary-count">
                    {completed}/{items.length}
                  </span>
                  <div className="summary-bar">
                    <div
                      className="summary-fill"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <span className="summary-percentage">{progress}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
