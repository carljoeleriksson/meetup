import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/HomePage'
/* import Details from './pages/MeetupDetails' */

import Header from './components/Header'

import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
      
        <main>
          <Routes>
            <Route path="/" element={Home} />
            {/* <Route path="/details/:id" element={Details} /> */}
          </Routes>  
        </main>
        
        <footer>
          &copy; Meetup-Project 2022
        </footer>
        </BrowserRouter>
    </div>
  )
}

export default App
