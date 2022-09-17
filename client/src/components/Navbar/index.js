import {NavLink} from 'react-router-dom'
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
              Supplies
            </NavLink>
            <div className="navbar__dropdown">
              <ul>
                <li>
                  <a>One</a>
                </li>
                <li>
                  <a>Two</a>
                </li>
              </ul>
            </div>
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
          <li className="navbar__item">
            <NavLink className="navbar__link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="navbar__item">
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