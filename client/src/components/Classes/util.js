const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const convertDate= (dateString) => {
    const date = new Date(dateString);

    return {
      weekday: weekdays[date.getDay()],
      month: date.getMonth(),
      day: date.getDay(),
      year: date.getFullYear(),
      time: date.toLocaleString("en-US", {
        hour: "2-digit",
        hour12: true,
        minute: "2-digit",
      }),
    };
}

