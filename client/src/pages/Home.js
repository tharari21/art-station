import {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import Welcome from '../components/Home/Welcome';
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
      <Welcome />
    </main>
  );
}

export default Home