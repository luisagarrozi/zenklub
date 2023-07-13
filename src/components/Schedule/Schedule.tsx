import { useState } from "react";
import { Timestamp } from "firebase/firestore";

export interface Dates {
  available: boolean;
  date: Timestamp;
}

interface ScheduleProps {
  schedule: Dates[];
}

interface ScheduleByDay {
  [day: string]: Dates[];
}

const Schedule: React.FC<ScheduleProps> = ({ schedule }) => {
  const [startDateIndex, setStartDateIndex] = useState(0);
  const scheduleByDay: ScheduleByDay = {};

  schedule.forEach((date) => {
    const day = date.date
      .toDate()
      .toLocaleDateString("pt-BR", { weekday: "long" });
    if (!scheduleByDay[day]) {
      scheduleByDay[day] = [];
    }
    scheduleByDay[day].push(date);
  });
  const handleNextDates = () => {
    if (startDateIndex < Object.keys(scheduleByDay).length - 4) {
      setStartDateIndex(startDateIndex + 1);
    }
  };

  const handlePreviousDates = () => {
    if (startDateIndex > 0) {
      setStartDateIndex(startDateIndex - 1);
    }
  };

  const renderDates = () => {
    const datesArray = Object.entries(scheduleByDay);
    const visibleDates = datesArray.slice(startDateIndex, startDateIndex + 4);
  
    return visibleDates.map(([day, dates]) => {
      const sortedDates = [...dates].sort((a, b) => {
        const timeA = a.date.toDate().getTime();
        const timeB = b.date.toDate().getTime();
        return timeA - timeB;
      });
  
      return (
        <div key={day} className="schedule_day">
          <h2>{day}</h2>
          {sortedDates.map((date) => (
            <div
              key={date.date.toDate().toString()}
              className={
                date.available ? "schedule_time" : "schedule_time_unavailable"
              }
            >
              <span>
                {date.date
                  .toDate()
                  .toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
              </span>
            </div>
          ))}
        </div>
      );
    });
  };

  return (
    <div className="schedule_container">
      <div className="calendar_navigation">
        <button onClick={handlePreviousDates}>&lt;</button>
        <button onClick={handleNextDates}>&gt;</button>
      </div>
      {renderDates()}
    </div>
  );
};

export default Schedule;