import {NavLink} from 'react-router-dom'
import "./hero.css"

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__left">
        <div className="hero__info">
          <h1 className="hero__title">ART STATION</h1>
          <h3 className="hero__subtitle">
            Brooklyn's Paint, Party, and Art Supply Place
          </h3>
          <p className="hero__description">
            Art Station is Brooklyn's #1 Local Art Supply Store!
          </p>
          <p className="hero__description">
            We offer every art related family activity you could want in one
            place.
          </p>

          <p className="hero__description">
            Not only do we have two floors of art supplies, we also have
            in-house custom framing, a private event space for children's
            parties and adult paint nights, and art classes every week! Visit us
            today!
          </p>
          <div className="hero__buttons">
            <button className="hero__button">
              <NavLink className="button__link button__left" to="/classes">
                Book a Class
              </NavLink>
            </button>
            <button className="hero__button">
              <NavLink className="button__link button__right" to="/contact">
                Contact Us!
              </NavLink>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Hero;