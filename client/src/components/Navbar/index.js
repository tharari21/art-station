import {NavLink} from 'react-router-dom'
import Dropdown from './Dropdown';
import {AiFillCaretDown} from 'react-icons/ai'
import "./navbar.css"
const Navbar = () => {
  return (
    <nav>
      <div className="navbar">
        <ul className="navbar__menu">
          <li className="navbar__item">
            <NavLink className="navbar__link" to="/">
              Home
            </NavLink>
          </li>
          <li className="navbar__item navbar__item--hoverable">
            <NavLink className="navbar__link" to="/store">
              Supplies <AiFillCaretDown size='.5em' style={{float: 'left'}}/>
            </NavLink>
            <Dropdown />
          </li>
          <li className="navbar__item">
            <NavLink className="navbar__link" to="/parties">
              Parties
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink className="navbar__link" to="/framing">
              Framing
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink className="navbar__link" to="/calendar">
              Calendar
            </NavLink>
          </li>
        </ul>
        <ul className="navbar__menu navbar__menu--auth">
          <li className="navbar__item navbar__item--auth">
            <NavLink className="navbar__link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="navbar__item navbar__item--auth">
            <NavLink className="navbar__link" to="/register">
              Sign Up
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar