import { AiFillInstagram, AiFillFacebook } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import "./footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-item">
          <ul className="footer-list">
            <li>
              Business Hours: <br /> Sunday-Friday 9AM-7PM <br /> Saturday
              Closed
            </li>
            <li>Contact: 718-645-4545 </li>
          </ul>
        </div>
        <div className="footer-item">
          <ul className="footer-list">
            <li>1303 Avenue U, Brooklyn NY</li>
            <li>Terms & Conditions</li>
            <li>Our Philosophy</li>
            {/* <li></li> */}
          </ul>
        </div>
      </div>
      <div className="social-media-icons">
        <div>
          <a href="https://www.instagram.com/theartstationny/">
            <AiFillInstagram />
          </a>
        </div>
        <div>
          <a href="https://www.facebook.com/TheArtStationNY/">
            <AiFillFacebook />
          </a>
        </div>
        <div>
          <a href="https://www.tiktok.com/@artstation29/">
            <FaTiktok />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
