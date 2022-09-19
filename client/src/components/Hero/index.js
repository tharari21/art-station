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
        </div>
        <div className="hero__buttons">
          <button className="hero__button">
            <NavLink className="button__link button__left" to="/classes">
              Book a Class
            </NavLink>
          </button>
          <button className="hero__button">
            <NavLink className="button__link button__right" to="/classes">
              Learn More
            </NavLink>
          </button>
        </div>
      </div>
      <div className="hero__right">
        <div className="image-container">
            
        </div>
      </div>
    </section>
  );
}
export default Hero;