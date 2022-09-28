import { createContext } from 'react';
import {BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from "./redux/store";
import { Provider } from "react-redux";
import actionCable from "actioncable";
const CableApp = {};
CableApp.cable = actionCable.createConsumer("ws://localhost:3000/cable"); // change to whatever port your server uses
export const ActionCableContext = createContext();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ActionCableContext.Provider value={CableApp.cable}>
        <App />
      </ActionCableContext.Provider>
    </Provider>
  </BrowserRouter>
);

