import React from "react";
import UserOrders from "../../components/Profile/UserOrders";
import UpcomingClasses from "../../components/Profile/UpcomingClasses";
import PartyRequests from "../../components/Profile/PartyRequests";
const Profile = () => {
  return (
    <div>
      {/* <UserOrders /> */}
      <UpcomingClasses />
      <PartyRequests />
    </div>
  );
};

export default Profile;
