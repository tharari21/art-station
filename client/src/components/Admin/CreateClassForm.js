import { useEffect, useState } from "react";
const CreateClassForm = ({ addClass, paintings }) => {
  let tomorrow = new Date();
  tomorrow.setHours(4, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  // todaysDate.setTime(todaysDate.getTime() + 2 * 60 * 60 * 1000);
  tomorrow = tomorrow.toISOString().slice(0, -1);
  console.log("paintings", paintings);
  const [formData, setFormData] = useState({
    date: tomorrow,
    painting_id: 1,
  });
  const [errors, setErrors] = useState([]);
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const req = await fetch("http://localhost:3000/classes", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const res = await req.json();
      if (req.ok) {
        addClass(res);
      } else {
        console.log(res);
        setErrors(res.errors);
      }
    } catch (e) {}
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>Painting</label>
      <select name="painting_id" onChange={handleChange}>
        {paintings?.map(painting => (
          <option key={painting.id} value={painting.id}>
            {painting.name}
          </option>
        ))}
      </select>
      <br />
      <label>Date</label>
      <input
        name="date"
        value={formData.date}
        type="datetime-local"
        onChange={handleChange}
      />
      <input type="submit" />
      {errors.length > 0 && errors.map(err => <p>{err}</p>)}
    </form>
  );
};

// Protects the component
export default CreateClassForm;
