import React from "react";

const RegisteredForClassCard = ({ reservation }) => {
  return (
    <div className="reservation-card">
      <p>
        Reservation Name:{" "}
        {reservation?.name ||
          reservation.user.first_name + " " + reservation.user.last_name}
      </p>
      <p>
        Reservation Phone Number:{" "}
        {reservation?.phone_number || reservation.user.phone_number}
      </p>
      <p>Reservation Email: {reservation?.email || reservation.user.email}</p>
      <p>Number of Students: {reservation.number_of_students}</p>
    </div>
  );
};

export default RegisteredForClassCard;
