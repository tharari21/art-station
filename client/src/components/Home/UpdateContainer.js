import { useState, useEffect } from "react";
import UpdateCard from "./UpdateCard";
const UpdateContainer = () => {
  const [updates, setUpdates] = useState();
  useEffect(() => {
    const getUpdates = async () => {
      try {
        const req = await fetch("http://localhost:3000/updates");
        const res = await req.json();
        if (req.ok) {
          setUpdates(res);
        } else {
        }
      } catch (e) {}
    };
    getUpdates();
  }, []);

  return (
    <div className="updates-container">
      <h1>Updates</h1>
      {updates?.map(update => (
        <UpdateCard key={update.id} update={update} />
      ))}
    </div>
  );
};

export default UpdateContainer;
