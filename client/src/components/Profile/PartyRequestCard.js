import React from "react";
import { capitalize, convertDate } from "../utils/util";

const PartyRequestCard = ({ partyRequest }) => {
  const { weekday, month, day, year, time } = convertDate(partyRequest.date);
  console.log(partyRequest);
  return (
    <div className="profile-party-request-card">
      <h3>
        Party Package:{" "}
        {partyRequest?.package
          .split("_")
          .map(item => capitalize(item))
          .join(" ")}
      </h3>
      <h6>Number of Participants: {partyRequest?.number_of_participants}</h6>
      <h6>Status: {capitalize(partyRequest?.status)}</h6>
      <h4>
        Date: {weekday}, {month}/{day}/{year} at {time}
      </h4>
    </div>
  );
};

export default PartyRequestCard;
