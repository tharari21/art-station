import { useEffect, useState } from "react";
import "./home.css";
import { NavLink } from "react-router-dom";
import UpdateContainer from "./UpdateContainer";
import Logo from "../../assets/logo.png";

const Welcome = () => {
  const [upcomingPaintings, setUpcomingPaintings] = useState();
  useEffect(() => {
    const getUpcomingPaintings = async () => {};
  }, []);

  return (
    <div className="welcome-container">
      <div className="welcome-hero">
        <div className="hero-left">
          <div className="hero-content">
            <h3>Brooklyn's Paint, Party, and Art Supply Place</h3>
          </div>
          <div className="hero-buttons-container">
            <NavLink to="/contact-us" className="visit-us">
              <button>Visit us today!</button>
            </NavLink>
            <NavLink to="learn-more" className="learn-more">
              <button>Learn More</button>
            </NavLink>
          </div>
        </div>
        <div className="hero-right">
          <div className="logo-container">
            <img className="logo" src={Logo} />
          </div>
        </div>
      </div>
      <div className="welcome-description">
        <div>
          <p>
            Art Station is Brooklyn's #1 Local Art Supply Store! We offer every
            art related family activity you could want in one place.
          </p>
        </div>
        <div>
          <p>
            Our venue offers two floors of art supplies, an in-house custom
            framing station, a private event space for children's parties and
            adult paint nights, and art classes every week!
          </p>
        </div>
        <div>
          <p>
            Call now to learn more about our classes, art supplies, party
            packages, activities or custom framing!
          </p>
          <p>(718) 645-4545</p>
        </div>
      </div>

      {/* <h1>THIS WEEK'S CLASS DETAILS WITH SIGN UP NOW BUTTON</h1>
      <h1>NEXT WEEK'S CLASS DETAILS WITH SIGN UP NOW BUTTON</h1> */}
      {/* <UpdateContainer />*/}
      {/* <div className="our-philosophy">
        <h1>What is the Art Station philosophy?</h1>
        <p>
          The Art Station is a one-stop place to take advantage of fun
          activities and learn about various art supplies available. For those
          who feel that they could never do art or question their creative
          abilities, there is always a teacher or craft assistant available to
          answer any questions about our art supply store.
        </p>
        <p>
          Need an art supply store? The Art Station has every art supply you
          could need, regardless of age or skill level.
        </p>
        <p>
          Looking for art classes? We have classes every Sunday, Tuesday, and
          Friday. Children, adults, and seniors reduce their stress levels and
          express their artistic side!
        </p>
      </div> */}
    </div>
  );
};

export default Welcome;
