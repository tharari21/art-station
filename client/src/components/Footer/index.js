import "./footer.css"
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
            <li></li>
          </ul>
        </div>
        <div className="footer-item">
          <ul className="footer-list">
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