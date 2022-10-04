import { useState, useEffect } from "react";
import UserOrders from "../../components/Profile/UserOrders";
import ClassRegistations from "../../components/Profile/ClassRegistations";
import PartyRequests from "../../components/Profile/PartyRequests";
import ProfileForm from "../../components/Profile/ProfileForm";
import { useSelector } from "react-redux";
import "./profile.css";
const Profile = () => {
  const user = useSelector(state => state.user.value);
  const [currentTab, setCurrentTab] = useState("profile"); // [profile,classes,parties]
  const [classRegistrations, setClassRegistrations] = useState([]);
  const [partyRequests, setPartyRequests] = useState([]);
  useEffect(() => {
    const getClassRegistrations = async () => {
      try {
        const req = await fetch(
          `http://localhost:3000/users/${user.id}/painting_classes`,
          { credentials: "include" }
        );
        const res = await req.json();
        console.log(res);
        if (req.ok) {
          setClassRegistrations(res);
        } else {
        }
      } catch (e) {
        console.log("ERROR");
        console.log(e);
      }
    };
    const getPartyRequests = async () => {
      try {
        const req = await fetch(
          `http://localhost:3000/users/${user.id}/party_requests`,
          { credentials: "include" }
        );
        const res = await req.json();
        console.log(res);
        if (req.ok) {
          setPartyRequests(res);
        } else {
        }
      } catch (e) {
        console.log("ERROR");
        console.log(e);
      }
    };
    if (user) {
      getClassRegistrations();
      getPartyRequests();
    }
  }, [user]);

  let page;
  if (currentTab === "profile") {
    page = <ProfileForm user={user} />;
  } else if (currentTab === "classes") {
    page = <ClassRegistations classRegistrations={classRegistrations} />;
  } else if (currentTab === "parties") {
    page = <PartyRequests partyRequests={partyRequests} />;
  }
  return (
    <div className="profile">
      <div className="user-info">
        <h1>
          {user?.first_name} {user?.last_name}
        </h1>
        <h5 className="user-title">Aspiring Painter</h5>
      </div>
      <div className="tab-toggle">
        <div onClick={() => setCurrentTab("profile")}>Profile</div>
        <div onClick={() => setCurrentTab("classes")}>Classes</div>
        <div onClick={() => setCurrentTab("parties")}>Party Requests</div>
      </div>
      {page}
    </div>
  );
};

export default Profile;
