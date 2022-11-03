import "./calendar.css";

const Day = ({ day, isToday, event }) => {
  return (
    <td>
      <div className={`calendar-day`}>
        <div className="calendar-display-day">
          <h3
            className={`calendar-display-day__text ${isToday ? "today" : ""}`}
          >
            {day}
          </h3>
        </div>
        <div className="events">
          {event &&
            event.map((class_) => (
              <div onMouseOver className="event" key={class_.id}>
                {new Date(class_.date).toLocaleTimeString("en-US", {
                  timeStyle: "short",
                  timeZone: "UTC",
                })}{" "}
                Art Class (Kids/Adults)
              </div>
            ))}
        </div>
      </div>
    </td>
  );
};

export default Day;
