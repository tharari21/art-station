import { useState } from "react";
import "./profile-form.css";
const ProfileForm = ({ user }) => {
  const [updatingEmail, setUpdatingEmail] = useState(false);
  return (
    <div onClick={() => setUpdatingEmail(false)} className="profile-form">
      <h1>Profile Information</h1>
      {updatingEmail ? (
        <>
          <input type="email" value={user?.email} />
          <button>Submit</button>
        </>
      ) : (
        <>
          <p>{user?.email}</p>
          <button onClick={() => setUpdatingEmail(true)}>U</button>
        </>
      )}
    </div>
  );
};

export default ProfileForm;
