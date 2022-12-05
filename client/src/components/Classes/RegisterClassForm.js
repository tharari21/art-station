import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import { convertDate } from "../utils/util";
import { ActionCableContext } from "../..";
const stripePromise = loadStripe(
  "pk_test_51LlFBUCvxdyaKhHoHl5h6LfinnLpjZNvYsRlKbQtGTwK9nU3qXQLKbhXtAOSHKJWQjoyeChgJ7NB40pClUMqQPIh00lvBR3gzh"
);
const RegisterClassForm = () => {
  const user = useSelector(state => state.user.value);
  const [formData, setFormData] = useState({
    number_of_students: 1,
    name: "",
    email: "",
    phone_number: "",
  });
  const { id } = useParams();
  const [painting_class, setPaintingClass] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { date, painting, price, max_capacity, seats_available } =
    painting_class; // Read values passed on state

  useEffect(() => {
    const getPaintingClass = async () => {
      try {
        const req = await fetch(`http://localhost:3000/classes/${id}`);
        const res = await req.json();
        setPaintingClass(res);
      } catch (e) {
        setError("Could not load class");
      }
      setLoading(false);
    };
    getPaintingClass();
  }, []);
  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        user_id: user.id,
        email: user.email,
        phone_number: user.phone_number,
        name: `${user.first_name} ${user.last_name}`,
      });
    }
  }, [user]);
  const { weekday, month, day, year, time } = convertDate(date);

  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>{error}</p>;
  }

  const handleInputChange = e => {
    if (e.target.type === "number") {
      setFormData(() => ({
        ...formData,
        [e.target.name]: parseInt(e.target.value),
      }));
    } else {
      setFormData(() => ({ ...formData, [e.target.name]: e.target.value }));
    }
  };
  const createCheckoutSession = async e => {
    e.preventDefault();
    const stripe = await stripePromise;
    let registrationData;
    if (user) {
      registrationData = { number_of_students: formData.number_of_students };
    } else {
      registrationData = { ...formData };
    }
    // Here we want to create a checkout session!
    try {
      const req = await fetch(`http://localhost:3000/classes/${id}/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });
      const res = await req.json();
      if (req.ok) {
        const result = await stripe.redirectToCheckout({
          sessionId: res.session.id,
        });
        if (result.error) {
          alert(result.error.message);
        }
      } else {
      }
    } catch (e) {}
  };
  return (
    <div className="max-w-[1140px] w-full">
      <div className="md:flex gap-8">
        <div>
          <img className="w-72 h-72" src={painting?.image} />
        </div>
        <div>
          <h2 className="text-4xl">
            {painting?.name.slice(0, 1).toUpperCase() + painting?.name.slice(1)}
          </h2>
          <p>Date: {`${weekday}, ${month}/${day}/${year}`}</p>
          <p>Time: {time}</p>
          <p>Total Cost: ${price * formData.number_of_students}</p>
        </div>
      </div>
      {seats_available > 0 && (
        <div className="m-auto">
          <form>
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
              value={formData.phone_number}
              required
              onChange={handleInputChange}
            />

            <label>Email</label>
            <input
              required
              value={formData.email}
              // disabled={!!user}
              name="email"
              type="email"
              onChange={handleInputChange}
            />
            <button>Add To Cart</button>
            <button onClick={createCheckoutSession}>Buy Now</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegisterClassForm;
