import "./classes.css"
import { useNavigate } from "react-router-dom";
import {convertDate} from './util'
const ClassCard = ({ classObj }) => {
    const navigate = useNavigate()
    const {weekday, month, day, year, hour} = convertDate(classObj.date)
    const convertedDate = `${weekday} ${month}/${day}/${year} @ ${hour}`
    const handleClick = () => {
      // Might need to encrypt id that goes into url
      navigate(`/classes/${classObj.id}/register/new`, {state: classObj});
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