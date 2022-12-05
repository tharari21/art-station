import { useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
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
      className={`card cursor-pointer relative ${
        classObj.seats_available === 0
          ? "disabled:opacity-75 pointer-events-none cursor-not-allowed focus:outline-none"
          : ""
      }`}
      onClick={handleClick}
    >
      {classObj.seats_available === 0 && (
        <div className="w-full h-[20%] bg-red-700/80 absolute top-[50%] ">
          <h1 className="text-center text-6xl">SOLD OUT</h1>
        </div>
      )}
      <img className="card__image h-[300px]" src={classObj.painting.image} />
      <div className="px-4 py-6">
        <h3 className="card__title">
          {classObj.painting.name.slice(0, 1).toUpperCase() +
            classObj.painting.name.slice(1)}
        </h3>
        <div className="">
          <p>{convertedDate}</p>
        </div>
      </div>
      <div className="flex justify-between bg-gray-200 relative bottom-0 m-0 h-8">
        <div>
          <p>
            <BsFillPersonFill className="inline" />
            Seats available: <span>{classObj.seats_available}</span>
          </p>
        </div>
        <div>
          <p className="">${classObj.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
