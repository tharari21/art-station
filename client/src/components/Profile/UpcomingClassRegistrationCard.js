import React from "react";

const UpcomingClassRegistrationCard = ({ upcomingClassRegistration }) => {
  return (
    <div>
      <h3>
        Painting Name: {upcomingClassRegistration.painting_class.painting.name}
      </h3>
      <h6>Class Date: {upcomingClassRegistration?.painting_class.date}</h6>
      <h6>
        Number of Students: {upcomingClassRegistration?.number_of_students}
      </h6>
    </div>
  );
};

export default UpcomingClassRegistrationCard;
