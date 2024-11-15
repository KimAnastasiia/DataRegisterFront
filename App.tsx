import React from 'react';
import './App.css';
import { Route, Routes, Link } from "react-router-dom"
import { CreateVisita } from './Components/CreateVisita';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CreateVisita/>}/>
      </Routes>
    </div>
  )
}

export default App;
