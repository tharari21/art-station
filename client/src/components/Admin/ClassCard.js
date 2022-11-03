import { useEffect, useState } from "react";
import { convertDate, capitalize } from "../utils/util";
import RegisteredForClassCard from "./RegisteredForClassCard";
const ClassCard = ({ class_, setClasses }) => {
  const { weekday, month, day, year, time } = convertDate(class_.date);

  const [registered, setRegistered] = useState([]);
  const [errors, setErrors] = useState(null);
  const [isOpened, setIsOpened] = useState(false);

  const displayRegistered = () => {
    if (!isOpened) {
      setRegistered(() => {
        setIsOpened(true);
        return class_.painting_class_registrations;
      });
    } else {
      setIsOpened(false);
    }
  };
  const deleteClass = async () => {
    const input = prompt("Are you sure? Type yes to delete class");
    if (input !== "yes") return;
    const req = await fetch(`http://localhost:3000/classes/${class_.id}`, {
      method: "DELETE",
    });
    if (req.ok) {
      setClasses((prev) => prev.filter((item) => item.id !== class_.id));
    } else {
    }
  };

  return (
    <div>
      <div className="class-card" onClick={displayRegistered}>
        <img className="class-card__image" src={class_.painting.image} />
        <div>
          <div>
            <h2>{capitalize(class_.painting.name)}</h2>
            <p>
              {weekday}, {month}/{day}/{year} @{time}
            </p>
          </div>
        </div>
        <button onClick={deleteClass} className="delete-class-btn">
          X
        </button>
      </div>
      {isOpened && (
        <ul className="registered">
          {registered?.map((reservation) => (
            <RegisteredForClassCard
              key={reservation.id}
              reservation={reservation}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClassCard;
