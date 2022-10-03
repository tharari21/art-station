import { useState, useEffect } from "react";
import UserOrders from "../../components/Profile/UserOrders";
import UpcomingClassRegistations from "../../components/Profile/UpcomingClassRegistations";
import PartyRequests from "../../components/Profile/PartyRequests";
import ProfileForm from "../../components/Profile/ProfileForm";
import { useSelector } from "react-redux";
import "./profile.css";
const Profile = () => {
  const user = useSelector(state => state.user.value);
  const [upcomingClassRegistrations, setUpcomingClassRegistrations] = useState(
    []
  );
  const [upcomingPartyRequests, setUpcomingPartyRequests] = useState([]);
  useEffect(() => {
    const getUpcomingClassRegistrations = async () => {
      try {
        const req = await fetch(
          `http://localhost:3000/users/${user.id}/painting_classes`,
          { credentials: "include" }
        );
        const res = await req.json();
        console.log(res);
        if (req.ok) {
          setUpcomingClassRegistrations(res);
        } else {
        }
      } catch (e) {
        console.log("ERROR");
        console.log(e);
      }
    };
    const getUpcomingPartyRequests = async () => {
      try {
        const req = await fetch(
          `http://localhost:3000/users/${user.id}/party_requests`,
          { credentials: "include" }
        );
        const res = await req.json();
        console.log(res);
        if (req.ok) {
          setUpcomingPartyRequests(res);
        } else {
        }
      } catch (e) {
        console.log("ERROR");
        console.log(e);
      }
    };
    getUpcomingClassRegistrations();
    getUpcomingPartyRequests();
  }, [user]);
  return (
    <div className="profile">
      <div className="user-info">
        <h1>
          {user?.first_name} {user?.last_name}
        </h1>
        <h5 className="user-title">Aspiring Painter</h5>
      </div>
      {/* <UserOrders /> */}
      <ProfileForm user={user} />
      <UpcomingClassRegistations
        upcomingClassRegistrations={upcomingClassRegistrations}
      />
      <PartyRequests upcomingPartyRequests={upcomingPartyRequests} />
    </div>
  );
};

export default Profile;
