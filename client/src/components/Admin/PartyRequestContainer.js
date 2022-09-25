import { useEffect, useState } from "react"
import "./party-requests.css"
import PartyRequestCard from "./PartyRequestCard"
const PartyRequestContainer = () => {
    const [partyRequests, setPartyRequests] = useState(null)
    const [errors, setErrors] = useState(null)
    useEffect(() => {
        const getPendingPartyRequests = async () => {
            try {
                const req = await fetch('http://localhost:3000/party_requests/pending')
                const res = await req.json()
                console.log(res)
                // throw new Error('You suckkk')
                if (req.ok) {
                    setPartyRequests(res)
                } else {
                    setErrors(res)
                }
            } catch (e) {
                console.log('err', e)
                setErrors(e.message)
                
            }
        }
        getPendingPartyRequests()
    }, [])
  return (
    <div className="party-request-container">
      <h1 className="party-request-heading">Party Requests</h1>
      {errors && errors}
      {partyRequests?.map((request) => (
        <PartyRequestCard key={request.id} partyRequest={request}/>
      ))}
    </div>
  );
}

export default PartyRequestContainer