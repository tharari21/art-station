import {useState, useEffect} from 'react'
import ClassCard from './ClassCard';
const ClassContainer = () => {
    const [classes, setClasses] = useState(null);
    const [errors, setErrors] = useState(null);
    const getUpcomingClasses = async () => {
      try {
        const req = await fetch("http://localhost:3000/classes/upcoming");
        const res = await req.json();
        if (req.ok) {
          console.log(res)
          setClasses(res);
        } else {
          setErrors(res);
        }
      } catch (e) {
        
      }
    };
    useEffect(() => {
        getUpcomingClasses();
    }, []);

  return (
    <div className="card-container">
        {classes?.map(class_ => <ClassCard key={class_.id} classObj={class_}/>)}
    </div>
  )
}

export default ClassContainer
