import { useEffect, useState } from "react"
import "./home.css"
import {NavLink} from 'react-router-dom'
const Welcome = () => {
    const [upcomingPaintings, setUpcomingPaintings] = useState()
    useEffect(() => {
        const getUpcomingPaintings = async () => {

        }

        
    }, [])

  return (
    <div className="welcome-container">
      <h1>The Art Station</h1>
      <h3>Brooklyn's Paint, Party, and Art Supply Place</h3>
      <p>
        Art Station is Brooklyn's #1 Local Art Supply Store! We offer every art
        related family activity you could want in one place.
      </p>
      <p>
        Not only do we have two floors of art supplies, we also have in-house
        custom framing, a private event space for children's parties and adult
        paint nights, and art classes every week!
      </p>
      <NavLink to="contact-us">Visit us today!</NavLink>
      <p>
        Call now to learn more about our classes, art supplies, party packages,
        activities or custom framing!
      </p>
      <p>(718) 645-4545</p>
      
    </div>
  );
}

export default Welcome