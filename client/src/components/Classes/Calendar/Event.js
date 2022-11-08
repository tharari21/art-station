import React from "react";

const Event = ({ class_ }) => {
  return (
    <div className="event" key={class_.id}>
      {new Date(class_.date).toLocaleTimeString("en-US", {
        timeStyle: "short",
      })}{" "}
      Art Class (Kids/Adults)
    </div>
  );
};

export default Event;
