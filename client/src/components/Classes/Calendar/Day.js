import styles from "./calendar.module.css";
import Event from "./Event";

const Day = ({ day, isToday, events }) => {
  return (
    <td>
      <div className={styles["calendar-day"]}>
        <div className={styles["calendar-display-day"]}>
          <h3
            className={`${styles["calendar-display-day__text"]} ${
              isToday ? styles.today : ""
            }`}
          >
            {day}
          </h3>
        </div>
        <div className={styles.events}>
          {events &&
            (events.length < 3 ? (
              events.map(class_ => <Event key={class_.id} class_={class_} />)
            ) : (
              <>
                <Event class_={events[0]} />
                <Event class_={events[1]} />
                <button>+ {events.length - 2} other events</button>
              </>
            ))}
        </div>
      </div>
    </td>
  );
};

export default Day;
