import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import UserBooking from '../booking/userBooking'

export const Context = createContext(null)

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Context.Provider value={{
      user: new UserBooking()
    }}>
      <App />
    </Context.Provider>
  </BrowserRouter>,
);
