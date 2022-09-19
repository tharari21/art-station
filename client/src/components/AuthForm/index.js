import { useState, useRef } from "react"
import "./form.css"
import { AiFillGoogleCircle, AiFillFacebook } from "react-icons/ai";

const AuthForm = ({type}) => {
    const form = useRef()
    const [errors, setErrors] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(form.current)
        const data = new FormData(form.current)
        console.log(data)
        const req = await fetch(`http://localhost:3000/${type}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: data
        })
        const res = await req.json()
        console.log('res', res)
        if (req.ok) {
            // redirect to home screen
        } else {
            setErrors(res)
        }
    }
  return (
    <div className="auth-form">
      <h1 className="auth-form__title">
        {type.slice(0, 1).toUpperCase() + type.slice(1)}
      </h1>
      <form onSubmit={handleSubmit} ref={form}>
        <input name="username" className="auth-form__form-control" placeholder="Username" />
        {type === "register" && <input name="email" type="email" placeholder="Email" />}
        <input name="password" type="password" placeholder="Password" />
        {type === "register" && (
          <input name="password_confirmation" type="password" placeholder="Password Confirmation" />
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