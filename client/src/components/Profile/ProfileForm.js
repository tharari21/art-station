import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/user";
import "./profile-form.css";
import Editable from "../utils/Editable";
const ProfileForm = ({ user }) => {
  const emailRef = useRef();
  const [email, setEmail] = useState(user?.email);
  const firstNameRef = useRef();
  const [firstName, setFirstName] = useState(user?.first_name);
  const lastNameRef = useRef();
  const [lastName, setLastName] = useState(user?.last_name);
  const phoneNumberRef = useRef();
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setPhoneNumber(user.phone_number);
    }
  }, [user]);
  const dispatch = useDispatch();
  const handleBlur = async target => {
    const req = await fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ [target.name]: target.value }),
    });
    const res = await req.json();
    console.log(res);
    dispatch(login(res));
  };

  return (
    <div className="profile-form">
      <div className="profile-details">
        <Editable
          text={user?.email}
          placeholder="Email"
          childRef={emailRef}
          handleBlur={handleBlur}
        >
          <input
            name="email"
            type="email"
            value={email}
            onChange={e => {
              emailRef.current.value = e.target.value;
              setEmail(e.target.value);
            }}
            placeholder="Email"
            ref={emailRef}
          />
        </Editable>
        <Editable
          text={user?.first_name}
          placeholder="First Name"
          childRef={firstNameRef}
          handleBlur={handleBlur}
        >
          <input
            type="text"
            name="first_name"
            value={firstName}
            onChange={e => {
              firstNameRef.current.value = e.target.value;
              setFirstName(e.target.value);
            }}
            placeholder="First Name"
            ref={firstNameRef}
          />
        </Editable>

        <Editable
          text={user?.last_name}
          placeholder="Last Name"
          childRef={lastNameRef}
          handleBlur={handleBlur}
        >
          <input
            type="text"
            name="last_name"
            value={lastName}
            onChange={e => {
              lastNameRef.current.value = e.target.value;
              setLastName(e.target.value);
            }}
            placeholder="Last Name"
            ref={lastNameRef}
          />
        </Editable>
        <Editable
          text={user?.phone_number}
          placeholder="Phone Number"
          childRef={phoneNumberRef}
          handleBlur={handleBlur}
        >
          <input
            type="text"
            name="phone_number"
            value={phoneNumber}
            onChange={e => {
              phoneNumberRef.current.value = e.target.value;
              setPhoneNumber(e.target.value);
            }}
            placeholder="Phone Number"
            ref={phoneNumberRef}
          />
        </Editable>
      </div>
    </div>
  );
};

export default ProfileForm;
