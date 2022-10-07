import { useContext, useEffect, useState } from "react";
import { ActionCableContext } from "../..";
import ClassCard from "./ClassCard";
import "./classes.css";
const ClassesContainer = ({ classes, setClasses, paintings }) => {
  const [nameFilterBy, setNameFilterBy] = useState("all");
  const [dateFilterBy, setDateFilterBy] = useState("all");
  const [futureClassesOnly, setFutureClassesOnly] = useState(false);
  const cable = useContext(ActionCableContext);
  useEffect(() => {
    const channel = cable.subscriptions.create(
      {
        channel: "ClassRegisterChannel",
      },
      {
        received(data) {
          console.log("web socket data", data);
          setClasses(prev =>
            prev.map(class_ => {
              console.log(class_.id + "===" + data.painting_class_id);
              if (class_.id === data.painting_class_id) {
                class_.painting_class_registrations.push(data);
              }
              return class_;
            })
          );
        },
      }
    );
    return () => {
      channel.unsubscribe();
    };
  }, []);
  const datesForFilter = classes?.reduce((prev, current) => {
    const date = current.date.slice(0, current.date.indexOf("T"));
    if (!prev.includes(date)) {
      prev.push(date);
    }
    return prev;
  }, []);
  const today = new Date();
  const filteredClasses = classes?.filter(class_ => {
    if (
      nameFilterBy === "all" &&
      dateFilterBy === "all" &&
      !futureClassesOnly
    ) {
      // neither filter is on
      return true;
    } else if (nameFilterBy === "all" && dateFilterBy === "all") {
      return new Date(class_.date) > today;
    } else if (nameFilterBy === "all" && !futureClassesOnly) {
      return class_.date.slice(0, class_.date.indexOf("T")) === dateFilterBy;
    } else if (dateFilterBy === "all" && !futureClassesOnly) {
      return class_.painting.name === nameFilterBy;
    } else if (dateFilterBy === "all") {
      // Only name filter is on
      return (
        class_.painting.name === nameFilterBy && new Date(class_.date) > today
      );
    } else if (nameFilterBy === "all") {
      // Only date filter is on
      return (
        class_.date.slice(0, class_.date.indexOf("T")) === dateFilterBy &&
        new Date(class_.date) > today
      );
    } else if (!futureClassesOnly) {
      return (
        class_.date.slice(0, class_.date.indexOf("T")) === dateFilterBy &&
        class_.painting.name === nameFilterBy
      );
    } else {
      // Both filters are on
      return (
        class_.painting.name === nameFilterBy &&
        class_.date.slice(0, class_.date.indexOf("T")) === dateFilterBy
      );
    }
  });
  const handleChange = e => {
    if (e.target.checked) {
      setFutureClassesOnly(true);
    } else {
      setFutureClassesOnly(false);
    }
  };

  return (
    <div className="classes-container">
      <h1 className="classes-heading">Classes</h1>
      <div className="filters">
        <select
          name="name-filter"
          onChange={e => setNameFilterBy(e.target.value)}
        >
          <option value="all">-- Filter by Name --</option>
          {paintings?.map(painting => (
            <option key={painting.id} value={painting.name}>
              {painting.name}
            </option>
          ))}
        </select>
        <select
          name="date-filter"
          onChange={e => setDateFilterBy(e.target.value)}
        >
          <option value="all">-- Filter by Date --</option>
          {datesForFilter?.map(date => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
        <label>Future Dates Only?</label>
        <input onChange={handleChange} type="checkbox" />
      </div>

      {filteredClasses?.map(class_ => (
        <ClassCard key={class_.id} class_={class_} setClasses={setClasses} />
      ))}
    </div>
  );
};

export default ClassesContainer;
