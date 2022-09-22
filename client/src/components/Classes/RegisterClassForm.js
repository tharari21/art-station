import {useLocation} from 'react-router-dom'
import { useRef, useState,useEffect } from 'react';
import { convertDate } from './util';
const RegisterClassForm = () => {
  const [formData, setFormData] = useState({
    quantity: 1,
    students: []
  })
  const { state } = useLocation();
  const { id, date, painting, price, max_capacity } = state; // Read values passed on state
  const [currentlyAvailable, setCurrentlyAvailable] = useState(null);
  const getCurrentlyAvailable = async () => {
    const req = await fetch(`http://localhost:3000/classes/${id}/currently_occupied`)
    const res = await req.json()
    console.log(res)
    setCurrentlyAvailable(max_capacity - res.occupied_seats)
  }
  
  useEffect(() => {
    getCurrentlyAvailable();
  }, [])
  const { weekday, month, day, year, time } = convertDate(date);
    
    const handleInputChange = (e) => {
      if (e.target.name.includes("age") || e.target.name.includes("name")) {
        const index = parseInt(e.target.name.slice(e.target.name.indexOf("-")+1))
        const attr = e.target.name.slice(0,e.target.name.indexOf("-"))
        console.log('ind', index)
        
        if (index >= formData.students.length) {
          setFormData({
            ...formData,
            students: [
              ...formData.students,
              { [attr]: (attr === 'age' ? parseInt(e.target.value) : e.target.value) },
            ],
          });

        } else {
          setFormData({...formData, students: formData.students.map((student, i) => {
            if (i === index) {
              return {
                ...student,
                [attr]:
                  attr === "age" ? parseInt(e.target.value) : e.target.value,
              };
            } else {
              return student
            }
          })})
        }
      } 
      else if (e.target.type === "number") {
        setFormData(() => ({
          ...formData,
          [e.target.name]: parseInt(e.target.value),
        }));
      }
       else {
        setFormData(() => ({ ...formData, [e.target.name]: e.target.value }));
      }
    }
    console.log(formData)
    const handleSubmit = async (e) => {
      e.preventDefault()
      const req = await fetch(`http://localhost:3000/classes/${id}/register`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const res = await req.json()

      console.log(res)
      
    }
  return (
    <div className="form-container">
      <div className="class-form__details">
      </div>
      <div >
        <img
          className="class-form__image"
          src={painting.image}
          width="400px"
          height="400px"
        />
        <h2>
          {painting.name.slice(0, 1).toUpperCase() + painting.name.slice(1)}
        </h2>
        <p>Date: {`${weekday}, ${month}/${day}/${year}`}</p>
        <p>Time: {time}</p>
        <p>Total Cost: ${price * formData.quantity}</p>  

      </div>
      <form className="register-class-form" onSubmit={handleSubmit}>
        <label>Quantity</label>
        <input
          name="quantity"
          type="number"
          value={formData.quantity}
          required
          min={1}
          max={currentlyAvailable}
          onChange={handleInputChange}
        />

        {[...Array(parseInt(formData.quantity)).keys()].map((n) => {
          console.log(n);
          return (
            <div key={n}>
              <label>Student {n + 1} Name</label>
              <input name={`name-${n}`} required onChange={handleInputChange} />
              <label>Student {n + 1} Age (must be 6 years or older)</label>
              <input
                name={`age-${n}`}
                required
                type="number"
                min={6}
                onChange={handleInputChange}
              />
            </div>
          );
        })}
        <label>Phone Number</label>
        <input
          name="phone_number"
          type="number"
          required
          onChange={handleInputChange}
        />
        <label>Email</label>
        <input
          required
          name="email"
          type="email"
          onChange={handleInputChange}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default RegisterClassForm;
