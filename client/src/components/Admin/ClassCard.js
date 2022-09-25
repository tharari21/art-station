import {useState} from 'react'
import { convertDate } from "../Classes/util";
const ClassCard = ({ class_ }) => {
  const {weekday, month, day, year, time} = convertDate(class_.date)
  const [registered, setRegistered] = useState(null)
  const [errors, setErrors] = useState(null)
  const [isOpened, setIsOpened] = useState(false)
  const displayRegistered = async () => {
    if (!isOpened && !registered)  {
        try {
            const req = await fetch(`http://localhost:3000/classes/${class_.id}/registered`)
            const res = await req.json()
            if (req.ok) {
                setRegistered(() => {
                    setIsOpened(true)
                    return res;
                })
            } else {
                setErrors(res)
            }
        } catch (e) {
            setErrors(e.message)
        }
    } else {
        setIsOpened((prev) => !prev)
    }

  }
    
  return (
    <div>
      <div className="class-card" onClick={displayRegistered}>
        <img className="class-card__image" src={class_.painting.image} />
        <div>
          <div>
            <h2>{class_.painting.name}</h2>
            <p>
              {weekday}, {month}/{day}/{year} @{time}
            </p>
          </div>
        </div>
      </div>
      {isOpened && (
        <ul className="registered">
          {registered?.map((student) => (
            <li className="registered__student" key={student.id}>
              {student.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClassCard