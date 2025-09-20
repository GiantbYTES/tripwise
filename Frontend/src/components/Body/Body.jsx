import "./Body.css";
import Day from "../Day/Day";
import Explore from "../Explore/Explore";
import Overview from "../Overview/Overview";

export default function Body({
  selectedDay,
  onDaySelect,
  selectedSection,
  onSectionSelect,
}) {
  const renderContent = () => {
    if (selectedSection && selectedSection.startsWith("explore")) {
      const activeSubSection = selectedSection.replace("explore-", "");
      return (
        <Explore
          initialActiveSection={activeSubSection}
          onSectionSelect={onSectionSelect}
        />
      );
    } else if (selectedSection && selectedSection.startsWith("overview")) {
      const activeSubSection = selectedSection.replace("overview-", "");
      return (
        <Overview
          initialActiveSection={activeSubSection}
          onSectionSelect={onSectionSelect}
        />
      );
    } else {
      return <Day selectedDay={selectedDay} onDaySelect={onDaySelect} />;
    }
  };

  return <div className="body-container">{renderContent()}</div>;
}
