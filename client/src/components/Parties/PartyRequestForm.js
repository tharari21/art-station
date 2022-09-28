import {useState, useEffect, useContext} from 'react'
import "./party-request-form.css"
// import { ActionCableContext } from '../..'
const PartyRequestForm = () => {
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState(null)
    const currentDate = new Date().toISOString()
    // const cable = useContext(ActionCableContext);
    // const [partyRequestChannel, setPartyRequestChannel] = useState(null);

    // useEffect(() => {
    //   console.log('subscribed')
    //   const channel = cable.subscriptions.create({ channel: "PartyRequestChannel" });
    //   // setPartyRequestChannel(channel);
    //   return () => {
    //     // partyRequestChannel.unsubscribe();
    //     channel.unsubscribe()
    //   }
    // }, [])
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const createPartyRequest = async (e) => {
        e.preventDefault()
        // partyRequestChannel.send(formData);
        await fetch('http://localhost:3000/party_requests', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        })
        
        
    }
  return (
    <form className="party-request-form" onSubmit={createPartyRequest}>
      
      <label>Date</label>
      <input name="date" onChange={handleChange} type="datetime-local" />
      <label>Name</label>
      <input name="name" onChange={handleChange} />
      <label>Phone Number</label>
      <input name="phone_number" onChange={handleChange} />
      <label>Email</label>
      <input name="email" onChange={handleChange} />
      <input type="submit" />
      {errors && errors}
    </form>
  );
}

export default PartyRequestForm