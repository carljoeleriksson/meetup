import React from 'react'
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'

import Home from './pages/HomePage'
import MeetupDetails from './pages/MeetupDetails'
import CreateMeetupForm from './pages/CreateMeetupForm'

import Header from './components/Header'

import './App.css'
import MeetupManager from './pages/MeetupManager'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
      
        <main>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/details/:id" element={<MeetupDetails/>} />
              <Route path="/create-meetup" element={<CreateMeetupForm />} />
              <Route path="/meetup-manager" element={<MeetupManager />} />

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
