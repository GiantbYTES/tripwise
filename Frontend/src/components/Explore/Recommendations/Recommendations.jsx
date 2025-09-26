import { useState } from "react";
import "./Recommendations.css";
import { tripData, getAllUniqueLocations } from "../../../utils/tripData";

export default function Recommendations() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const locations = getAllUniqueLocations();
  const categories = [
    "all",
    "restaurants",
    "activities",
    "shopping",
    "cultural sites",
  ];

  const getFilteredRecommendations = () => {
    if (!tripData?.explore?.recommendations) {
      return [];
    }

    let filtered = tripData.explore.recommendations;

    if (activeCategory !== "all") {
      filtered = filtered.filter(
        (rec) => rec.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    if (selectedLocation !== "all") {
      filtered = filtered.filter((rec) =>
        rec.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    return filtered;
  };

  const getRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="rating-stars">
        {[...Array(fullStars)].map((_, i) => (
          <i key={`full-${i}`} className="fas fa-star"></i>
        ))}
        {hasHalfStar && <i className="fas fa-star-half-alt"></i>}
        {[...Array(emptyStars)].map((_, i) => (
          <i key={`empty-${i}`} className="far fa-star"></i>
        ))}
        <span className="rating-number">({rating})</span>
      </div>
    );
  };

  return (
    <div className="recommendations-container">
      <div className="recommendations-header">
        <h3>Recommendations</h3>
        <div className="filters">
          <div className="location-filter">
            <label htmlFor="location-select">Location:</label>
            <select
              id="location-select"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="form-select"
            >
              <option value="all">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-tab ${
              activeCategory === category ? "active" : ""
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="recommendations-content">
        {getFilteredRecommendations().map((categoryRec) => (
          <div key={categoryRec.id} className="category-section">
            <div className="category-header">
              <h4>
                <i
                  className={`fas ${getCategoryIcon(categoryRec.category)}`}
                ></i>
                {categoryRec.category} in {categoryRec.location}
              </h4>
            </div>

            <div className="recommendations-grid">
              {categoryRec.items.map((item, index) => (
                <div key={index} className="recommendation-card">
                  <div className="rec-header">
                    <h5>{item.name}</h5>
                    <span className="rec-type">{item.type}</span>
                  </div>

                  <p className="rec-description">{item.description}</p>

                  <div className="rec-details">
                    {item.rating && (
                      <div className="rec-rating">
                        {getRatingStars(item.rating)}
                      </div>
                    )}

                    {item.priceRange && (
                      <div className="rec-price">
                        <i className="fas fa-euro-sign"></i>
                        <span>{item.priceRange}</span>
                      </div>
                    )}

                    {item.price && (
                      <div className="rec-price">
                        <i className="fas fa-tag"></i>
                        <span>{item.price}</span>
                      </div>
                    )}

                    {item.duration && (
                      <div className="rec-duration">
                        <i className="fas fa-clock"></i>
                        <span>{item.duration}</span>
                      </div>
                    )}
                  </div>

                  {item.address && (
                    <div className="rec-address">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{item.address}</span>
                    </div>
                  )}

                  {item.nearbyAttraction && (
                    <div className="rec-nearby">
                      <i className="fas fa-compass"></i>
                      <span>{item.nearbyAttraction}</span>
                    </div>
                  )}

                  {item.openingHours && (
                    <div className="rec-hours">
                      <i className="fas fa-clock"></i>
                      <span>{item.openingHours}</span>
                    </div>
                  )}

                  {item.bookingRequired && (
                    <div className="booking-required">
                      <i className="fas fa-exclamation-triangle"></i>
                      <span>Booking Required</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {getFilteredRecommendations().length === 0 && (
          <div className="no-recommendations">
            <i className="fas fa-search"></i>
            <p>No recommendations found for the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function getCategoryIcon(category) {
  const icons = {
    Restaurants: "fa-utensils",
    Activities: "fa-hiking",
    Shopping: "fa-shopping-bag",
    "Cultural Sites": "fa-university",
  };
  return icons[category] || "fa-star";
}
