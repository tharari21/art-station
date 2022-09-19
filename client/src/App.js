import './App.css';
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home'
import Auth from './pages/Auth/Auth';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/register" element={<Auth type="register" />}></Route>
        <Route path="/login" element={<Auth type="login" />}></Route>
      </Routes>
    </div>
  );
}

export default App;
