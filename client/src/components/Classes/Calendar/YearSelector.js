import React from "react";
import moment from "moment";
const YearSelector = ({ dateObject, setDateObject }) => {
  const currentYear = dateObject.format("Y");

  const yearTable = () => {
    let months = [];
    // 12 years from now
    let tenYearsFromNow = moment()
      .set(currentYear, "year")
      .add(12, "year")
      .format("Y");
    const getDates = (startDate, stopDate) => {
      // returns array of all years between the two dates
      var dateArray = [];
      var currentDate = moment(startDate);
      var stopDate = moment(stopDate);
      while (currentDate <= stopDate) {
        dateArray.push(moment(currentDate).format("YYYY"));
        currentDate = moment(currentDate).add(1, "year");
      }
      return dateArray;
    };
    const twelveYears = getDates(currentYear, tenYearsFromNow);
    twelveYears.map((data) => {
      months.push(
        <td
          key={data}
          className="calendar-month"
          onClick={(e) => {
            setDateObject(() => moment(dateObject).set("year", data));
          }}
        >
          <span>{data}</span>
        </td>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i == 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let yearlist = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="4">Select a Year</th>
          </tr>
        </thead>
        <tbody>{yearlist}</tbody>
      </table>
    );
  };

  return <div>{yearTable()}</div>;
};

export default YearSelector;
