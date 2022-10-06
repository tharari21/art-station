import PartyRequestCard from "./PartyRequestCard";
import "./party-requests.css";
const PartyRequests = ({ partyRequests }) => {
  return (
    <div className="party-requests-container">
      {partyRequests?.map(partyRequest => (
        <PartyRequestCard key={partyRequest.id} partyRequest={partyRequest} />
      ))}
    </div>
  );
};

export default PartyRequests;
