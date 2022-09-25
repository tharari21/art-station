import {useState} from 'react'

const PartyRequestForm = () => {
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState(null)
    const currentDate = new Date().toISOString()
    const handleChange = (e) => {
        
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(formData)
            const req = await fetch('http://localhost:3000/party_requests', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            const res = await req.json()
            if (req.ok) {

            } else {
                console.log(res)
                setErrors(res.message)
            }
        } catch (e) {
            setErrors(e.message)
        }
    }
  return (
    <form onSubmit={handleSubmit}>
      <label>Date</label>
      <input
        name="date"
        onChange={handleChange}
        type="datetime-local"
      />
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