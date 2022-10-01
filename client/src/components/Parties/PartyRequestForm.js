import {useState, useEffect, useContext} from 'react'
import { useSelector } from 'react-redux'
import "./party-request-form.css"
// import { ActionCableContext } from '../..'
const PartyRequestForm = () => {
    let tomorrow = new Date();
    tomorrow.setHours(4, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);
    // todaysDate.setTime(todaysDate.getTime() + 2 * 60 * 60 * 1000);
    tomorrow = tomorrow.toISOString().slice(0, -1);
    const [formData, setFormData] = useState({
      date: tomorrow,
      name: "",
      phone_number: "",
      email: "",
      package: ""
    })
    const [childrensParty, setChildrensParty] = useState(true)
    const [errors, setErrors] = useState(null)
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
      if (user) setFormData({...formData, email: user.email, phone_number: user.phone_number, name: `${user.first_name} ${user.last_name}`})
    }, [user])
    const handleChange = (e) => {
      console.log(e.target.value)
      if (e.target.name === "package") {
        if (e.target.value === "adult_party" ) {
          setChildrensParty(false)
        }else {
          setChildrensParty(true)
        }
      }
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const createPartyRequest = async (e) => {
        e.preventDefault()
        console.log(formData)
        // partyRequestChannel.send(formData);
        try {
          const req = await fetch('http://localhost:3000/party_requests', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
          })
          const res = await req.json()
          if (req.ok) {
            console.log(res);
            alert('You have successfully requested to book a party at the Art Station! An email has been sent to you with all the details. We will give you a call as soon as possible to discuss further')
          } else {
            console.log(res);
            setErrors(res.errors)
          }

        } catch (e) {
          setErrors(["A server error occured"]);
        }
        
        
    }
    
  return (
    <form className="party-request-form" onSubmit={createPartyRequest}>
      <label>Date</label>
      <input
        name="date"
        required
        value={formData.date}
        min={tomorrow}
        onChange={handleChange}
        type="datetime-local"
      />
      <label>Party Package</label>
      <select onChange={handleChange} name="package">
        <option value={null}></option>
        <option onSelect={() => setChildrensParty(true)} value="local_train">
          Local Train 🚊
        </option>
        <option onSelect={() => setChildrensParty(true)} value="express_train">
          Express Train 🚊
        </option>
        <option onSelect={() => setChildrensParty(true)} value="a_train">
          The A Train 🚊
        </option>
        <option onSelect={() => setChildrensParty(false)} value="adult_party">
          Adult Party
        </option>
      </select>
      <br />
      {childrensParty ? (
        <>
          <label>Number of Children</label>
          <input
            type="number"
            name="number_of_participants"
            onChange={handleChange}
            placeholder="Number of Children"
            min={15}
          />
        </>
      ) : (
        <>
          <label>Number of Adults</label>
          <input
            type="number"
            name="number_of_participants"
            onChange={handleChange}
            placeholder="Number of Adults"
            min={10}
          />
        </>
      )}
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
      {errors && errors?.map((error, i) => <p key={i}>{error}</p>)}
    </form>
  );
}

export default PartyRequestForm