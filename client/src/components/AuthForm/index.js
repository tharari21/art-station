import { useState, useRef } from "react"
import "./form.css"
import { AiFillGoogleCircle, AiFillFacebook } from "react-icons/ai";

const AuthForm = ({type}) => {
    const initialFormData = type === 'login' ? {
      username: "",
      password: ""
    } : {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",

    } 
    const [formData, setFormData] = useState(initialFormData)
    const [errors, setErrors] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const req = await fetch(`http://localhost:3000/${type}`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        });
        const res = await req.json()
        console.log('res', res)
        if (req.ok) {
            // redirect to home screen
        } else {
            setErrors(res)
        }
    }
    const handleChange = (e) => {
      setFormData({...formData, [e.target.name] : e.target.value})
    }
  return (
    <div className="auth-form">
      <h1 className="auth-form__title">
        {type.slice(0, 1).toUpperCase() + type.slice(1)}
      </h1>
      <form onSubmit={handleSubmit} >
        <input onChange={handleChange} name="username" className="auth-form__form-control" placeholder="Username" />
        {type === "register" && <input onChange={handleChange} name="email" type="email" placeholder="Email" />}
        <input onChange={handleChange} name="password" type="password" placeholder="Password" />
        {type === "register" && (
          <input onChange={handleChange} name="password_confirmation" type="password" placeholder="Password Confirmation" />
        )}

        <input className="submit-btn" type="submit" />

        <hr />
      </form>
      <div className="oauth-section">
        <small>or {type} with...</small>
        <div className="oauth-buttons">
          <button>
            <AiFillGoogleCircle />
            Google
          </button>
          <button>
            <AiFillFacebook />
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthForm