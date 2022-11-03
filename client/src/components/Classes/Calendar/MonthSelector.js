import { useState } from "react";
import moment from "moment";

const MonthSelector = ({ dateObject, setDateObject }) => {
  const [showMonthTable, setShowMonthTable] = useState(false);
  const allMonths = moment.monthsShort();

  const months = allMonths.map((month) => (
    <td
      onClick={() =>
        setDateObject(() =>
          moment(dateObject).set("month", allMonths.indexOf(month))
        )
      }
      className="month-select-row"
    >
      <span>{month}</span>
    </td>
  ));
  const monthList = () => {
    let rows = [];
    let cells = [];
    months.forEach((month, i) => {
      if (i % 3 !== 0) {
        cells.push(month);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(month);
      }
      if (i === months.length - 1) {
        rows.push(cells);
      }
    });
    return rows.map((d, i) => {
      return <tr className="month-select-row">{d}</tr>;
    });
  };

  return (
    <div className="month-select-container">
      <div className="month" onClick={() => setShowMonthTable((prev) => !prev)}>
        <h1>{dateObject.format("MMMM")}</h1>
      </div>
      {showMonthTable && (
        <table className="month-select">
          <thead></thead>
          <tbody>{monthList()}</tbody>
        </table>
      )}
    </div>
  );
};

export default MonthSelector;
