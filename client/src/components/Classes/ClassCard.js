import "./classes.css";
import { useNavigate } from "react-router-dom";
import { convertDate } from "../utils/util";
const ClassCard = ({ classObj }) => {
  const navigate = useNavigate();
  const { weekday, month, day, year, time } = convertDate(classObj.date);
  const convertedDate = `${weekday} ${month}/${day}/${year} @ ${time}`;
  const handleClick = () => {
    // Might need to encrypt id that goes into url
    navigate(`/classes/${classObj.id}/register/new`, { state: classObj });
  };
  return (
    <div
      className={`card${classObj.seats_available === 0 ? " sold-out" : ""}`}
      onClick={handleClick}
    >
      {classObj.seats_available === 0 && (
        <div className="sold-out-label">SOLD OUT</div>
      )}
      <div
        className="card__image"
        style={{ backgroundImage: `url(${classObj.painting.image})` }}
      ></div>
      <div className="card__content">
        <h3 className="card__name">
          {classObj.painting.name.slice(0, 1).toUpperCase() +
            classObj.painting.name.slice(1)}
        </h3>
        <div className="card__date">
          <p>{convertedDate}</p>
          <p>Seats available: {classObj.seats_available}</p>
        </div>
      </div>
      <p className="card__price">${classObj.price}</p>
    </div>
  );
};

export default ClassCard;
