import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import "./Schedule.css";

export interface Dates {
  available: boolean;
  date: Timestamp;
}

interface ScheduleProps {
  schedule: Dates[];
}

const Schedule: React.FC<ScheduleProps> = ({ schedule }) => {
  const nextMonth: Date[] = [];
  const currentDate = new Date();
  const datesArray: Date[] = [];
  const [startDateIndex, setStartDateIndex] = useState(0);

  for (let i = 0; i < 30; i++) {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + i + 1
    );
    nextMonth.push(date);
  }

  const timeRange = [
    "8:00",
    "8:30",
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
  ];

  const modifiedSchedule = schedule.map(({ available, date }) => {
    const convertedDate = date.toDate();

    return {
      available,
      date: convertedDate,
    };
  });

  const handleNextDates = () => {
    if (startDateIndex < nextMonth.length - 4) {
      setStartDateIndex(startDateIndex + 4);
    }
  };

  const handlePreviousDates = () => {
    if (startDateIndex >= 4) {
      setStartDateIndex(startDateIndex - 4);
    }
  };

  const renderDates = () => {
    const visibleTimes = nextMonth.slice(startDateIndex, startDateIndex + 4);

    return visibleTimes.map((time) => {
      const formattedDate = time.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const formattedWeekday = time.toLocaleDateString("en-US", {
        weekday: "short",
      });

      const timesList = timeRange.map((timeItem) => {
        const isAvailable = modifiedSchedule.find(
          (scheduleItem) =>
            scheduleItem.date.getDate() === time.getDate() &&
            scheduleItem.date.getHours() === parseInt(timeItem.split(":")[0], 10)
        );
      
        return (
          <div
            key={timeItem}
            className={`schedule_time_slot ${
              isAvailable ? "available" : "unavailable"
            }`}
          >
            {isAvailable ? timeItem : "-"}
          </div>
        );
      });

      return (
        <div key={formattedDate} className="schedule_time">
          <div className="schedule_weekday">{formattedWeekday}</div>
          <div className="schedule_day">{formattedDate}</div>
          <div className="schedule_times">{timesList}</div>
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
      <div className="schedule_day_labels">{renderDates()}</div>
    </div>
  );
};

export default Schedule;
