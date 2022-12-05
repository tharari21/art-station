import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import "./pages.css";
import Hero from "../components/Home/Hero";
import Activities from "../components/Home/Activities";
import Gallery from "../components/Home/Gallery";
const Home = () => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
      setSuccess(true);
    }

    if (query.get("canceled")) {
      setMessage("Order canceled");
      setSuccess(false);
    }
    setTimeout(() => {
      setMessage("");
      setSuccess(false);
    }, 5000);
  }, []);

  return (
    <main>
      <Hero />
      <Activities />
      <Gallery />
      {message && (
        <div className={`alert ${success ? "success" : "error"}`}>
          <FiAlertCircle size={40} style={{ marginRight: "2em" }} />
          <div className="message">{message}</div>
        </div>
      )}
    </main>
  );
};

export default Home;
