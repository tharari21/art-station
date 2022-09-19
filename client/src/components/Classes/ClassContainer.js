import {useState, useEffect} from 'react'

const ClassContainer = () => {
    const [classes, setClasses] = useState(null);
    const [errors, setErrors] = useState(null);
    const getUpcomingClasses = async () => {
      try {
        const req = await fetch("http://localhost:3000/classes/upcoming");
        const res = await req.json();
        if (req.ok) {
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
    <div>
        {classes?.map(class_ => <ClassCard classObj={class_}/>)}
    </div>
  )
}

export default ClassContainer
