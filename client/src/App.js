import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./redux/user";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Auth from "./pages/Auth/Auth";
import Classes from "./pages/Classes/Classes";
import Parties from "./pages/Parties/Parties";
import ClassRegister from "./pages/Classes/ClassRegister";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Calendar from "./pages/Calendar";
import ProtectedAdminRoute from "./components/utils/AuthRoute";
import Profile from "./pages/Profile";

function App() {
  const user = useSelector(state => state.user.value);
  const dispatch = useDispatch();
  const checkLoginStatus = async () => {
    try {
      console.log("checking logged in status");
      const req = await fetch("http://localhost:3000/logged_in", {
        credentials: "include",
      });
      const res = await req.json();
      if (req.ok) {
        console.log("res", res);
        dispatch(login(res));
      }
    } catch (e) {
      // handle errors
    }
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/register" element={<Auth type="register" />}></Route>
        <Route path="/login" element={<Auth type="login" />}></Route>
        <Route path="/classes" element={<Classes />}></Route>
        <Route path="/parties" element={<Parties />}></Route>
        <Route path="/contact-us" element={<Contact />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route
          path="/classes/:id/register/new"
          element={<ClassRegister />}
        ></Route>
        <Route path="/calendar" element={<Calendar />}></Route>
        <Route element={<ProtectedAdminRoute user={user} isAdminPath={true} />}>
          <Route path="/admin" element={<AdminDashboard />}></Route>
          <Route path="/admin/classes/new" element={<ClassRegister />}></Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
