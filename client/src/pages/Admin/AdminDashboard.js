import { useState, useEffect } from "react";
import PartyRequestContainer from "../../components/Admin/PartyRequestContainer";
import ClassesContainer from "../../components/Admin/ClassesContainer";
import CreateClassForm from "../../components/Admin/CreateClassForm";
import CreatePaintingForm from "../../components/Admin/CreatePaintingForm";
import { capitalize } from "../../components/utils/util";
import "./admin-dashboard.css";
const AdminDashboard = () => {
  const [paintings, setPaintings] = useState(null);
  const [classes, setClasses] = useState(null);
  const [classErrors, setClassErrors] = useState(null);
  const [paintingErrors, setPaintingErrors] = useState(null);
  const [displayCreateClassForm, setDisplayCreateClassForm] = useState(true);
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
  const addPainting = (newPainting) => {
    setPaintings([...paintings, newPainting]);
  };
  const addClass = (newClass) => {
    setClasses((prev) => {
      let pushed = false;
      const newClassDate = new Date(newClass.date);
      return prev.reduce((items, cur) => {
        if (!pushed) {
          console.log(newClassDate);
          console.log(new Date(cur.date));
          if (newClassDate < new Date(cur.date)) {
            items.push(newClass);
            pushed = true;
          }
        }
        items.push(cur);
        return items;
      }, []);
    });
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
        <div className="toggle-form-buttons">
          <button
            className={`toggle-form-btn${
              displayCreateClassForm ? " current-tab" : ""
            }`}
            onClick={() => setDisplayCreateClassForm(true)}
          >
            Create Class
          </button>
          <button
            className={`toggle-form-btn${
              displayCreateClassForm ? "" : " current-tab"
            }`}
            onClick={() => setDisplayCreateClassForm(false)}
          >
            Create Painting
          </button>
        </div>
        {displayCreateClassForm ? (
          <CreateClassForm paintings={paintings} addClass={addClass} />
        ) : (
          <CreatePaintingForm addPainting={addPainting} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
