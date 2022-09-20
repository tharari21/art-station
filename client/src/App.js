import './App.css';
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home'
import Auth from './pages/Auth/Auth';
import Classes from './pages/Classes';
import ClassRegister from './pages/ClassRegister';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/register" element={<Auth type="register" />}></Route>
        <Route path="/login" element={<Auth type="login" />}></Route>
        <Route path="/classes" element={<Classes />}></Route>
        <Route path="/classes/:id/register/new" element={<ClassRegister />}></Route>
        <Route path="/admin/classes/new" element={<ClassRegister />}></Route>
      </Routes>
    </div>
  );
}

export default App;
