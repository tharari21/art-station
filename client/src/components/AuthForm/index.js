import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FacebookLogin from "react-facebook-login";
import jwt_decode from 'jwt-decode'
import { login } from "../../redux/user";
import "./form.css"


const AuthForm = ({type}) => {
  
  
  const initialFormData = type === 'login' ? {
    username: "",
    password: ""
  } : {
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
    
  } 
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch();
  // render google login button
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        process.env.GOOGLE_CLIENT_ID,
      callback: responseGoogle,
    });
    google.accounts.id.renderButton(
      document.getElementById("signInWithGoogle"),
      { theme: "dark", size: "large" }
    ); // you specify where you want to put the button
        // google.accounts.id.prompt();
  }, [])
  // If user is already logged in, redirect them.
  // isLoggedIn keeps track while you're on this page and user is before the page is loaded
  if (user || isLoggedIn) {
    return <Navigate to="/" replace/>
  }
  // google login / register handling
  const responseGoogle = (response) => {
    // Callback when user logs in with google
    console.log(response)
    const userObject = jwt_decode(response.credential);
    console.log(userObject)
    loginOrRegister({email: userObject.email, })
  }
  const responseFacebook = (response) => {
    console.log(response);
  };
  const componentClicked = () => {};
  // parent function to login / register
  const loginOrRegister = async (payload) => {
    const req = await fetch(`http://localhost:3000/${type}`, {
      method: "POST",
      credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });
      const res = await req.json()
      if (req.ok) {
        // redirect to home screen
        // console.log(res)
        dispatch(login(res));
        setIsLoggedIn(() => true)
    } else {
        setErrors(res)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    loginOrRegister(formData)
  }
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value})
  }
  return (
    <div className="auth-form">
      <h1 className="auth-form__title">
        {type.slice(0, 1).toUpperCase() + type.slice(1)}
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="email"
          type="email"
          placeholder="Email"
        />
        {type === "register" && (
          <>
            <input
              onChange={handleChange}
              name="username"
              className="auth-form__form-control"
              placeholder="Username"
            />
            <input
              onChange={handleChange}
              name="phone_number"
              className="auth-form__form-control"
              placeholder="Phone Number"
            />
            <input
              onChange={handleChange}
              name="first_name"
              className="auth-form__form-control"
              placeholder="First Name"
            />
            <input
              onChange={handleChange}
              name="last_name"
              className="auth-form__form-control"
              placeholder="Last Name"
            />
          </>
        )}
        <input
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Password"
        />
        {type === "register" && (
          <input
            onChange={handleChange}
            name="password_confirmation"
            type="password"
            placeholder="Password Confirmation"
          />
        )}

        <input className="submit-btn" type="submit" />

        <hr />
      </form>
      <div className="oauth-section">
        <small>or {type} with...</small>
        <div className="oauth-buttons">
          <div id="signInWithGoogle"></div>
          {/* <FacebookLogin
            appId="3158663071061499"
            autoLoad={true}
            fields="name,email,picture"
            onClick={componentClicked}
            callback={responseFacebook}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default AuthForm