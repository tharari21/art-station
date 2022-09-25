import "./footer.css"
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-item">
          <ul className="footer-list">
            <li> Business Hours:</li>
            <li>Sunday-Friday 9AM-7PM</li>
            <li>Saturday Closed</li>
          </ul>
        </div>
        <div className="footer-item">
          <ul className="footer-list">
            <li>Contact Us</li>
            <li>Terms & Conditions</li>
            <li>Three</li>
            <li>Four</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer