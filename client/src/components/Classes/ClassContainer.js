import { useState, useEffect } from "react";
import Calendar from "./Calendar/Calendar";
import ClassCard from "./ClassCard";
import Filter from "./Filter";
const ClassContainer = () => {
  const [classes, setClasses] = useState(null);
  const [errors, setErrors] = useState(null);

  const [nameFilterBy, setNameFilterBy] = useState("all");
  const [view, setView] = useState("card");

  const [dateFilterBy, setDateFilterBy] = useState("all");
  const [tagFilters, setTagFilters] = useState([]);
  const getUpcomingClasses = async () => {
    try {
      const req = await fetch("http://localhost:3000/classes/upcoming");
      const res = await req.json();
      if (req.ok) {
        setClasses(res);
      } else {
        setErrors(res);
      }
    } catch (e) {}
  };
  useEffect(() => {
    getUpcomingClasses();
  }, []);

  let filteredClasses;
  filteredClasses = classes?.filter((class_) => {
    if (
      nameFilterBy === "all" &&
      dateFilterBy === "all" &&
      tagFilters?.length === 0
    ) {
      return true;
    } else if (nameFilterBy === "all" && dateFilterBy === "all") {
      // check if at least one of the classes tags are in tagFilters
      return class_.painting.tags.some((tag) => tagFilters.includes(tag));
    } else if (nameFilterBy === "all" && tagFilters?.length === 0) {
      return class_.date.slice(0, class_.date.indexOf("T")) === dateFilterBy;
    } else if (dateFilterBy === "all" && tagFilters?.length === 0) {
      return class_.painting.name === nameFilterBy;
    } else if (nameFilterBy === "all") {
      return (
        class_.date.slice(0, class_.date.indexOf("T")) === dateFilterBy &&
        class_.painting.tags.some((tag) => tagFilters.includes(tag))
      );
    } else if (dateFilterBy === "all") {
      return (
        class_.painting.name === nameFilterBy &&
        class_.painting.tags.some((tag) => tagFilters.includes(tag))
      );
    } else if (tagFilters?.length === 0) {
      return (
        class_.painting.name === nameFilterBy &&
        class_.date.slice(0, class_.date.indexOf("T")) === dateFilterBy
      );
    }
  });

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1 style={{ fontSize: "5rem" }}> Classes</h1>
      </div>
      <div>
        <h2> Display Types</h2>
        <button onClick={() => setView("card")}>Cards</button>
        <button onClick={() => setView("calendar")}>Calendar</button>
      </div>
      {view === "card" ? (
        <>
          <Filter
            classes={classes}
            setNameFilterBy={setNameFilterBy}
            setDateFilterBy={setDateFilterBy}
            setTagFilters={setTagFilters}
          />
          <div className="card-container">
            {filteredClasses?.map((class_) => (
              <ClassCard key={class_.id} classObj={class_} />
            ))}
          </div>
        </>
      ) : (
        <div>
          <Calendar classes={classes} />
        </div>
      )}
    </>
  );
};

export default ClassContainer;
