import { useState } from "react";
import "./Budget.css";
import { mockTripData } from "../../../utils/tripData";

export default function Budget() {
  const [activeCategory, setActiveCategory] = useState("overview");
  const budgetData = mockTripData.overview.budget;

  const categories = [
    { id: "overview", name: "Overview", icon: "fa-chart-pie" },
    { id: "accommodation", name: "Hotels", icon: "fa-bed" },
    { id: "transportation", name: "Transport", icon: "fa-car" },
    { id: "activities", name: "Activities", icon: "fa-ticket-alt" },
    { id: "food", name: "Food", icon: "fa-utensils" },
    { id: "miscellaneous", name: "Misc", icon: "fa-shopping-cart" },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-EU", {
      style: "currency",
      currency: budgetData.currency,
    }).format(amount);
  };

  const renderOverview = () => (
    <div className="budget-overview">
      <div className="total-budget">
        <h3>Total Estimated Budget</h3>
        <div className="total-amount">
          {formatCurrency(budgetData.totalEstimated)}
        </div>
        <p className="budget-note">For {mockTripData.duration} trip</p>
      </div>

      <div className="budget-breakdown-chart">
        {Object.entries(budgetData.breakdown).map(([key, category]) => {
          const percentage = (
            (category.total / budgetData.totalEstimated) *
            100
          ).toFixed(1);
          return (
            <div key={key} className="budget-category-overview">
              <div className="category-info">
                <h5>{key.charAt(0).toUpperCase() + key.slice(1)}</h5>
                <span className="amount">{formatCurrency(category.total)}</span>
                <span className="percentage">{percentage}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="budget-tips-section">
        <h4>
          <i className="fas fa-lightbulb"></i> Money-Saving Tips
        </h4>
        <div className="tips-grid">
          {budgetData.budgetTips.map((tip, index) => (
            <div key={index} className="tip-card">
              <h6>{tip.category}</h6>
              <p>{tip.tip}</p>
              <div className="savings-badge">
                <i className="fas fa-piggy-bank"></i>
                Save {tip.savings}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCategoryDetails = (categoryKey) => {
    const category = budgetData.breakdown[categoryKey];
    if (!category) return null;

    return (
      <div className="category-details">
        <div className="category-header">
          <h3>
            <i className={`fas ${getCategoryIcon(categoryKey)}`}></i>
            {categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)} Budget
          </h3>
          <div className="category-total">{formatCurrency(category.total)}</div>
        </div>

        {category.perNight && (
          <div className="per-night-info">
            <span>Average per night: {formatCurrency(category.perNight)}</span>
          </div>
        )}

        {category.perDay && (
          <div className="per-day-info">
            <span>Average per day: {formatCurrency(category.perDay)}</span>
          </div>
        )}

        <div className="details-list">
          {category.details.map((detail, index) => (
            <div key={index} className="detail-item">
              <div className="detail-info">
                {detail.location && <h6>{detail.location}</h6>}
                {detail.hotel && (
                  <span className="hotel-name">{detail.hotel}</span>
                )}
                {detail.type && <h6>{detail.type}</h6>}
                {detail.activity && (
                  <span className="activity-name">{detail.activity}</span>
                )}
                {detail.description && (
                  <span className="description">{detail.description}</span>
                )}
                {detail.nights && (
                  <span className="nights">{detail.nights} night(s)</span>
                )}
                {detail.dailyBudget && (
                  <span className="daily">
                    {formatCurrency(detail.dailyBudget)}/day
                  </span>
                )}
              </div>
              <div className="detail-cost">
                {formatCurrency(detail.cost || detail.total)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const getCategoryIcon = (category) => {
    const icons = {
      accommodation: "fa-bed",
      transportation: "fa-car",
      activities: "fa-ticket-alt",
      food: "fa-utensils",
      miscellaneous: "fa-shopping-cart",
    };
    return icons[category] || "fa-euro-sign";
  };

  return (
    <div className="budget-container">
      <div className="budget-header">
        <h3>Budget Planning</h3>
      </div>

      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-tab ${
              activeCategory === category.id ? "active" : ""
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            <i className={`fas ${category.icon}`}></i>
            {category.name}
          </button>
        ))}
      </div>

      <div className="budget-content">
        {activeCategory === "overview"
          ? renderOverview()
          : renderCategoryDetails(activeCategory)}
      </div>
    </div>
  );
}
