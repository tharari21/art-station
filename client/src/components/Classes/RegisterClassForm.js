import {useLocation} from 'react-router-dom'
import { useSelector } from 'react-redux';
import {loadStripe} from '@stripe/stripe-js'
import { useState,useEffect } from 'react';
import { convertDate } from './util';
import { ActionCableContext } from "../..";

const stripePromise = loadStripe(
  "pk_test_51LlFBUCvxdyaKhHoHl5h6LfinnLpjZNvYsRlKbQtGTwK9nU3qXQLKbhXtAOSHKJWQjoyeChgJ7NB40pClUMqQPIh00lvBR3gzh"
);
const RegisterClassForm = () => {
  const user = useSelector(state => state.user.value)
  const [formData, setFormData] = useState({
    number_of_students: 1, 
    name: "",
    email: "",
    phone_number: "",
  })
  const { state } = useLocation();
  const { id, date, painting, price, max_capacity, seats_available } = state; // Read values passed on state

  
 
  useEffect(() => {
    if (user) {
      setFormData({...formData, email: user.email})
    }
  }, [user])
  const { weekday, month, day, year, time } = convertDate(date);
    
  const handleInputChange = (e) => {
    if (e.target.type === "number") {
      setFormData(() => ({
        ...formData,
        [e.target.name]: parseInt(e.target.value),
      }));
    }
      else {
      setFormData(() => ({ ...formData, [e.target.name]: e.target.value }));
    }
  }
  const createCheckoutSession = async (e) => {
    e.preventDefault()
    const stripe = await stripePromise
    // Here we want to create a checkout session!
    try {
      const req = await fetch(`http://localhost:3000/classes/${id}/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const res = await req.json()
      if (req.ok) {

        const result = await stripe.redirectToCheckout({
          sessionId: res.session.id
        })
        if (result.error) {
          alert(result.error.message)
        }
      } else {

      }

    } catch (e) {

    }
    
    
    
  }
  return (
    <div className="form-container">
      <div className="class-form__details"></div>
      <div>
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
        <p>Total Cost: ${price * formData.number_of_students}</p>
      </div>
      <form className="register-class-form" onSubmit={createCheckoutSession}>
        <label>Number of Students</label>
        <input
          name="number_of_students"
          type="number"
          value={formData.number_of_students}
          required
          min={1}
          max={seats_available}
          onChange={handleInputChange}
        />

        <label>Reservation Name</label>
        <input
          name="name"
          value={formData.name}
          required
          onChange={handleInputChange}
        />
        <label>Student/s Are 6 Years Old or Older?</label>
        <input name="age-confirmation" required type="checkbox" />
        <label>Phone Number</label>
        <input
          name="phone_number"
          type="number"
          value={formData.phone_number}
          required
          onChange={handleInputChange}
        />

        <label>Email</label>
        <input
          required
          value={formData.email}
          disabled={!!user}
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
