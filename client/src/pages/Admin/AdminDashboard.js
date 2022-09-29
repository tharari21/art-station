import {useState, useEffect} from 'react'
import PartyRequestContainer from '../../components/Admin/PartyRequestContainer'
import ClassesContainer from '../../components/Admin/ClassesContainer'
import CreateClassForm from '../../components/Admin/CreateClassForm';
import CreatePaintingForm from '../../components/Admin/CreatePaintingForm';
import { TrixEditor } from "react-trix";

const AdminDashboard = () => {
  const [paintings, setPaintings] = useState(null);
  const [classes, setClasses] = useState(null);
  const [classErrors, setClassErrors] = useState(null);
  const [paintingErrors, setPaintingErrors] = useState(null);
  const [displayForm, setDisplayForm] = useState("class")
  const inverted = displayForm === "class" ? "painting" : "class"
  useEffect(() => {
    const getPaintings = async () => {
      try {
        const req = await fetch("http://localhost:3000/paintings");
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
    const getUpcomingClasses = async () => {
      try {
        const req = await fetch("http://localhost:3000/classes/upcoming");
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
    getUpcomingClasses();
    getPaintings();
  }, []);
  const addPainting = (newPainting) => {
    setPaintings([...paintings, newPainting]);
  } 
  const addClass = (newClass) => {
    setClasses([...classes, newClass])
  }
  const toggleForm = () => {
    setDisplayForm(inverted)
  }
  
  return (
    <div>
      <div className="admin-dashboard-header">
        <h1>Admin Dashboard</h1>
      </div>
      <div className="admin-dashboard">
        <PartyRequestContainer />
        <ClassesContainer classes={classes} />
      </div>
      <button onClick={toggleForm}>
        Create {inverted.slice(0, 1).toLowerCase() + inverted.slice(1)}
      </button>
      {displayForm === "class" ? (
        <CreateClassForm paintings={paintings} addClass={addClass} />
      ) : (
        <CreatePaintingForm addPainting={addPainting} />
      )}
    </div>
  );
}

export default AdminDashboard