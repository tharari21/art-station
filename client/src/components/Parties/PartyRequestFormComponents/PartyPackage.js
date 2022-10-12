import React from "react";

const PartyPackage = ({ nextStep, handleChange, values }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{ width: "400px", height: "300px", cursor: "pointer" }}
        onClick={handleChange}
        name="package"
        defaultValue="local_train"
      >
        <h3>Local Train</h3>
        <ul>
          <li>Minimum 15 Children</li>
          <li>Pizza Included</li>
          <li>Plaster Painting</li>
        </ul>
      </div>
      <h3>Express Train</h3>
      <ul>
        <li>Minimum 15 Children</li>
        <li>Pizza Included</li>
        <li>Plaster Painting</li>
      </ul>
      <div>
        <h3>The A Train</h3>
        <ul>
          <li>Minimum 15 Children</li>
          <li>Pizza Included</li>
          <li>Plaster Painting</li>
        </ul>
      </div>
      <div>
        <h3>Adult Party</h3>
        <ul>
          <li>Minimum 15 Children</li>
          <li>Pizza Included</li>
          <li>Plaster Painting</li>
        </ul>
      </div>
    </div>
  );
};

export default PartyPackage;
