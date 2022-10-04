import { useState } from "react";
import { convertDate } from "../utils/util";
import {
  AiFillCloseCircle,
  AiFillCheckCircle,
  AiFillEdit,
} from "react-icons/ai";
const PartyRequestCard = ({ partyRequest, setPartyRequests }) => {
  const [updating, setUpdating] = useState(false);
  const { month, day, year, weekday, time } = convertDate(partyRequest.date);
  const handlePartyConfirm = async () => {
    const input = prompt(
      `Are you sure you want to confirm party for ${partyRequest.name} on ${month}/${day}/${year} at ${time}? Type 'yes' to confirm`
    );
    if (input === "yes") {
      // send request
      const req = await fetch(
        `http://localhost:3000/party_requests/${partyRequest.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "pending_payment" }),
        }
      );
      const res = await req.json();
      console.log(res);
      if (req.ok) {
        setPartyRequests(prev =>
          prev.map(item => {
            if (item.id === res.id) {
              return res;
            }
            return item;
          })
        );
      } else {
      }
    }
  };
  const handlePartyReject = async () => {
    const input = prompt(
      `Are you sure you want to reject party request for ${partyRequest.name} on ${month}/${day}/${year} at ${time}? Type 'yes' to confirm`
    );
    if (input === "yes") {
      const req = await fetch(
        `http://localhost:3000/party_requests/${partyRequest.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "rejected" }),
        }
      );
      const res = await req.json();

      console.log("res", res);
      if (req.ok) {
        setPartyRequests(prev =>
          prev.map(item => {
            if (item.id === res.id) {
              return res;
            }
            return item;
          })
        );
      } else {
      }
    }
  };
  const updateDate = async e => {
    e.preventDefault();
    console.log({ date: e.target.date.value });
    const req = await fetch(
      `http://localhost:3000/party_requests/${partyRequest.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: e.target.date.value }),
      }
    );
    const res = await req.json();
    if (req.ok) {
      partyRequest.date = res.date;
      setUpdating(false);
    } else {
    }
  };
  return (
    <div className="party-request-card">
      <div className="party-request-card__content">
        <div className="person-info">
          <h3>
            {partyRequest?.name ||
              partyRequest?.user?.first_name +
                " " +
                partyRequest?.user?.last_name}
          </h3>
        </div>
        <div className="contact-info">
          <p>{partyRequest?.email || partyRequest.user.email}</p>
          <p>{partyRequest?.phone_number || partyRequest.user.phone_number}</p>
        </div>
        <div className="party-info">
          {updating ? (
            <>
              <form className="edit-date-form" onSubmit={updateDate}>
                <input
                  name="date"
                  className="date-input"
                  type="datetime-local"
                />
                <input type="submit" className="submit-btn" />
              </form>
            </>
          ) : (
            <p onClick={() => setUpdating(prev => !prev)}>
              {weekday}, {month}/{day}/{year} @ {time}
            </p>
          )}
        </div>
        {partyRequest.status === "pending" && (
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
        )}
      </div>
    </div>
  );
};

export default PartyRequestCard;
