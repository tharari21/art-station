import {NavLink} from 'react-router-dom'
import Dropdown from './Dropdown';
import { useSelector, useDispatch } from "react-redux";
import {login} from '../../redux/user'
import {AiFillCaretDown} from 'react-icons/ai'
import "./navbar.css"
const Navbar = () => {
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch()
  const handleLogout = async () => {
    const req = await fetch('http://localhost:3000/logout', {
      method: "DELETE",
      credentials: "include"
    })
    if (req.ok) {
      dispatch(login(null))
    }
  }

  return (
    <nav>
      <div className="navbar">
        <ul className="navbar__menu">
          <NavLink className="navbar__link" to="/">
            <li className="navbar__item">Home</li>
          </NavLink>
          <NavLink className="navbar__link navbar__item--hoverable" to="/store">
            <li className="navbar__item">
              Supplies <AiFillCaretDown size=".5em" style={{ float: "left" }} />
            </li>
            {/* <Dropdown /> */}
          </NavLink>
          <NavLink className="navbar__link" to="/parties">
            <li className="navbar__item">Parties</li>
          </NavLink>
          <NavLink className="navbar__link" to="/framing">
            <li className="navbar__item">Framing</li>
          </NavLink>
          <NavLink className="navbar__link" to="/calendar">
            <li className="navbar__item">Calendar</li>
          </NavLink>
        </ul>
        <ul className="navbar__menu navbar__menu--auth">
          {user ? (
            <>
              {user.admin && (
                <NavLink className="navbar__link" to="/admin">
                  <li className="navbar__item navbar__item--auth">Admin</li>
                </NavLink>
              )}
              <button
                onClick={handleLogout}
                className="navbar__link navbar__logout"
              >
                <li className="navbar__item navbar__item--auth">Logout</li>
              </button>
              <NavLink className="navbar__link" to="/login">
                <li className="navbar__item navbar__item--auth">
                  {user.username &&
                    user.username.slice(0, 1).toUpperCase() +
                      user.username.slice(1)}
                </li>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink className="navbar__link" to="/login">
                <li className="navbar__item navbar__item--auth">Login</li>
              </NavLink>
              <NavLink className="navbar__link" to="/register">
                <li className="navbar__item navbar__item--auth">Sign Up</li>
              </NavLink>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar