import { useState, useEffect } from "react";
import PartyRequestContainer from "../../components/Admin/PartyRequestContainer";
import ClassesContainer from "../../components/Admin/ClassesContainer";
import CreateClassForm from "../../components/Admin/CreateClassForm";
import CreatePaintingForm from "../../components/Admin/CreatePaintingForm";
import { capitalize } from "../../components/utils/util";
// import { TrixEditor } from "react-trix";
import "./admin-dashboard.css";
const AdminDashboard = () => {
  const [paintings, setPaintings] = useState(null);
  const [classes, setClasses] = useState(null);
  const [classErrors, setClassErrors] = useState(null);
  const [paintingErrors, setPaintingErrors] = useState(null);
  const [displayForm, setDisplayForm] = useState("class");
  const inverted = displayForm === "class" ? "painting" : "class";
  useEffect(() => {
    const getPaintings = async () => {
      try {
        const req = await fetch("http://localhost:3000/paintings", {
          credentials: "include",
        });
        const res = await req.json();
        if (req.ok) {
          console.log("paintings", res);
          setPaintings(res);
        } else {
          setPaintingErrors(res);
        }
      } catch (e) {
        setPaintingErrors(e.message);
      }
    };
    const getClasses = async () => {
      try {
        const req = await fetch("http://localhost:3000/classes");
        const res = await req.json();
        if (req.ok) {
          console.log(res);
          setClasses(res);
        } else {
          setClassErrors(res.errors);
        }
      } catch (e) {
        setClassErrors(e.message);
      }
    };
    getClasses();
    getPaintings();
  }, []);
  const addPainting = newPainting => {
    setPaintings([...paintings, newPainting]);
  };
  const addClass = newClass => {
    setClasses([...classes, newClass]);
  };
  const toggleForm = () => {
    setDisplayForm(inverted);
  };

  return (
    <div>
      <div className="admin-dashboard-header">
        <h1>Admin Dashboard</h1>
      </div>
      <div className="admin-dashboard">
        <PartyRequestContainer />
        <ClassesContainer
          classes={classes}
          setClasses={setClasses}
          paintings={paintings}
        />
      </div>
      <div className="class-painting-form-container">
        <button className="toggle-form-btn" onClick={toggleForm}>
          Create {capitalize(inverted)}
        </button>
        {displayForm === "class" ? (
          <CreateClassForm paintings={paintings} addClass={addClass} />
        ) : (
          <CreatePaintingForm addPainting={addPainting} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
