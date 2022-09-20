import {useLocation} from 'react-router-dom'
import { useRef } from 'react';
import { convertDate } from './util';
const RegisterClassForm = () => {
    const quantity = useRef(1)
    const { state } = useLocation();
    const { id, date, painting, price } = state; // Read values passed on state
    const { weekday, month, day, year, time } = convertDate(date);
    const handleQuantityChange = (e) => {
      if (!e.target.value) {
        quantity.current=0
      }
      quantity.current = e.target.value
    }
    console.log(quantity)
  return (
    <div>
      <img src={painting.image} width="400px" height="400px" />
      <h2>{painting.name.slice(0,1).toUpperCase() + painting.name.slice(1)}</h2>
      <p>Date: {`${weekday}, ${month}/${day}/${year}`}</p>
      <p>Time: {time}</p>
      <p>Total Cost: {price*quantity.current}</p>
      <form>
        <label>Quantity</label>
        <input name="quantity" type="number" min={0} ref={quantity} onChange={handleQuantityChange}/>
        <label>Name</label>
        <input name="name" />
        <label>Age (must be 6 years or older)</label>
        <input name="age" type="number" min={6} />
        <label>Phone Number</label>
        <input name="phone_number" type="number" />
        <label>Email</label>
        <input name="email" type="number" maxLength={10} />
        <input type="submit"/>
      </form>
    </div>
  );
};

export default RegisterClassForm;
