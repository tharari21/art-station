import "./classes.css"
import { useNavigate } from "react-router-dom";

const ClassCard = ({ classObj }) => {
    const navigate = useNavigate()
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(classObj.date)
    const convertedDate = weekdays[date.getDay()] + ", " + date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear() + " @ " + date.toLocaleString('en-US', { hour: 'numeric', hour12: true })
    const handleClick = () => {
      // Might need to encrypt id that goes into url
      navigate(`/classes/${classObj.id}/register`);
    }
  return (
    <div className="card" onClick={handleClick}>
      <div
        className="card__image"
        style={{ backgroundImage: `url(${classObj.painting.image})` }}
      ></div>
      <div className="card__content">
        <h3 className="card__name">
          {classObj.painting.name.slice(0, 1).toUpperCase() +
            classObj.painting.name.slice(1)}
        </h3>
        <p>{convertedDate}</p>
        <small>${classObj.price}</small>
      </div>
    </div>
  );
};

export default ClassCard