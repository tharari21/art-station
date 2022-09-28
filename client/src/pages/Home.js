import {useState, useEffect} from 'react'
import Hero from "../components/Home/Hero"
import UpdatesSection from "../components/Home/UpdatesSection"
import {motion} from 'framer-motion'
const Home = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return (
    <main>
      {message && <div>{message}</div>}
      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true }}
      >
        <Hero />
      </motion.div>
      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true }}
      >

      <UpdatesSection />
      </motion.div>
      {/* <ClassDetails /> */}
    </main>
  );
}

export default Home