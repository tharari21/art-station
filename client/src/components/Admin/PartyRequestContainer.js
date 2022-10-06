import { useEffect, useState, useContext } from "react";
import { ActionCableContext } from "../..";
import "./party-requests.css";
import PartyRequestCard from "./PartyRequestCard";

const PartyRequestContainer = () => {
  const [filterValue, setFilterValue] = useState("pending");
  const [partyRequests, setPartyRequests] = useState([]);
  const [errors, setErrors] = useState(null);
  const cable = useContext(ActionCableContext);

  useEffect(() => {
    const getPartyRequests = async () => {
      try {
        const req = await fetch("http://localhost:3000/party_requests");
        const res = await req.json();
        // throw new Error('You suckkk')
        if (req.ok) {
          setPartyRequests(res);
        } else {
          setErrors(res);
        }
      } catch (e) {
        setErrors(e.message);
      }
    };
    getPartyRequests();
    const channel = cable.subscriptions.create(
      { channel: "PartyRequestChannel" },
      {
        received(data) {
          // Its getting websocket data on confirmation but its adding another party request
          // and not updating. Add condiional to see if party request exists or not

          // If party request exists
          setPartyRequests(prev => {
            let found = false;
            const updated = prev.map(request => {
              if (request.id === data.id) {
                found = true;
                return data;
              }
              return request;
            });
            if (!found) {
              updated.push(data);
            }
            return updated;
          });
        },
        connected() {
          // Called when the subscription is ready for use on the server
          console.log("SUBSCRIBED");
        },

        disconnected() {
          // Called when the subscription has been terminated by the server
        },
      }
    );
    return () => {
      channel.unsubscribe();
    };
  }, []);

  const filteredPartyRequests = partyRequests.filter(partyRequest => {
    if (filterValue === "all") {
      return true;
    }
    return partyRequest.status === filterValue;
  });
  return (
    <div className="party-request-container">
      <h1 className="party-request-heading">Party Requests</h1>
      <select onChange={e => setFilterValue(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="pending_payment">Pending Payment</option>
        <option value="confirmed">Confirmed</option>
        <option value="rejected">Rejected</option>
        <option value="all">All</option>
      </select>
      {errors && errors}
      {filteredPartyRequests?.map(request => (
        <PartyRequestCard
          key={request.id}
          partyRequest={request}
          setPartyRequests={setPartyRequests}
        />
      ))}
    </div>
  );
};

export default PartyRequestContainer;
