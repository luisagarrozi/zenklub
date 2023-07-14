import { useState } from "react";
import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import "./Schedule.css";

export interface Dates {
  available: boolean;
  date: Timestamp;
  id: string;
}

interface ScheduleProps {
  schedule: Dates[];
  professionalId: string;
}

const Schedule: React.FC<ScheduleProps> = ({ schedule, professionalId }) => {
  const nextMonth: Date[] = [];
  const currentDate = new Date();
  const [startDateIndex, setStartDateIndex] = useState(0);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [itemId, setiItemId] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState(false);

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

  const modifiedSchedule = schedule.map(({ available, date, id }) => {
    const convertedDate = date.toDate();

    return {
      available,
      id,
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

  const setSchedule = async () => {
    setConfirmationModal(false)
      const scheduleRef = doc(
        db,
        "professionals",
        `${ professionalId }`,
        "schedule",
        `${ itemId }`
      );

      await updateDoc(scheduleRef, {
        available: false
      });
      setConfirmationMessage(true)
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
        const hasItem = modifiedSchedule.find(
          (scheduleItem) =>
            scheduleItem.date.getDate() === time.getDate() &&
            scheduleItem.date.getHours() ===
              parseInt(timeItem.split(":")[0], 10) &&
            scheduleItem.date.getMinutes() ===
              parseInt(timeItem.split(":")[1], 10)
        );

        const handleSchedule = () => {
          if (hasItem && hasItem.available) {
            setiItemId(hasItem.id)
            setConfirmationModal(true)
          }
        };

        return (
          <div
            key={timeItem}
            className="schedule_timeslot"
            onClick={() => handleSchedule()}
          >
            {hasItem && hasItem.available === true ? timeItem : "-"}
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
      {confirmationModal && (
            <div className="schedule_confirmation">
              <p className="schedule_confirmation_text">
                Deseja agendar este horário?
              </p>
              <button className="schedule_confirm" onClick={setSchedule}>
                Sim
              </button>
              <button
                className="schedule_deny"
                onClick={() => setConfirmationModal(false)}
              >
                Não
              </button>
            </div>
          )}
          {confirmationMessage && (<div className="schedule_confirmation_message">Horário agendado com sucesso!</div>)}
    </div>
  );
};

export default Schedule;
