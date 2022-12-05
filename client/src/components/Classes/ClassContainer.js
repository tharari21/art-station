import { useState, useEffect } from "react";
import Calendar from "./Calendar/Calendar";
import ClassCard from "./ClassCard";
import Filter from "./Filter";
const ClassContainer = () => {
  const [classes, setClasses] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const [nameFilterBy, setNameFilterBy] = useState("all");
  const [view, setView] = useState("card");

  const [dateFilterBy, setDateFilterBy] = useState("all");
  const [tagFilters, setTagFilters] = useState([]);
  const getUpcomingClasses = async () => {
    setErrors("");
    setLoading(true);
    try {
      const req = await fetch("http://localhost:3000/classes/upcoming");
      const res = await req.json();
      console.log(res);
      if (req.ok) {
        setClasses(res);
      } else {
        setErrors(res);
      }
    } catch (e) {
      setErrors(e.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    getUpcomingClasses();
  }, []);

  let filteredClasses;
  filteredClasses = classes?.filter(class_ => {
    if (
      nameFilterBy === "all" &&
      dateFilterBy === "all" &&
      tagFilters?.length === 0
    ) {
      return true;
    } else if (nameFilterBy === "all" && dateFilterBy === "all") {
      // check if at least one of the classes tags are in tagFilters
      return class_.painting.tags.some(tag => tagFilters.includes(tag));
    } else if (nameFilterBy === "all" && tagFilters?.length === 0) {
      return class_.date.slice(0, class_.date.indexOf("T")) === dateFilterBy;
    } else if (dateFilterBy === "all" && tagFilters?.length === 0) {
      return class_.painting.name === nameFilterBy;
    } else if (nameFilterBy === "all") {
      return (
        class_.date.slice(0, class_.date.indexOf("T")) === dateFilterBy &&
        class_.painting.tags.some(tag => tagFilters.includes(tag))
      );
    } else if (dateFilterBy === "all") {
      return (
        class_.painting.name === nameFilterBy &&
        class_.painting.tags.some(tag => tagFilters.includes(tag))
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
      <div>
        <h1 className="text-center text-4xl font-bold"> Classes</h1>
      </div>
      <div>
        <h2>Display Types</h2>
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
          <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredClasses && filteredClasses.length > 0 ? (
              filteredClasses.map(class_ => (
                <ClassCard key={class_.id} classObj={class_} />
              ))
            ) : loading ? (
              <p>Loading...</p>
            ) : (
              <p>No Upcoming Classes</p>
            )}
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
