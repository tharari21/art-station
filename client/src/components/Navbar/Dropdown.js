import React from 'react'

const Dropdown = () => {
  return (
    <div className="navbar__dropdown">
      <div>
        <ul className="navbar__dropdown-list">
          <li className="navbar__dropdown-item">
            <a>Pencils</a>
          </li>
          <li className="navbar__dropdown-item">
            <a>Markers</a>
          </li>
          <li className="navbar__dropdown-item">
            <a>Markers</a>
          </li>
        </ul>
      </div>
      <div>
        <ul className="navbar__dropdown-list">
          <li className="navbar__dropdown-item">
            <a>Pencils</a>
          </li>
          <li className="navbar__dropdown-item">
            <a>Markers</a>
          </li>
          <li className="navbar__dropdown-item">
            <a>Markers</a>
          </li>
        </ul>
      </div>
      <div></div>
    </div>
  );
}

export default Dropdown