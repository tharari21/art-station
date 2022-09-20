import { useParams } from "react-router-dom"
import RegisterClassForm from "../components/Classes/RegisterClassForm"
const ClassRegister = () => {
    // Might need to encrypt id that goes into url
    const {id} = useParams()
    console.log(id)
  return (
    <div>
        <RegisterClassForm />
    </div>
  )
}

export default ClassRegister