import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './pages/HomePage'
import Details from './pages/MeetupDetails'

import Header from './components/Header'

import './App.css'

function App() {
  return (
    <div className="App">
      <Router>

        <main>
          <Route path="/" exact component={Home} />
          <Route path="/details/:id" component={Details} />
        </main>

        <footer>
          &copy; Meetup-Project 2022
        </footer>
      </Router>
    </div>
  )
}

export default App
