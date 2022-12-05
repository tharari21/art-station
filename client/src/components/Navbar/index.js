import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/user";
import { FaBars } from "react-icons/fa";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavOpen = () => {
    setIsOpen(prev => !prev);
  };
  const user = useSelector(state => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const req = await fetch("http://localhost:3000/logout", {
      method: "DELETE",
      credentials: "include",
    });
    if (req.ok) {
      dispatch(login(null));
      navigate("/", { replace: true });
    }
  };

  return (
    <nav className="w-full min-h-[50px] flex justify-between items-center z-10 bg-gray-700/80 text-2xl h-20">
      <div className="hidden sm:block px-4">
        <ul className="flex justify-between gap-6 items-center px-6">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/classes">Classes</NavLink>
          </li>
          <li>
            <NavLink to="/store">
              Supplies
              {/* <AiFillCaretDown size=".5em" style={{ float: "left" }} /> */}
              {/* <Dropdown /> */}
            </NavLink>
          </li>
          <li>
            <NavLink to="/parties">Parties</NavLink>
          </li>
          <li>
            <NavLink to="/framing">Framing</NavLink>
          </li>
        </ul>
      </div>
      <div className="hidden sm:block">
        <ul className="flex justify-between gap-6 items-center px-6">
          {user ? (
            <>
              {user.admin && (
                <li>
                  <NavLink to="/admin">Admin</NavLink>
                </li>
              )}
              <li>
                <NavLink to="/profile">
                  {user.first_name &&
                    user.first_name.slice(0, 1).toUpperCase() +
                      user.first_name.slice(1)}
                </NavLink>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Sign Up</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div
        onClick={toggleNavOpen}
        className="sm:hidden z-10 w-full flex justify-end"
      >
        <FaBars size={20} className="mr-4 cursor-pointer" />
      </div>
      {/* Mobile Menu */}
      <div
        onClick={toggleNavOpen}
        className={
          isOpen
            ? "overflow-y-hidden md:hidden ease-in duration-300 fixed z-20 text-gray-300 left-0 top-0 w-full h-screen bg-black/90 px-4 py-7 flex flex-col"
            : "absolute top-0 h-screen left-[-100%] ease-in duration-500 "
        }
      >
        <ul className="h-full w-full text-center pt-12">
          <li className="text-2xl py-8">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="text-2xl py-8">
            <NavLink to="/classes">Classes</NavLink>
          </li>
          <li className="text-2xl py-8">
            <NavLink to="/store">Supplies</NavLink>
          </li>
          <li className="text-2xl py-8">
            <NavLink to="/parties">Parties</NavLink>
          </li>
          <li className="text-2xl py-8">
            <NavLink to="/framing">Framing</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
