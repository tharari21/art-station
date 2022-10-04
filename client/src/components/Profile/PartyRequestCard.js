import React from "react";
import { convertDate } from "../utils/util";

const PartyRequestCard = ({ partyRequest }) => {
  const { weekday, month, day, year, time } = convertDate(partyRequest.date);
  console.log(partyRequest);
  return (
    <div>
      <h4>Party Package{partyRequest?.package}</h4>
      <h4>Number of Participants: {partyRequest?.number_of_participants}</h4>
      <h4>Status: {partyRequest?.status}</h4>
      <h4>
        Date: {weekday}, {month}/{day}/{year} at {time}
      </h4>
    </div>
  );
};

export default PartyRequestCard;
