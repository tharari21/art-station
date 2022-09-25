import React, { useEffect, useState } from 'react'
import ClassCard from './ClassCard'
import "./classes.css"
const ClassesContainer = () => {
    const [classes, setClasses] = useState(null)
    const [errors, setErrors] = useState(null)
    useEffect(() => {
        const getUpcomingClasses = async () => {
            try {
                const req = await fetch('http://localhost:3000/classes/upcoming')
                const res = await req.json()
                if (req.ok) {
                    console.log(res)
                    setClasses(res)
                } else {
                    setErrors(res.errors)
                }
            } catch (e) {
                setErrors(e.message)
            }
            
        }
        getUpcomingClasses()
    }, [])
  return (
    <div className="classes-container">
        <h1 className="classes-heading">Classes</h1>
        {classes?.map(class_ => <ClassCard key={class_.id} class_={class_} />)}
    </div>
  )
}

export default ClassesContainer