import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const UpcomingClasses = () => {
  const user = useSelector(state => state.user.value);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  useEffect(() => {
    const getUpcomingClasses = async () => {
      try {
        const req = await fetch(
          `http://localhost:3000/users/${user.id}/painting_classes`
        );
        const res = await req.json();
        if (req.ok) {
          setUpcomingClasses(res);
        } else {
        }
      } catch (e) {}
    };
  });
  return (
    <div>
      {upcomingClasses.map(upcomingClass => (
        <p key={upcomingClass.id}>{upcomingClass}</p>
      ))}
    </div>
  );
};

export default UpcomingClasses;
