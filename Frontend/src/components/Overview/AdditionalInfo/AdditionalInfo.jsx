import { useState } from "react";
import "./AdditionalInfo.css";
import { tripData } from "../../../utils/tripData";

export default function AdditionalInfo() {
  const [activeSection, setActiveSection] = useState("emergency");
  const additionalInfo = tripData?.overview?.additionalInfo;

  // If no additional info data is available, show a message
  if (!additionalInfo) {
    return (
      <div className="additional-info-container">
        <div className="no-data-message">
          <i className="fas fa-info-circle"></i>
          <p>
            No additional information available. Please generate a trip plan
            first.
          </p>
        </div>
      </div>
    );
  }

  const sections = [
    { id: "emergency", name: "Emergency", icon: "fa-phone" },
    { id: "info", name: "Important Info", icon: "fa-info-circle" },
    { id: "weather", name: "Weather", icon: "fa-cloud-sun" },
  ];

  const renderEmergencyContacts = () => (
    <div className="emergency-section">
      <div className="section-header">
        <h4>
          <i className="fas fa-phone"></i> Emergency Contacts
        </h4>
        <p className="text-muted">
          Important numbers for each country on your trip
        </p>
      </div>

      <div className="emergency-grid">
        {additionalInfo.emergencyContacts.map((country, index) => (
          <div key={index} className="emergency-card">
            <div className="country-header">
              <h5>{country.country}</h5>
            </div>

            <div className="contacts-list">
              <div className="contact-item police">
                <i className="fas fa-shield-alt"></i>
                <div className="contact-info">
                  <span className="contact-label">Police</span>
                  <span className="contact-number">{country.police}</span>
                </div>
              </div>

              <div className="contact-item medical">
                <i className="fas fa-ambulance"></i>
                <div className="contact-info">
                  <span className="contact-label">Medical Emergency</span>
                  <span className="contact-number">{country.medical}</span>
                </div>
              </div>

              <div className="contact-item fire">
                <i className="fas fa-fire-extinguisher"></i>
                <div className="contact-info">
                  <span className="contact-label">Fire Department</span>
                  <span className="contact-number">{country.fire}</span>
                </div>
              </div>

              <div className="contact-item general">
                <i className="fas fa-phone-alt"></i>
                <div className="contact-info">
                  <span className="contact-label">General Emergency</span>
                  <span className="contact-number">{country.general}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderImportantInfo = () => (
    <div className="info-section">
      <div className="section-header">
        <h4>
          <i className="fas fa-info-circle"></i> Important Information
        </h4>
        <p className="text-muted">Essential details about your destinations</p>
      </div>

      <div className="info-grid">
        {additionalInfo.importantInfo.map((info, index) => (
          <div key={index} className="info-card">
            <div className="info-header">
              <h5>{info.title}</h5>
            </div>

            <p className="info-content">{info.content}</p>

            <div className="info-relevance">
              <i className="fas fa-lightbulb"></i>
              <span>{info.relevance}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWeatherForecast = () => (
    <div className="weather-section">
      <div className="section-header">
        <h4>
          <i className="fas fa-cloud-sun"></i> Weather Forecast
        </h4>
        <p className="text-muted">5-day weather outlook for your trip</p>
      </div>

      <div className="weather-grid">
        {additionalInfo.weatherForecast.map((weather, index) => (
          <div key={index} className="weather-card">
            <div className="weather-header">
              <h5>{weather.location}</h5>
              <span className="weather-date">
                {new Date(weather.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="weather-main">
              <div className="temperature">
                <span className="temp-high">{weather.high}°</span>
                <span className="temp-separator">/</span>
                <span className="temp-low">{weather.low}°</span>
              </div>

              <div className="weather-condition">
                <i className={`fas ${getWeatherIcon(weather.condition)}`}></i>
                <span>{weather.condition}</span>
              </div>
            </div>

            <div className="weather-details">
              <div className="precipitation">
                <i className="fas fa-tint"></i>
                <span>{weather.precipitation}% chance of rain</span>
              </div>

              <div className="recommendation">
                <i className="fas fa-tshirt"></i>
                <span>{weather.recommendation}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const getWeatherIcon = (condition) => {
    const icons = {
      Sunny: "fa-sun",
      Clear: "fa-sun",
      "Partly Cloudy": "fa-cloud-sun",
      Cloudy: "fa-cloud",
      Rainy: "fa-cloud-rain",
      Stormy: "fa-thunderstorm",
    };
    return icons[condition] || "fa-cloud";
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "emergency":
        return renderEmergencyContacts();
      case "info":
        return renderImportantInfo();
      case "weather":
        return renderWeatherForecast();
      default:
        return renderEmergencyContacts();
    }
  };

  return (
    <div className="additional-info-container">
      <div className="info-header">
        <h3>Additional Information</h3>
        <p className="text-muted">
          Essential details for your European adventure
        </p>
      </div>

      <div className="section-navigation">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`section-btn ${
              activeSection === section.id ? "active" : ""
            }`}
            onClick={() => setActiveSection(section.id)}
          >
            <i className={`fas ${section.icon}`}></i>
            {section.name}
          </button>
        ))}
      </div>

      <div className="info-content">{renderActiveSection()}</div>
    </div>
  );
}
