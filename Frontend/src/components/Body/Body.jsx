import "./Body.css";
import Day from "../Day/Day";

export default function Body({ selectedDay, onDaySelect }) {
  return (
    <div className="body-container">
      <Day selectedDay={selectedDay} onDaySelect={onDaySelect} />
    </div>
  );
}
