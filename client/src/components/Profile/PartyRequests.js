import React from "react";

const PartyRequests = ({ upcomingPartyRequests }) => {
  return (
    <div>
      <h1>Party Requests</h1>
      {upcomingPartyRequests?.map(upcomingPartyRequest => (
        <p key={upcomingPartyRequest}>{upcomingPartyRequest.date}</p>
      ))}
    </div>
  );
};

export default PartyRequests;
