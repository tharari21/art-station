import "./auth.css"
import AuthForm from '../../components/AuthForm'

const Auth = ({type}) => {
  return (
    <main className="auth">
      <div className="auth-container">
        <AuthForm type={type} />
      </div>
    </main>
  );
}

export default Auth