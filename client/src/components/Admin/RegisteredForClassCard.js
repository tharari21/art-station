import React from 'react'

const RegisteredForClassCard = ({reservation}) => {
  return (
    <div className="reservation-card">
      <p>Reservation Name: {reservation.name}</p>
      <p>Reservation Phone Number: {reservation.name}</p>
      <p>Reservation Email: {reservation.email}</p>
      <p>Number of Students: {reservation.number_of_students}</p>
    </div>
  );
}

export default RegisteredForClassCard