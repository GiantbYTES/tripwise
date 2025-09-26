import { useState } from "react";
import "./News.css";
import { tripData, getAllUniqueLocations } from "../../../utils/tripData";

export default function News() {
  const [selectedLocation, setSelectedLocation] = useState("all");
  const locations = getAllUniqueLocations();

  const getFilteredNews = () => {
    if (!tripData?.explore?.news) {
      return [];
    }

    if (selectedLocation === "all") {
      return tripData.explore.news;
    }
    return tripData.explore.news.filter((item) =>
      item.location.toLowerCase().includes(selectedLocation.toLowerCase())
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="news-container">
      <div className="news-header">
        <h3>News & Events</h3>
        <div className="location-filter">
          <label htmlFor="location-select">Filter by location:</label>
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

      <div className="news-content">
        {getFilteredNews().map((locationNews) => (
          <div key={locationNews.id} className="location-news-section">
            <div className="location-header">
              <h4>
                <i className="fas fa-map-marker-alt"></i>
                {locationNews.location}
              </h4>
              <span className="visit-date">
                Visit Date: {formatDate(locationNews.date)}
              </span>
            </div>

            <div className="articles-grid">
              {locationNews.articles.map((article, index) => (
                <div key={index} className="news-article-card">
                  <div className="article-header">
                    <h5>{article.title}</h5>
                    <div className="article-meta">
                      <span className="source">{article.source}</span>
                      <span className="publish-date">
                        {formatDate(article.publishDate)}
                      </span>
                    </div>
                  </div>

                  <p className="article-summary">{article.summary}</p>

                  <div className="article-relevance">
                    <i className="fas fa-info-circle"></i>
                    <span>{article.relevance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {getFilteredNews().length === 0 && (
          <div className="no-news">
            <i className="fas fa-newspaper"></i>
            <p>No news found for the selected location.</p>
          </div>
        )}
      </div>
    </div>
  );
}
