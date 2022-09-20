import { useEffect, useState } from "react";
import "./updates-section.css"
import UpdateCard from './UpdateCard'
const UpdatesSection = () => {
  const [updates, setUpdates] = useState(null)
  const [errors, setErrors] = useState(null)
  const getUpdates = async () => {
    try {
      const req = await fetch('http://localhost:3000/updates/latest')
      const res = await req.json()
      if (req.ok) {
        console.log('success', res)
        setUpdates(res)
      }
      else {
        console.log('error', res)
        setErrors(res)
      }
    } catch (e) {
      console.log('error', e)
    }
    }
    useEffect(() => {
      getUpdates();
    },[])
  return (
    <section className="updates-section">
      <div className="updates-container">
        <div className="updates">
          {updates?.map(update => {
            return <UpdateCard key={update.id} update={update}/>
          })}
        </div>
      </div>
    </section>
  );
}

export default UpdatesSection