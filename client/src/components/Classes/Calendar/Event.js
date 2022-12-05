import React from "react";
import styles from "./calendar.module.css";
const Event = ({ class_ }) => {
  return (
    <div className={styles.event} key={class_.id}>
      {new Date(class_.date).toLocaleTimeString("en-US", {
        timeStyle: "short",
      })}{" "}
      Art Class (Kids/Adults)
    </div>
  );
};

export default Event;
