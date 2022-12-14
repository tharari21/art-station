import { useState } from "react";
import moment from "moment";
import styles from "./calendar.module.css";
import Day from "./Day";
import MonthSelector from "./MonthSelector";
import YearSelector from "./YearSelector";

const Calendar = ({ classes }) => {
  const [dateObject, setDateObject] = useState(moment());
  const [currentDay, setCurrentDay] = useState(moment());
  const firstDayOfTheMonth = dateObject.startOf("month").format("d");
  // returns array of days of week as Mon,Tue,etc
  const weekdays = moment.weekdaysShort().map((weekday, i) => (
    <th key={i} className={styles.weekday}>
      {weekday}
    </th>
  ));

  // Create object where days are keys and classes are values as an array
  const events = classes.reduce((obj, class_) => {
    const dateOfClass = new Date(class_.date);
    const dateArr = dateOfClass.toLocaleDateString().split("/");
    if (
      dateArr[0] === dateObject.format("M") &&
      dateArr[2] === dateObject.format("YYYY")
    ) {
      if (dateOfClass.getDate() in obj) {
        obj[dateOfClass.getDate()].push(class_);
      } else {
        obj[dateOfClass.getDate()] = [class_];
      }
    }
    return obj;
  }, {});
  console.log("events", events);
  const dayList = () => {
    // Blank days before first day of month
    const blanks = [];
    for (let i = 0; i < firstDayOfTheMonth; i++) {
      blanks.push(
        <td className={`${styles["calendar-day"]} ${styles.empty}`}>{""}</td>
      );
    }
    const daysInMonth = [];
    for (let day = 1; day < dateObject.daysInMonth(); day++) {
      let isToday =
        day == currentDay.format("D") &&
        dateObject.format("M") === currentDay.format("M") &&
        dateObject.format("YYYY") === currentDay.format("YYYY");

      daysInMonth.push(
        <Day key={day} day={day} isToday={isToday} events={events[day]} />
      );
    }
    const totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];
    totalSlots.forEach((row, i) => {
      // if index not equal 7 that means not go to next week
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells); // when reach next week we contain all td in last week to rows
        cells = []; // empty container
        cells.push(row); // in current loop we still push current row to new container
      }
      if (i === totalSlots.length - 1) {
        // when end loop we add remain date
        rows.push(cells);
      }
    });
    // rows is now a 2D array where each row is a week and each item in week is a day.
    // Make each week in rows a tr and then each item in rows[i] is a td of a day
    return rows.map((d, i) => {
      return <tr key={i}>{d}</tr>;
    });
  };

  return (
    <div className={styles["calendar-view"]}>
      <div className={styles.selectors}>
        <MonthSelector dateObject={dateObject} setDateObject={setDateObject} />
        <YearSelector
          currentDay={currentDay}
          dateObject={dateObject}
          setDateObject={setDateObject}
        />
      </div>
      <div className={styles["calendar-container"]}>
        <table className={styles.calendar}>
          <thead>
            <tr className={styles.weekdays}>{weekdays}</tr>
          </thead>
          <tbody>{dayList()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
