import "./calendar.css";
import Event from "./Event";

const Day = ({ day, isToday, events }) => {
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
          {events &&
            (events.length < 3 ? (
              events.map(class_ => <Event class_={class_} />)
            ) : (
              <>
                <Event class_={events[0]} />
                <Event class_={events[1]} />
                <p>+ {events.length - 2} other events</p>
              </>
            ))}
        </div>
      </div>
    </td>
  );
};

export default Day;
