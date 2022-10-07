import React from "react";
import { convertDate, capitalize } from "../utils/util";
const ClassRegistrationCard = ({ classRegistration }) => {
  const { weekday, month, day, year, time } = convertDate(
    classRegistration?.painting_class?.date
  );
  return (
    <div className="class-registration-card">
      <h2>
        Painting Name:{" "}
        {capitalize(classRegistration?.painting_class?.painting?.name)}
      </h2>
      <div className="class-registration-card__info">

      <h6>
        Class Date: {weekday}, {month}/{day}/{year} at {time}
      </h6>
      <h6>Number of Students: {classRegistration?.number_of_students}</h6>
      </div>
    </div>
  );
};

export default ClassRegistrationCard;
