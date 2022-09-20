import "../pages.css"
import RegisterClassForm from "../../components/Classes/RegisterClassForm"
const ClassRegister = () => {
    // Might need to encrypt id that goes into url
  return (
    <section className="register-form-section">
      <RegisterClassForm />
    </section>
  );
}

export default ClassRegister