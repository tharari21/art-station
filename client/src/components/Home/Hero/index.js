import {NavLink} from 'react-router-dom'
import {motion} from 'framer-motion'
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
          <motion.div
            initial={{opacity: 0}}
            whileInView={{ opacity: 1 }}
            transition={{  duration: 2 }}
            className="hero__cards"
          >
            <NavLink className="link" to="/classes">
              <div className="card__link classes">
                <h2>Classes</h2>
              </div>
            </NavLink>
            <div className="card__link parties">
              <h2>Parties / School Trips</h2>
            </div>
            <div className="card__link framing">
              <h2>Framing</h2>
            </div>
            <div className="card__link supplies">
              <h2>Supplies</h2>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
export default Hero;