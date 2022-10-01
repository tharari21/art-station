import { useEffect, useState, useContext } from "react";
import { ActionCableContext } from "../..";
import "./party-requests.css";
import PartyRequestCard from "./PartyRequestCard";

const PartyRequestContainer = () => {
  const [partyRequests, setPartyRequests] = useState([]);
  const [errors, setErrors] = useState(null);
  const cable = useContext(ActionCableContext);

  useEffect(() => {
    console.log("SUBSCRIBING");
    const channel = cable.subscriptions.create(
      { channel: "PartyRequestChannel" },
      {
        received(data) {
          console.log("NEW PARTY REQUEST");
          setPartyRequests(prev => [...prev, data]);
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
  useEffect(() => {
    const getPendingPartyRequests = async () => {
      try {
        const req = await fetch("http://localhost:3000/party_requests/pending");
        const res = await req.json();
        console.log(res);
        // throw new Error('You suckkk')
        if (req.ok) {
          setPartyRequests(res);
        } else {
          setErrors(res);
        }
      } catch (e) {
        console.log("err", e);
        setErrors(e.message);
      }
    };
    getPendingPartyRequests();
  }, []);
  return (
    <div className="party-request-container">
      <h1 className="party-request-heading">Party Requests</h1>
      {errors && errors}
      {partyRequests?.map(request => (
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
