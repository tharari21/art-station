import { convertDate } from "../Classes/util";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";
const PartyRequestCard = ({ partyRequest }) => {
    const {month, day, year, weekday, time} = convertDate(partyRequest.date);
    const handlePartyConfirm = () => {

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
        </div>
      </div>
    </div>
  );
};

export default PartyRequestCard