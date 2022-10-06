import { useContext, useEffect, useState } from "react";
import { ActionCableContext } from "../..";
import ClassCard from "./ClassCard";
import "./classes.css";
const ClassesContainer = ({ classes, setClasses, paintings }) => {
  const [nameFilterBy, setNameFilterBy] = useState("all");
  const [dateFilterBy, setDateFilterBy] = useState("all");
  const cable = useContext(ActionCableContext);
  useEffect(() => {
    const channel = cable.subscriptions.create(
      {
        channel: "ClassRegisterChannel",
      },
      {
        received(data) {
          // setClasses(prev =>
          //   prev.map(class_ => {
          //     if (class_.id === data.id) {
          //       class_.painting_class_registrations.push(data);
          //     }
          //     return class_;
          //   })
          // );
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

  const filteredClasses = classes?.filter(class_ => {
    if (nameFilterBy === "all" && dateFilterBy === "all") {
      // neither filter is on
      return true;
    } else if (dateFilterBy === "all") {
      // Only name filter is on
      return class_.painting.name === nameFilterBy;
    } else if (nameFilterBy === "all") {
      // Only date filter is on
      return class_.date.slice(0, class_.date.indexOf("T")) === dateFilterBy;
    } else {
      // Both filters are on
      return (
        class_.painting.name === nameFilterBy &&
        class_.date.slice(0, class_.date.indexOf("T")) === dateFilterBy
      );
    }
  });

  console.log(datesForFilter);
  return (
    <div className="classes-container">
      <h1 className="classes-heading">Classes</h1>
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
      {filteredClasses?.map(class_ => (
        <ClassCard key={class_.id} class_={class_} setClasses={setClasses} />
      ))}
    </div>
  );
};

export default ClassesContainer;
