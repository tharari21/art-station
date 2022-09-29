import {useState, useEffect, useContext} from 'react'
import { useSelector } from 'react-redux'
import "./party-request-form.css"
// import { ActionCableContext } from '../..'
const PartyRequestForm = () => {
    const [formData, setFormData] = useState({
      name: "",
      phone_number: "",
      email: ""
    })
    const [errors, setErrors] = useState(null)
    const currentDate = new Date().toISOString()
    const user = useSelector(state => state.user.value)
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
    useEffect(() => {
      console.log(user)
      if (user) setFormData({...formData, email: user.email, phone_number: user.phone_number, name: `${user.first_name} ${user.last_name}`})
    }, [user])
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
      <label>Number of People</label>
      {/* <input
        type="number"
        min={15}
        name="number_of_people"
        onChange={handleChange}
      /> */}
      <label>Date</label>
      <input name="date" onChange={handleChange} type="datetime-local" />
      <label>Name</label>
      <input value={formData.name} name="name" onChange={handleChange} />
      <label>Phone Number</label>
      <input
        value={formData.phone_number}
        name="phone_number"
        onChange={handleChange}
      />
      <label>Email</label>
      <input value={formData.email} name="email" onChange={handleChange} />
      <input type="submit" />
      {errors && errors}
    </form>
  );
}

export default PartyRequestForm