import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Navbar from './components/Navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route index element={<App/>}></Route>
    </Routes>
  </BrowserRouter>
);

