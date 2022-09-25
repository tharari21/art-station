import { useEffect, useState } from "react";
const CreateClassForm = ({addClass}) => {
  const [paintings, setPaintings] = useState(null)
  const [errors, setErrors] = useState(null)
  const [formData, setFormData] = useState({})
  useEffect(() => {
    const getPaintings = async () => {
      try {
        const req = await fetch('http://localhost:3000/paintings')
        const res = await req.json()
        if (req.ok) {
          console.log('paintings',res)
          setPaintings(res)
        } else {
          setErrors(res)
        }
      } catch (e) {
        setErrors(e.message)
      }
    }
    getPaintings()

  }, [])

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(formData)
      const req = await fetch("http://localhost:3000/classes", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const res = await req.json()
      if (req.ok) {
        console.log(res)
      }else {
        console.log(res)
        
      }
    } catch (e) {

    }

  }
  return (
    <form onSubmit={handleSubmit}>
      <label>Painting</label>
      <select name="painting_id"  onChange={handleChange}>
        {paintings?.map((painting) => (
          <option key={painting.id} value={painting.id}>
            {painting.name}
          </option>
        ))}
      </select>
      <br/>
      <label>Date</label>
      <input name="date" type="datetime-local" onChange={handleChange} />
      <input type="submit" />
    </form>
  );
}

// Protects the component
export default CreateClassForm;
