import { convertDate } from "../Classes/util";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";
const PartyRequestCard = ({ partyRequest,setPartyRequests }) => {
    const {month, day, year, weekday, time} = convertDate(partyRequest.date);
    const handlePartyConfirm = async () => {
      const input = prompt(`Are you sure you want to confirm party for ${partyRequest.name} on ${month}/${day}/${year} at ${time}? Type 'yes' to confirm`)
      if (input === "yes") {
        // send request
        const req = await fetch(`http://localhost:3000/party_requests/${partyRequest.id}/confirm`, {
          method: "PATCH"
        })
        const res = await req.json()
        console.log(res)
        if (req.ok) {
          setPartyRequests(prev => prev.filter(item => item.id !== partyRequest.id))
        } else {
          
        }
      }
    }
    const handlePartyReject = async () => {
      const input = prompt(
        `Are you sure you want to reject party request for ${partyRequest.name} on ${month}/${day}/${year} at ${time}? Type 'yes' to confirm`
      );
      if (input === "yes") {
        const req = await fetch(`http://localhost:3000/party_requests/${partyRequest.id}/confirm`, {
          method: "PATCH"
        })
        const res = await req.json()
        if (req.ok) {
          setPartyRequests(prev => prev.filter(item => item.id !== partyRequest.id))
        } else {
          
        }
      }
    }
  return (
    <div className="party-request-card">
      <div className="party-request-card__content">
        <div className="person-info">
          <h3>{partyRequest.name}</h3>
        </div>
        <div className="contact-info">
          <p>{partyRequest.email}</p>
          <p>{partyRequest.phone_number}</p>
        </div>
        <div className="party-info">
          <p>
            {weekday}, {month}/{day}/{year} @ {time}
          </p>
        </div>
        <div className="status-buttons">
          <AiFillCheckCircle
            onClick={handlePartyConfirm}
            color="green"
            size={30}
          />
          <AiFillCloseCircle
            onClick={handlePartyReject}
            color="red"
            size={30}
          />
        </div>
      </div>
    </div>
  );
};

export default PartyRequestCard